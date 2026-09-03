// Resizes oversized raster images in a site's public/ folder, converts them to WebP,
// and rewrites references in config/ and docs/. Originals are moved to .image-originals/.
// Usage: node scripts/optimize-images.mjs demo/local [maxSize]

import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const site = path.resolve(process.argv[2] ?? '.')
const maxSize = Number(process.argv[3] ?? 800)
const publicDir = path.join(site, 'public')
const backupDir = path.join(site, '.image-originals')

if (!fs.existsSync(publicDir)) throw new Error(`No public/ directory in ${site}`)

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const target = path.join(dir, entry.name)
    return entry.isDirectory() ? walk(target) : [target]
  })
}

const sources = walk(publicDir).filter(file => /\.(png|jpe?g)$/i.test(file))
const renames = new Map()
let before = 0
let after = 0

for (const source of sources) {
  const target = source.replace(/\.(png|jpe?g)$/i, '.webp')
  const image = sharp(source)
  const { width = 0, height = 0 } = await image.metadata()
  const buffer = await image
    .resize({ width: Math.min(width, maxSize), height: Math.min(height, maxSize), fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 82 })
    .toBuffer()

  const originalSize = fs.statSync(source).size
  if (buffer.length >= originalSize) continue

  const backup = path.join(backupDir, path.relative(publicDir, source))
  fs.mkdirSync(path.dirname(backup), { recursive: true })
  fs.renameSync(source, backup)
  fs.writeFileSync(target, buffer)

  before += originalSize
  after += buffer.length
  if (path.basename(source) !== path.basename(target)) renames.set(path.basename(source), path.basename(target))
}

const referenceDirs = ['config', 'docs', 'src'].map(dir => path.join(site, dir)).filter(dir => fs.existsSync(dir))
const referenceFiles = [...referenceDirs.flatMap(walk), path.join(site, 'davipress.config.ts')].filter(
  file => fs.existsSync(file) && /\.(md|mdx|ts|tsx|js|jsx|json|ya?ml)$/.test(file)
)

for (const file of referenceFiles) {
  const content = fs.readFileSync(file, 'utf8')
  let updated = content
  for (const [from, to] of renames) updated = updated.split(from).join(to)
  if (updated !== content) fs.writeFileSync(file, updated)
}

const mb = bytes => (bytes / 1048576).toFixed(2)
console.log(`Optimized ${renames.size} images: ${mb(before)} MB -> ${mb(after)} MB (originals kept in ${path.relative(site, backupDir)}/)`)
