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

<!-- 2026-08-19追加提案 -->
## sitemap.xml 管理ルール
- `/sitemap.xml` は、現在意図している公開URLを確認するための基準として使用する。
- 既存ページのファイル名・ディレクトリ・URLを変更する場合は、意図しないURL変更になっていないか `/sitemap.xml` と照合する。
- 公開ページを新規作成、削除、またはURL変更した場合は、同じ作業内で `/sitemap.xml` も更新し、実際のサイト構成と一致させる。

<!-- 2026-08-19追加提案 -->
## 画像・バイナリファイルの更新
- 画像等のバイナリファイルは、原則としてユーザーがGitHubへアップロードする。
- GPTはユーザーによるアップロード完了後、GitHub上のファイルを確認してHTML / CSS等の修正を行う。

## サーバー
- Nginx
- FastAPI
- PostgreSQL

## 主な共通ファイル
- `/assets/css/main.css`
- `/includes/head-common.html`
- `/includes/header.html`
- `/includes/footer.html`

## 商品固有ファイルの管理ルール
- 商品シリーズ専用の共通HTML / JS等は、原則として `/includes/` ではなく各商品ディレクトリ内に置く。
- BSC-20関連は `/product/bsc20/` 内で管理する。
- BSC-20サイズ別ページ（`ss.html` / `yoko.html` / `s.html` / `m.html`）では、`/product/bsc20/bsc20-common.js` がシリーズTOP `/product/bsc20/index.html` の `#brand`（Introducing Beatas）と直後の `FEATURES` セクションを取得し、サイズ比較を含む商品セクションの直後へ表示する。
- BSC-20共通説明の正本は `/product/bsc20/index.html`。共通説明を変更するときは、サイズ別ページへ同じ内容を重複記述しない。
