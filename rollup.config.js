import * as path from 'path'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import pkg from './package.json'
// import { terser } from 'rollup-plugin-terser'

const base = path.resolve(__dirname)
const projects = path.join(base, 'projects')
const tsconfig = path.join(base, 'tsconfig.json')
const input = {
  a: path.join(projects, 'project-a/index.ts'),
  b: path.join(projects, 'project-b/index.ts'),
}

const externals = [/^@shared/, ...Object.keys(pkg.dependencies)]

const common = {
  context: 'this',
  plugins: [
    typescript({
      tsconfig,
    }),
    resolve(),
    commonjs({ extensions: ['.js', '.ts', '.mjs'] }),
  ],
}

export default [
  {
    ...common,
    input: input.a,
    output: {
      dir: 'dist/project-a',
      format: 'iife',
      sourcemap: true,
      name: 'client',
      // plugins: [terser()],
    },
  },
  {
    context: 'this',
    plugins: [
      typescript({
        tsconfig,
      }),
      resolve(),
      commonjs({ extensions: ['.js', '.ts', '.mjs'] }),
    ],
    input: input.b,
    output: {
      dir: 'dist/project-b',
      format: 'cjs',
      sourcemap: true,
      externalLiveBindings: true,
    },
    external: (id) => externals.some((key) => id === key || (key.test && key.test(id))),
  },
]
