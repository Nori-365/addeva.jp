# addeva.jp SITE_SPEC

## 基本
- GitHub: `Nori-365/addeva.jp`
- Branch: `main`
- 本番Web配置先: `/var/www/addeva/site/`

## 更新方法
- HTML / CSS / JS：GitHub経由
- API・サーバー設定：GitHub管理外。必要時にユーザーからファイルを受け取る
- API・設定ファイルのアップロード：WinSCP
- SSH操作：PuTTY
- PostgreSQL操作：pgAdmin 4
- WinSCPで可能な操作は、原則としてコマンド操作よりWinSCPを優先

## sitemap.xml 管理ルール
- `/sitemap.xml` は、現在意図している公開URLを確認するための基準として使用する。
- 既存ページのファイル名・ディレクトリ・URLを変更する場合は、意図しないURL変更になっていないか `/sitemap.xml` と照合する。
- 検索対象ページを新規作成、削除、またはURL変更した場合は、同じ作業内で `/sitemap.xml` も更新し、実際のサイト構成と一致させる。

### sitemap.xml 非掲載ページ
以下のページは、検索結果への掲載を目的としないため、意図的に `/sitemap.xml` へ掲載しない。

#### noindex ページ
- `/privacy-policy.html`：プライバシーポリシー
- `/terms.html`：利用規約
- `/contact.html`：問い合わせフォーム
- `/contact_thanks.html`：問い合わせ完了
- `/register.html`：製品登録

#### 認証・ユーザー機能
- `/customer.html`
- `/feedback_board.html`
- `/feedback.html`
- `/user_opinion_manage.html`

#### 管理機能
- `/dev_approval.html`
- `/dev_parts_regist.html`

- 原則として、検索結果への掲載を目的としないフォーム、完了画面、認証後ページ、管理画面は `/sitemap.xml` に掲載しない。

## SEO・AI検索対応ルール
- SEO、検索エンジン、AI検索・AIクローラーに関する仕様や推奨事項は変化するため、特定の手法を恒久的な前提としない。
- sitemap.xml、robots.txt、meta情報、構造化データ等を新規作成・更新する際は、その時点のGoogle等の検索エンジンおよび主要AIサービスの公式情報を確認し、効果が認められているものだけを採用する。
- 廃止・非推奨・効果がなくなった設定は継続せず、必要に応じて、ユーザーに確認、同意を得た上で、削除または置き換える。
- 検索対象の公開ページについては、通常検索だけでなくAI検索からの発見・引用・参照も考慮して、クロール可否、index設定、内部リンク、構造化データ、sitemap.xml等の整合性を確認する。
- 正規URLは `https://addeva.jp/`（wwwなし）に統一し、canonical および og:url は原則として正規URLの絶対URLを使用する。

## 画像・バイナリファイルの更新
- 画像等のバイナリファイルは、原則としてユーザーがGitHubへアップロードする。
- GPTはユーザーによるアップロード完了後、GitHub上のファイルを確認してHTML / CSS等の修正を行う。

## サーバー
- Nginx
- FastAPI
- PostgreSQL

## 主な共通ファイル
- `/assets/css/main.css`
- `/includes/head-common.html`：共通ヘッダーのページラベル表示と固定ヘッダー高さの同期も管理する。
- `/includes/header.html`：TOPはH1、その他ページはページラベルを共通のタイトル帯へ表示する。
- `/includes/footer.html`

## 商品固有ファイルの管理ルール
- 商品シリーズ専用の共通HTML / JS等は、原則として `/includes/` ではなく各商品ディレクトリ内に置く。
- BSC-20関連は `/product/bsc20/` 内で管理する。
- BSC-20サイズ別ページ（`ss.html` / `yoko.html` / `s.html` / `m.html`）では、`/product/bsc20/bsc20-common.js` がシリーズTOP `/product/bsc20/index.html` の `#brand`（Introducing Beatas）と直後の `FEATURES` セクションを取得し、サイズ比較を含む商品セクションの直後へ表示する。
- BSC-20共通説明の正本は `/product/bsc20/index.html`。共通説明を変更するときは、サイズ別ページへ同じ内容を重複記述しない。
