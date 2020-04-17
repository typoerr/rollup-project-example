const path = require('path')
const gulp = require('gulp')
const { rollup } = require('rollup')
const commonjs = require('@rollup/plugin-commonjs')
const resolve = require('@rollup/plugin-node-resolve')
const typescript = require('@rollup/plugin-typescript')
const base = path.resolve(__dirname)
const tsconfig = path.join(base, 'tsconfig.json')

// [rollup.js - Gulp](https://rollupjs.org/guide/en/#gulp)
// [rollup.js - cache](https://rollupjs.org/guide/en/#cache)

const config = {
  cache: null,
  context: 'this',
  input: 'src/index.ts',
  output: {
    dir: './dist',
    entryFileNames: '[name].js',
    format: 'cjs',
    sourcemap: true,
  },
  plugins: [
    typescript({
      tsconfig,
    }),
    resolve(),
    commonjs({ extensions: ['.js', '.ts', '.mjs'] }),
  ],
}

function build() {
  return rollup(config).then((bundle) => {
    config.cache = bundle.cache
    return bundle.write(config.output)
  })
}

function watch() {
  return gulp.watch('./src/**/*.ts', { ignoreInitial: false }, build)
}

exports.build = build
exports.watch = watch
