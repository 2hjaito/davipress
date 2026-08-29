import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { loadProjects } from '../dist/core/projects.js'

test('parses manual projects and tools syntax from markdown', async () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'davipress-projects-'))
  const projectMd = `---
title: Dự án
---

# Danh sách Dự án

:::davi-projects Các dự án tiêu biểu
name: Davipress
description: Static site generator for Next.js
techs: TypeScript, Next.js, React
topics: static-site-generator, documentation
url: https://github.com/dangth/davipress
stars: 42
lastUpdate: 2026-08-29
license: MIT

name: Dangth Site
description: Personal website
techs: React, Next.js
url: https://github.com/dangth/dangth
stars: 10
lastUpdate: 2026-08-01
:::

:::davi-tools Công cụ hay dùng
title: Photoshop 2023
icon: photoshop
description: Design software
href: https://adobe.com
:::
`

  fs.writeFileSync(path.join(root, 'project.md'), projectMd)

  const config = {
    github: {
      username: '2hjaito',
      topic: 'featured'
    }
  }

  const result = await loadProjects(undefined, config, root)
  assert.equal(result.title, 'Dự án')
  assert.equal(result.blocks.length, 3)

  const projectsBlock = result.blocks.find(b => b.type === 'projects')
  assert.ok(projectsBlock)
  assert.equal(projectsBlock.title, 'Các dự án tiêu biểu')
  assert.equal(projectsBlock.items.length, 2)
  assert.equal(projectsBlock.items[0].name, 'Davipress')
  assert.deepEqual(projectsBlock.items[0].techs, ['TypeScript', 'Next.js', 'React'])
  assert.deepEqual(projectsBlock.items[0].topics, ['static-site-generator', 'documentation'])

  const toolsBlock = result.blocks.find(b => b.type === 'tools')
  assert.ok(toolsBlock)
  assert.equal(toolsBlock.title, 'Công cụ hay dùng')
  assert.equal(toolsBlock.items.length, 1)
  assert.equal(toolsBlock.items[0].title, 'Photoshop 2023')
  assert.equal(toolsBlock.items[0].icon, 'photoshop')
})
