import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const assets = ['theme.css', 'theme-dark.css']

for (const asset of assets) {
  fs.copyFileSync(path.join(root, 'src/runtime', asset), path.join(root, 'dist/runtime', asset))
}