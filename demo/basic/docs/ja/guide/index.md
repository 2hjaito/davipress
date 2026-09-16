---
description: テーマ別ガイドの概要。
sidebar_position: 1
---

<div class="guide-home">
  <div class="guide-home-hero">
    <div class="guide-home-hero__copy">
      <h1 id="davipress-guide" class="guide-home-hero__title">
        <span class="name">Davipress</span>
        <span class="text guide-home-hero__highlight">Docs &amp; Guide</span>
      </h1>
      <p class="guide-home-hero__subtitle">Markdownを数分で美しいドキュメントに</p>
      <div class="guide-home-hero__actions">
        <a class="guide-home-hero__button is-primary" href="#davipress-la-gi">Davipressとは?</a>
        <a class="guide-home-hero__button" href="#bat-dau-nhanh">クイックスタート</a>
        <a class="guide-home-hero__button" href="https://github.com/2hjaito/davipress" target="_blank" rel="noreferrer">GitHubソース</a>
      </div>
    </div>
    <div class="guide-home-hero__art" aria-hidden="true">
      <div class="guide-home-device">
        <div class="guide-home-device__glow guide-home-device__glow--one"></div>
        <div class="guide-home-device__glow guide-home-device__glow--two"></div>
        <div class="guide-home-logo-wrap">
          <img class="guide-home-logo-svg" src="/davipress.svg" alt="Davipress logo" />
        </div>
      </div>
    </div>
  </div>
</div>

## Davipressとは?

**Davipress** はMarkdownファイルからドキュメントサイトを生成するツールです。シンプルなfrontmatter付きの `.md` ファイルを書くだけで、Davipressがナビバー、フォルダ構成に沿ったサイドバー、ダーク/ライトモード、検索、コメント([Giscus](https://giscus.app/))、SEO最適化を備えた完全なドキュメントサイトを自動的に構築します。

Davipressの目標は、ドキュメントの作成と公開をできる限り速く、軽量にすることです。複雑な設定もデザイン知識も不要 — サイト名、ナビバー、サイドバー、アイコン、フッター、リポジトリ、基本的なSEO情報を1つの `davipress.config.ts` ファイルに書くだけで、あとはDavipressが面倒を見ます。

主な特徴:

- **純粋なMarkdownで執筆**: 見出し、リンク、画像、アラート(注意書き)、シンタックスハイライト付きコードブロック、テーブル、タスクリスト、数式に対応。
- **直感的なフォルダ構成**: `docs/` フォルダの構成に応じてサイドバーが自動生成され、ページごとの手動登録は不要。
- **カスタマイズ可能なUI**: ダーク/ライトテーマの切り替え、ナビバー/サイドバーの調整、あらゆる画面サイズに対応するレスポンシブレイアウト、画像の拡大表示、そして今見ているページのようにCSSを安全にカスタマイズ可能。
- **シンプルなビルド&デプロイ**: 開発サーバーでプレビューし、本番用に静的ビルドを行い、数コマンドで[Vercel](https://vercel.com/)にデプロイ。

要するに、既にMarkdownの内容があり、それを数分で美しく整理されたドキュメントサイトに変えたいなら — それこそがDavipressの存在意義です。

## クイックスタート

Davipressでドキュメントサイトを構築する基本的な手順:

1. **パッケージのインストール**

   ```bash
   npm install davipress
   # または
   pnpm add davipress
   # または
   yarn add davipress
   ```

2. **プロジェクトの初期化**

   初期化コマンドを実行すると、Davipressがサンプルのフォルダ構成を自動生成します:

   ```bash
   npx davipress init my-docs
   cd my-docs
   ```

3. **フォルダ構成を理解する**

   初期化後、プロジェクトは次のような構成になります:

   ```text
   my-docs/
     docs/
       index.md
       guide/
         index.md
       posts/
     public/
       images/
     davipress.config.ts
     package.json
   ```

   - `docs/` にはすべてのMarkdownコンテンツが入り、各サブフォルダがサイドバーの項目に対応します。
   - `public/` には画像やその他の静的アセットが入ります。
   - `davipress.config.ts` はナビバー、サイドバー、アイコン、フッター、リポジトリ、SEO、Giscusを設定する場所です。

4. **最初のページを書く**

   `docs/index.md` を開き、基本的なfrontmatterを追加してMarkdownでコンテンツを書き始めます:

   ```markdown
   ---
   title: 最初のページ
   description: このページの短い説明
   ---

   ここにページの内容を書きます...
   ```

5. **開発サーバーを起動する**

   ```bash
   npm run dev
   ```

   ブラウザでサイトをプレビューでき、`docs/` 内の変更はすぐに反映されます。

6. **ビルドとデプロイ**

   公開の準備ができたら:

   ```bash
   npm run build
   ```

   その後、ビルドフォルダを[Vercel](https://vercel.com/)(または任意の静的ホスティング)にデプロイします。ビルド中にエラーが出た場合は、`public/` 内の画像パスや `.md` ファイルのfrontmatterの構文を確認してください。

上記の手順を終えると、動作するドキュメントサイトが完成します — 以降のセクションでは、設定、高度なMarkdownの書き方、テーマのカスタマイズ、デプロイの詳細について深く解説します。

3. [Markdownコンテンツの書き方](./markdown/)
4. [テーマとUIのカスタマイズ](./theme/)
5. [ビルドとデプロイ](./deployment/)

## ガイド一覧

### [Davipressを始める](./davipress/)
パッケージのインストール、初期化コマンドの実行、フォルダ構成の理解、最初のページ作成。

### [サイトの設定](./configuration/)
`davipress.config.ts`、ナビバー、サイドバー、アイコン、フッター、リポジトリ、SEO、Giscusの設定。

### [Markdownコンテンツの書き方](./markdown/)
Frontmatter、見出し、リンク、画像、アラート、コードブロック、テーブル、タスクリスト、数式の使い方。

### [テーマとUI](./theme/)
ダーク/ライトモード、ナビバー、サイドバー、レスポンシブレイアウト、画像の拡大表示、安全なCSSカスタマイズの設定。

### [ビルドとデプロイ](./deployment/)
開発サーバーの起動、本番ビルド、Vercelへのデプロイ、よくあるエラーの確認方法。

### [Live2D連携 (next-live2d)](./live2d/)
next-live2dライブラリを使ってサイトにランダムなLive2Dマスコットを追加する方法と参考ドキュメント。

## 構成例

```text
my-docs/
	docs/
		index.md
		guide/
			index.md
		posts/
	public/
		images/
	davipress.config.ts
	package.json
```
