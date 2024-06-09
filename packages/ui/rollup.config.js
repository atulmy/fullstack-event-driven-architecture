import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import { glob } from 'glob'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

export default [
  {
    input: Object.fromEntries(
      glob.sync('src/**/*.tsx').map((file) => [
        // This remove `src/` as well as the file extension from each
        // file, so e.g. src/nested/foo.js becomes nested/foo
        path.relative('src', file.slice(0, file.length - path.extname(file).length)),
        // This expands the relative paths to absolute paths, so e.g.
        // src/nested/foo becomes /project/src/nested/foo.js
        fileURLToPath(new URL(file, import.meta.url)),
      ])
    ),
    output: {
      format: 'esm',
      sourcemap: false,
      dir: 'build',
      preserveModules: true,
    },
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      postcss({
        extract: path.resolve('./build/index.css'),
      }),
    ],
  },
]
