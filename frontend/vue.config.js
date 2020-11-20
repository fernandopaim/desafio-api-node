const Webpack = require('webpack')

module.exports = {

    transpileDependencies: [
        "vuetify"
    ],

    publicPath: '/',
    outputDir: 'build',

    chainWebpack: config => {
        config.resolve.alias
            .set("@", require('path').resolve(__dirname, "src"))
            .set("@plugins", require('path').resolve(__dirname, "src/plugins"))
            .set("@components", require('path').resolve(__dirname, "src/components"))
            .set("@pages", require('path').resolve(__dirname, "src/pages"))

            .set("@assets", require('path').resolve(__dirname, "src/assets"))

        config.module
            .rule("eslint")
            .use("eslint-loader")
            .options({
                fix: true
            })
    },

    configureWebpack: {
        devtool: 'source-map',
        plugins: [
            new Webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
            new Webpack.optimize.MinChunkSizePlugin({
                minChunkSize: 50000 // Minimum number of characters
            }),
        ],
    },
}