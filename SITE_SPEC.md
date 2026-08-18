# addeva.jp SITE_SPEC

## 1. 目的
このファイルは、ChatGPTが addeva.jp の構成と更新方法を短時間で把握するためのマスター仕様書とする。  
実装内容をすべて複製せず、必要なファイルへ最短で到達するための情報を記載する。

## 2. 正本
- GitHub Repository: `Nori-365/addeva.jp`
- Branch: `main`
- Webサイト本体（HTML / CSS / JS等）の正本はGitHubとする。
- 本番サーバー上のWeb配置先: `/var/www/addeva/site/`
- 更新ファイルのGitHubへのアップロードはユーザーが行う。
- ChatGPTは更新済みファイルを生成し、ユーザーがアップロードできる形で出力する。

## 3. 作業時の基本ルール
- 最初にこの `SITE_SPEC.md` を確認する。
- リポジトリ全体を無用に調査せず、作業に必要なファイルのみ参照する。
- HTML / CSS / JSの実装内容は、必要時にGitHub上の最新ファイルを確認する。
- サイト構成・共通仕様・サーバー構成など重要事項が変わった場合は、このファイルも更新する。
- APIファイル、サーバー設定ファイルはGitHubに無いため、必要になった時点でユーザーに提供を求める。

## 4. 現在把握している主要ファイル
### 今回の更新対象
- `/index.html` — トップページ
- `/company.html` — 会社概要ページ

### 共通・関連ファイル
- `/assets/css/main.css` — サイト共通CSS
- `/includes/head-common.html` — head共通要素
- `/includes/header.html` — 共通ヘッダー
- `/includes/footer.html` — 共通フッター
- `/assets/` — 画像・動画等のアセット

`index.html` または `company.html` の更新時は、原則として対象HTMLを最初に確認し、共通部分やデザイン変更が必要な場合のみ関連ファイルを追加確認する。

## 5. 現在のサイト構成メモ
### index.html
- ADDEVA公式サイトのトップページ。
- UrbanFlex、BSC-20等の商品導線と、法人向けサービス、ブランド情報を掲載。
- 詳細なセクション構成は最新の `index.html` を正とする。

### company.html
- 会社概要ページ。
- ブランドポリシー、ブランドストーリー、製造・品質管理、会社情報等を掲載。
- 詳細なセクション構成は最新の `company.html` を正とする。

## 6. サーバー / API
- Web/API構成: Nginx + FastAPI
- DB操作: pgAdmin 4（PostgreSQL）
- サーバー上のAPI・設定ファイルはGitHub管理外。

### 操作ツール
- **WinSCP**: API・設定ファイル等の確認、アップロード、ダウンロード、編集に使用。WinSCPで可能な操作は原則こちらを優先する。
- **PuTTY**: SSH接続。コマンド実行が必要な場合に使用する。
- **pgAdmin 4**: PostgreSQLの確認・操作に使用する。

APIのファイル構成、サービス名、設定ファイルのパス等は、実際にAPI関連を操作する際に確認し、この仕様書へ追記する。

## 7. 更新作業の基本手順
1. `SITE_SPEC.md` を確認する。
2. GitHubから対象ファイルのみ取得して確認する。
3. 必要な場合のみ共通CSS・includeファイル等を追加確認する。
4. ChatGPTが更新済みファイルを生成する。
5. ユーザーがGitHubまたはWinSCPを使ってアップロードする。
6. サイト構成やシステム構成に新しい情報が判明した場合は、`SITE_SPEC.md` を更新する。
