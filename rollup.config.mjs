import execute from 'rollup-plugin-execute'
import auto from '@rollup/plugin-auto-install'
import common from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import bundleSize from 'rollup-plugin-bundle-size'
import path from 'node:path'
import fs from 'node:fs'

const url = new URL('package.json', import.meta.url)
const pkg =
  path.resolve(url.toString()) && JSON.parse(fs.readFileSync(url, 'utf-8'))

const createConfig = mode => {
  let file = mode === 'es' ? pkg.module : pkg.main
  file = path.resolve(file)

  return {
    input: pkg.source,
    treeshake: true,
    output: {
      file,
      format: mode,
    },
    plugins: [
      auto(),
      resolve(),
      common(),
      bundleSize(),
      execute('./scripts/remove-unused-deps.js'),
    ],
  }
}

export default [createConfig('es'), createConfig('cjs')]
