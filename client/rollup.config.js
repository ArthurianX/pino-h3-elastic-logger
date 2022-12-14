import dts from 'rollup-plugin-dts'
import esbuild from 'rollup-plugin-esbuild'
import gzipPlugin from 'rollup-plugin-gzip'

const pack = require('./package.json')
const name = pack.main.replace(/\.js$/, '')
const version = `${pack.name} - ${pack.version}`

const bundle = (config) => ({
    ...config,
    input: 'src/index.ts',
    external: (id) => !/^[./]/.test(id),
})

export default [
    bundle({
        plugins: [
            esbuild({
                minify: true,
                define: {
                    __LOGGER_VERSION__: JSON.stringify(version),
                    'process.env.NODE_ENV': JSON.stringify(
                        process.env.NODE_ENV
                    ),
                },
            }),
            gzipPlugin(),
        ],
        output: [
            {
                file: `${name}.js`,
                format: 'umd',
                sourcemap: true,
                name: 'pinoLoggerClient',
            },
            {
                file: `${name}.cjs`,
                format: 'cjs',
                sourcemap: true,
            },
            {
                file: `${name}.mjs`,
                format: 'es',
                sourcemap: true,
            },
        ],
    }),
    bundle({
        plugins: [dts()],
        output: {
            file: `${name}.d.ts`,
            format: 'es',
        },
    }),
]
