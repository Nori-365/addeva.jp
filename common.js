// /var/www/addeva/site/common.js

// ADDEVAサイト専用の共通ユーティリティオブジェクト
const ADDEVA = window.ADDEVA || {};

// ローカルストレージキーの定義 (必要に応じて追加)
ADDEVA.LS = {
  apiKey: 'addeva_api_key', // addeva.jp サイト用のAPIキーを保存するキー
};

/* --- 初回実行時に <meta name="x-api-key"> から localStorage に API キーを保存 --- */
(() => {
  try {
    const cur = localStorage.getItem(ADDEVA.LS.apiKey);
    const m = document.querySelector('meta[name="x-api-key"]');
    const k = m && (m.getAttribute('content') || '').trim();
    if (!cur && k) localStorage.setItem(ADDEVA.LS.apiKey, k);
  } catch (_e) { /* no-op */ }
})();


/* ---------- HTTP fetch (APIアクセス用) ---------- */
/**
 * FastAPIバックエンドへAPIリクエストを送信する共通関数
 * @param {string} path - APIエンドポイントのパス (例: '/api/addeva/products')
 * @param {object} options - オプション (method, body, extraHeadersなど)
 * @returns {Promise<any>} - APIからのレスポンスデータ
 */
ADDEVA.apiFetch = async function(path, {method='POST', body=null, extraHeaders={}} = {}){
  const key = localStorage.getItem(ADDEVA.LS.apiKey) || '';

  const h  = {'Content-Type':'application/json', ...extraHeaders};
  if (key) {
    h['x-api-key']   = key;
    h['Authorization'] = `Bearer ${key}`; // FastAPIの認証方式に合わせて調整
  }

  // bodyがオブジェクトの場合は自動でJSON.stringifyする
  const requestBody = (body && typeof body === 'object') ? JSON.stringify(body) : body;

  const init = { method, headers:h, body: requestBody };

  const res = await fetch(path, init);
  if(!res.ok){
    // エラーレスポンスのボディを試行的に読み込む
    const errorText = await res.text().catch(()=> '');
    let errorMessage = `HTTP error: ${res.status} ${res.statusText}`;
    try {
      const errorJson = JSON.parse(errorText);
      errorMessage = errorJson.detail || errorMessage; // FastAPIのHTTPExceptionは "detail" を含む
    } catch (_) {
      // JSONパースに失敗した場合はそのままのテキストを使用
      errorMessage = errorText || errorMessage;
    }
    throw new Error(errorMessage);
  }
  return res.json();
};

// その他の共通ヘルパー関数が必要であればここに追加
// 例:
// ADDEVA.getLang = function(){ /* ... */ };
// ADDEVA.setLang = function(l){ /* ... */ };

// windowオブジェクトにADDEVAオブジェクトを公開
window.ADDEVA = ADDEVA;