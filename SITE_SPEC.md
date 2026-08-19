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

## サーバー
- Nginx
- FastAPI
- PostgreSQL

## 現在の主要ページ
- `/index.html`：トップページ
- `/company.html`：会社概要
- `/contents/index.html`：動画コンテンツ一覧

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
