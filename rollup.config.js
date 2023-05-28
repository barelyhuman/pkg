import execute from 'rollup-plugin-execute'
import auto from '@rollup/plugin-auto-install'
import common from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import bundleSize from 'rollup-plugin-bundle-size'
import json from '@rollup/plugin-json'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import fs from 'node:fs'

const pkgUrl = fileURLToPath(new URL('package.json', import.meta.url))
const pkg = path.resolve(pkgUrl) && JSON.parse(fs.readFileSync(pkgUrl, 'utf-8'))

const createConfig = ({ input, output, mode }) => {
  return {
    input: input,
    treeshake: true,
    output: {
      file: output,
      format: mode,
    },
    plugins: [
      auto(),
      resolve(),
      common(),
      json(),
      bundleSize(),
      execute('./scripts/remove-unused-deps.js'),
    ],
  }
}

const toBuild = Object.keys(pkg.exports)
  .map(key => {
    const exportDef = pkg.exports[key]

    if (typeof exportDef !== 'object') {
      if (path.resolve(exportDef) === path.resolve(pkgUrl.toString())) {
        return null
      }
      throw new Error('Invalid export definition, cannot handle string exports')
    }

    return [
      exportDef.import
        ? createConfig({
            input: path.resolve(exportDef.source),
            output: path.resolve(exportDef.import),
            mode: 'esm',
          })
        : null,
      exportDef.require
        ? createConfig({
            input: path.resolve(exportDef.source),
            output: path.resolve(exportDef.require),
            mode: 'cjs',
          })
        : null,
    ]
  })
  .reduce((acc, item) => {
    return acc.concat(item)
  }, [])
  .filter(x => x)

export default toBuild
