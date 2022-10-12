const {PHASE_DEVELOPMENT_SERVER} = require("next/constants");
const withPWA = require('next-pwa')

const composer = plugins => ({
    webpack(config, options) {
        return plugins.reduce((config, plugin) => {
            if (plugin instanceof Array) {
                const [_plugin, ...args] = plugin
                plugin = _plugin(...args)
            }
            if (plugin instanceof Function) {
                plugin = plugin()
            }
            if (plugin && plugin.webpack instanceof Function) {
                return plugin.webpack(config, options)
            }
            return config
        }, config)
    },

    webpackDevMiddleware(config) {
        return plugins.reduce((config, plugin) => {
            if (plugin instanceof Array) {
                const [_plugin, ...args] = plugin
                plugin = _plugin(...args)
            }
            if (plugin instanceof Function) {
                plugin = plugin()
            }
            if (plugin && plugin.webpackDevMiddleware instanceof Function) {
                return plugin.webpackDevMiddleware(config)
            }
            return config
        }, config)
    }
})


const withGQL = (nextConfig = {}) => {
    return Object.assign({}, nextConfig, {
        webpack(config, options) {
            if (!options.defaultLoaders) {
                throw new Error(
                    'This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade'
                )
            }

            const {dir} = options

            // noinspection ES6ShorthandObjectProperty,JSValidateTypes,JSCheckFunctionSignatures
            config.module.rules.push({
                test: /\.(graphql|gql)$/,
                include: [dir],
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'graphql-tag/loader'
                    }
                ]
            })

            if (typeof nextConfig.webpack === 'function') {
                return nextConfig.webpack(config, options)
            }

            return config
        }
    })
}

const pwaConfig = {
    pwa: {
        dest: 'public'
    }
}


const composed = (phase) => {
    const plugins = [
        withGQL
    ]
    if (phase === PHASE_DEVELOPMENT_SERVER)
        return composer(plugins)
    else {
        return composer([
            ...plugins,
            [withPWA, pwaConfig]
        ])
    }
}


/** @type {import('next').NextConfig} */
const nextConfig = (phase) => ({
    reactStrictMode: true,
    images: {
        domains: []
    },
    i18n: {
        locales: ["ru-RU", "en-US"],
        defaultLocale: "ru-RU"
    },
    ...composed(phase)
})


module.exports = nextConfig
