# webpack 3.0 ^

<b> session 1 - Installing webpack and adding a config </b> <br>
1. install node , npm and webpack (both globally and locally)
2. `npm init` to `create package.json`
3. add the following code snippet in webpack.config.js
```
const path = require('path');

module.export = {
entry: index.js,
output: {
 path: path.resolve(__dirname,'dist'),
 filename:'app.bundle.js'
 }
}
```
4. include app.bundle.js inside an html script tag .
<hr>
<b> session 2 - HtmlWebpackPlugin </b> <br>

1. run `npm install html-webpack-plugin`
2. add the following snippet

```
const htmlWebpackPlugin = require('html-webpack-plugin');
module.export = {
entry: index.js,
output: {
 path: path.resolve(__dirname,'dist'),
 filename:'app.bundle.js'
 },
 plugins: [
  new htmlWebpackPlugin({
   title: 'Webpack project',
   template: './src/index.html',
   minify: {
      collapseInlineTagWhitespace: true,
      collapseWhitespace: true
   },
  hash: true
}
```
3.include <title> <%= htmlWebpackPlugin.options.title %> </title> in html file to handle dynamic title

<hr>
<b> session 3 - style, css and sass loader </b> <br>

1. install css-loader , style-loader , sass-loader and node-sass
2. install extract-text-webpack-plugin to place all the css in a single file
3. add the following snippet in your config

```
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
```

