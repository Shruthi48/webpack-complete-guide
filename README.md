# webpack 3.0 ^

`npm run dev` - to start the application <br>

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
<hr>
<b> session - 7 RimRaf (cleaning dist and handling multiple templates) </b> <br>

1. npm install -D rimraf
2. create a script in package.json
```
"scripts" : {
"dev" : "webpack-dev-server",
"prod" : "npm run clean && webpack -p",
"clean" : "rimraf ./dist/*"  //deletes the files under dist folder
}
```

3. for creating multiple bundles , create multiple entries 
```
 entry : {
 app: './src/app.js',
 contact: './src/contact.js'
 },
 output: {
  filename: [name].bundle.js
 }
 
 ```
 4. add another htmlWebpackPlugin
 ```
 new htmlWebpackPlugin({
            title: 'Contact Page',
            filename: 'contact.html',
            template: './src/contact.html',
            minify: {
                collapseInlineTagWhitespace: true,
                collapseWhitespace: true
            },
            chunks: ['contact'], // spicifies which chunk of the bundle to be used 
            hash: true
        });
 ```
<hr>
<b> session-8 dealing with the pug </b> <br>

1. run `npm install -D pug pug-html-loader'`
2. add another rule 
```
  {
     test: /.pug$/,
     use: ['html-loader','pug-html-loader']
  
  }
 ```
<hr>
<b> session -9 Hot Module Replacement </b>
 
 1. add hot: true in devServer
 ```
 devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        compress: true,
        port: 9000,
        stats: "errors-only",
        open: true,
        hot: true
    }
  ```
  2. include in webpack.config
  ```
  const webpack = require('webpack')
  new webpack.NamedModulesPlugin(),
  new webpack.HotModuleReplacementPlugin()
  
  ```
  3. remove extractTextplugin related code , cause it won't work with hot module replacement
  <hr>
  
<b> session-10 Production and development Environment configs </b> <br>

1. you need extractTextWebpackPlugin for production mode but you need hot loading for development mode , it can be achieved by having different configs for different environments .
2. set NODE_ENV = production when running the command , and access it using process.env.NODE_ENV 
3. Turn on and off the feature by using a flag or variable.

<hr>

<b> session-11 loading images </b> <br>

1. npm install `file-loader` `image-webpack-loader`
2. use ` <img src=<%= require('./images/mylogo.png') %> />` in html to include image
3. add a rule to webpack.config
```
{
                test: /\.(png|svg|jpe?g|gif)$/,
                use: [
                    'file-loader?name=[name].[ext]&outputPath=images/' ,
                    'image-webpack-loader'
                ]
}
```
4. scss changes to include image 
```
 background: url('./images/mylogo.png');     
 ```

## Google maps API ##
1. https://code.google.com/apis/console

