const htmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const extractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: {
        app: './src/app.js',
        contact: './src/contact.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
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
            },
            {
                test: /.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        compress: true,
        port: 9000,
        stats: "errors-only",
        open: true,
        hot: true
    },
    plugins: [
        new htmlWebpackPlugin({
            title: 'Webpack Complete Guide',
            template: './src/index.html',
            minify: {
                collapseInlineTagWhitespace: true,
                collapseWhitespace: true
            },
            excludeChunks: ['contact'],
            hash: true
        }),
        new htmlWebpackPlugin({
            title: 'Contact Page',
            filename: 'contact.html',
            template: './src/contact.html',
            minify: {
                collapseInlineTagWhitespace: true,
                collapseWhitespace: true
            },
            chunks: ['contact'],
            hash: true
        }),
        new extractTextPlugin({
            filename: "bundle.css",
            disable: true,
            allChunks: true
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
}