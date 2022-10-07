#!/usr/bin/env node

const { join, resolve } = require('path')
const { writeFileSync } = require('fs')
const depcheck = require('depcheck')

const basePath = join(__dirname, '..')

depcheck(join(__dirname, '..'), {}).then(unused => {
  const pkgPath = join(basePath, 'package.json')
  const pkg = resolve(pkgPath) && require(pkgPath)
  const deps = pkg.dependencies
  Object.keys(pkg.dependencies).forEach(dep => {
    if (unused.dependencies.indexOf(dep) > -1) {
      delete deps[dep]
    }
  })
  pkg.dependencies = deps
  writeFileSync(pkgPath, JSON.stringify(pkg, null, 2), 'utf-8')
})
