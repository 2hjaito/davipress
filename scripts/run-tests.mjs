// Run the test suite with explicit file paths so it works on every Node
// version and shell: Node 20 does not expand globs, PowerShell does not
// expand them either, and `node --test` without arguments picks up `bin/`
// on Node 20.
import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const testDir = path.join(root, 'test')
const files = fs.readdirSync(testDir)
  .filter(file => file.endsWith('.test.mjs'))
  .sort()
  .map(file => path.join(testDir, file))

const result = spawnSync(process.execPath, ['--test', ...files], { cwd: root, stdio: 'inherit' })
process.exit(result.status ?? 1)
