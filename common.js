// /var/www/addeva/site/common.js

// ADDEVAサイト専用の共通ユーティリティオブジェクト
const ADDEVA = window.ADDEVA || {};

// ローカルストレージキーの定義
ADDEVA.LS = {
  apiKey: 'addeva_api_key',       // X-API-KEY ヘッダー用
  authToken: 'addeva_auth_token', // JWT Authorization ヘッダー用
};

/* --- 初回実行時に <meta name="x-api-key"> から localStorage に API キーを保存 --- */
// この処理はDOMContentLoadedで実行されるため、head-common.html の読み込みよりも後に、
// あるいは document.body.onload で実行されるように調整すると良い場合があります。
// 現状は <script defer src="/common.js"></script> で問題なく動く想定です。
(() => {
  try {
    const cur = localStorage.getItem(ADDEVA.LS.apiKey);
    const m = document.querySelector('meta[name="x-api-key"]');
    const k = m && (m.getAttribute('content') || '').trim();
    if (!cur && k) {
      localStorage.setItem(ADDEVA.LS.apiKey, k);
      // console.log("API Key initialized from meta tag:", k); // デバッグ用
    }
  } catch (e) {
    console.error("Error initializing API Key from meta tag:", e);
  }
})();

/* ---------- Auth helpers (JWT / redirect) ---------- */
ADDEVA._redirectToLogin = function () {
  try {
    const p = String(window.location.pathname || '');
    if (p.includes('/support/login.html')) return; // loginページでは飛ばさない
    const next = encodeURIComponent(
      (window.location.pathname || '/') +
      (window.location.search || '') +
      (window.location.hash || '')
    );
    window.location.href = '/support/login.html?next=' + next;
  } catch (_) {
    // 何もしない
  }
};

ADDEVA.clearAuth = function () {
  try {
    localStorage.removeItem(ADDEVA.LS.authToken);
  } catch (_) {}
};

// base64url -> payload(JSON)
ADDEVA._jwtPayload = function (token) {
  try {
    const t = String(token || '');
    const parts = t.split('.');
    if (parts.length !== 3) return null;
    let b64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const pad = b64.length % 4;
    if (pad) b64 += '='.repeat(4 - pad);
    const json = decodeURIComponent(escape(atob(b64)));
    return JSON.parse(json);
  } catch (_) {
    return null;
  }
};

ADDEVA.isJwtExpired = function (token, skewSec = 30) {
  const p = ADDEVA._jwtPayload(token);
  const exp = p && typeof p.exp === 'number' ? p.exp : null;
  if (!exp) return false; // expが無いJWTは期限判定できないので「期限切れ扱いしない」
  const now = Math.floor(Date.now() / 1000);
  return now >= (exp - skewSec);
};

ADDEVA._handleAuthFailure = function () {
  ADDEVA.clearAuth();
  ADDEVA._redirectToLogin();
};

/* ---------- HTTP fetch (APIアクセス用) ---------- */
/**
 * FastAPIバックエンドへAPIリクエストを送信する共通関数
 * @param {string} path - APIエンドポイントのパス (例: '/api/addeva/products')
 * @param {object} options - オプション { method, body, headers }
 * @param {string} options.method - HTTPメソッド (GET, POSTなど)
 * @param {any} options.body - リクエストボディ (オブジェクトの場合、自動でJSON.stringifyされる)
 * @param {object} options.headers - 追加のHTTPヘッダー
 * @returns {Promise<any>} - APIからのレスポンスデータ (JSON形式)
 */
ADDEVA.apiFetch = async function (path, { method = 'POST', body = null, headers = {} } = {}) {
  const apiKey = localStorage.getItem(ADDEVA.LS.apiKey) || '';
  const authToken = localStorage.getItem(ADDEVA.LS.authToken) || '';

  // JWTが入っていて exp が期限切れなら、APIを叩く前にログインへ戻す
  if (authToken && ADDEVA.isJwtExpired(authToken)) {
    ADDEVA._handleAuthFailure();
    throw new Error("ログインが必要です。");
  }

  // デフォルトヘッダーの設定
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  // ユーザーがheadersオプションで渡したものをデフォルトにマージ
  const finalHeaders = { ...defaultHeaders, ...headers };

  // APIキーが存在すれば X-API-KEY ヘッダーを追加 (ユーザー指定の headers に x-api-key があればそちらが優先)
  if (apiKey && !finalHeaders['x-api-key']) {
    finalHeaders['x-api-key'] = apiKey;
  }

  // Authorization ヘッダーがまだ設定されておらず、かつ authToken があれば追加
  // (ユーザー指定の headers に Authorization があればそちらが優先)
  if (!finalHeaders['Authorization'] && authToken) {
    finalHeaders['Authorization'] = `Bearer ${authToken}`;
  }

  // bodyがオブジェクトの場合は自動でJSON.stringifyする
  const requestBody = (body && typeof body === 'object') ? JSON.stringify(body) : body;

  const init = { method, headers: finalHeaders, body: requestBody };

  try {
    const res = await fetch(path, init);

    // 401は「ログインし直し」が正しい挙動なので、ここで一括処理
    if (res.status === 401) {
      ADDEVA._handleAuthFailure();

      // 呼び出し元のcatchでも自然に扱えるように例外は投げる
      let msg = 'ログインが必要です。';
      try {
        const t = await res.text().catch(() => '');
        const j = JSON.parse(t);
        msg = j.detail || msg;
      } catch (_) {
        // 何もしない
      }
      throw new Error(msg);
    }

    // レスポンスがOKでない場合も、エラー詳細を読み込もうと試みる
    if (!res.ok) {
      const errorText = await res.text().catch(() => ''); // エラーボディをテキストとして取得
      let errorMessage = `API Error: ${res.status} ${res.statusText}`;
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.detail || errorMessage; // FastAPIのHTTPExceptionは "detail" を含む
      } catch (_) {
        // JSONパースに失敗した場合はそのままのテキストを使用
        errorMessage = errorText || errorMessage;
      }
      throw new Error(errorMessage); // エラーメッセージを含んだ Error オブジェクトをスロー
    }

    return res.json(); // 成功時はJSONをパース
  } catch (e) {
    console.error("ADDEVA.apiFetch failed:", e);
    // ネットワークエラーなど、fetch自体が失敗した場合
    throw new Error(e.message || "ネットワークエラーが発生しました。");
  }
};

// その他の共通ヘルパー関数が必要であればここに追加
// 例:
// ADDEVA.getLang = function(){ /* ... */ };
// ADDEVA.setLang = function(l){ /* ... */ };

// windowオブジェクトにADDEVAオブジェクトを公開
window.ADDEVA = ADDEVA;
