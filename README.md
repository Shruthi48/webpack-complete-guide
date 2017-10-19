# webpack 3.0 ^

`npm run dev` - <h4> to start the application </h4> <br>

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
<hr>
<b> session - 4 installing dev-server </b> <br>

1. wanna see your webpage running on a port , so you need a server 
   run ` npm install webpack-dev-server`
2. change script to use webpack-dev-server
   ```
    script {
     "dev": "webpack-dev-server"
     }
   ```
   
   ` difference between webpack -d and webpack-dev-server is it allows you to serve the index.html on a port and all the bundled files that gets generated will be stored in memory rather than your existing code base` <br>
   
<b> session - 5 configuring dev-server </b> <br>
1. add the following snippet into webpack.config to add configurations to your dev-server

```
devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        compress: true, //gzips the bundles
        port: 9000,
        stats: "errors-only",  //hides build messages and keeps it clean
        open: true  //opens new window when you run command `npm run dev`
    }
 ```
 <hr>
 <b> session- 6 installing react </b> <br>
 
 1. npm install --save react , react-dom
 2. npm install --save babel babel-preset-react babel-preset-es2015  //es6 & es5 comptibility reasons
 3. npm install --save-dev babel-loader babel-core
 4. add presets in .babelrc file
 
 ```
 {
    "presets": ["es2015","react"]
 }
```
5. add the following in app.js to get started with react
```
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
    <h1>Hello, world!</h1>,
    document.getElementById('root')
);
```
6. add `<div id="root"> </div> in the html`
7. add a rule in webpack.config
```
{
   test: /.js$/,
   exclude: /node_modules/,
   use: 'babel-loader'
}
```



