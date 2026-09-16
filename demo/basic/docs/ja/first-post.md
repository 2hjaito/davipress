---
title: ドキュメントテーマの構築
description: 投稿レイアウトの互換性確認ページ。
date: 2026-08-27
updated: 2026-08-27
layout: post
tags:
  - Davipress
  - UI
---

# ドキュメントテーマの構築

このページは投稿(post)レンダラーを使用します。メタデータ行、タグ、記事幅、コードブロック、長文記事まわりのナビゲーションを確認します。

## レイアウトが重要な理由

元の `dangth` の投稿ビューは記事を中央に配置し、目次を右側に置き、見出し周りに十分な余白を確保します。

## サンプルコード

```tsx
export default function Post() {
  return <article>Readable content</article>
}
```

## まとめ

デスクトップでもモバイルでも快適に読める投稿レイアウトです。
