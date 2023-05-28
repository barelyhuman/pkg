#!/usr/bin/env node

import depcheck from 'depcheck'
import { readFileSync, writeFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const basePath = join(__dirname, '..')

depcheck(join(__dirname, '..'), {}).then(unused => {
  const pkgPath = join(basePath, 'package.json')
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'))
  const deps = pkg.dependencies
  Object.keys(pkg.dependencies).forEach(dep => {
    if (unused.dependencies.indexOf(dep) > -1) {
      delete deps[dep]
    }
  })
  pkg.dependencies = deps
  writeFileSync(pkgPath, JSON.stringify(pkg, null, 2), 'utf-8')
})
