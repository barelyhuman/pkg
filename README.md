# pkg

My version of a quick start for building packages.

> **Note:** This starter builds ESM first and CJS as a fallback

## Highlights

- Auto install dependencies - Just make sure you type the package name correct
  and it'll be installed and bundled for you.
- Cleanup script for `package.json` of unused `dependencies` (not
  `devDependencies`)
- Exports for both CJS and ESM
- A small `rollup.config.js`, for you to both read and extend on
- Basic configuration can be handled from pkg.json

## Usage

- You can either click on the `Use this Template` button up top on Github
- Or you can run the follwing command to clone it.

```sh
$ npx degit barelyhuman/pkg <my-awesome-package-name>
```

## Caveats

The starter is **opinionated** in the terms that it supports writing `.d.ts`
files separately and adding them to the published output manually, also why the
`./src` folder is a part of the `package.json` files. You can obviously modify
the starter to add in support for auto generation of types using JSDoc for
typescript and other rollup plugins.

## License

[MIT](/LICENSE)
