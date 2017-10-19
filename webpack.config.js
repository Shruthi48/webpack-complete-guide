const htmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
var extractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.bundle.js'
    },
    module: {
        rules: [
            {
                test: /.scss$/,
                use: extractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "sass-loader"],
                    publicPath: "/dist"
                })
            }
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        compress: true,
        port: 9000,
        stats: "errors-only",
        open: true
    },
    plugins: [
        new htmlWebpackPlugin({
            title: 'Webpack Complete Guide',
            template: './src/index.html',
            minify: {
                collapseInlineTagWhitespace: true,
                collapseWhitespace: true
            },
            hash: true
        }),
        new extractTextPlugin({
            filename: "bundle.css",
            disable: false,
            allChunks: true
        })
    ]
}