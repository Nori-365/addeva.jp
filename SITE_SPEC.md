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

## 主な共通ファイル
- `/assets/css/main.css`
- `/includes/head-common.html`
- `/includes/header.html`
- `/includes/footer.html`
