var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var stylus = require('stylus');
var nib = require('nib');
var autoprefixer = require('autoprefixer');
// var stylusLoader = ExtractTextPlugin.extract("style-loader", "css-loader!stylus-loader");
var HtmlWebpackPlugin = require('html-webpack-plugin');
//var jade = require("jade");

var debug = process.env.NODE_ENV !== "production";


module.exports = {
	context: __dirname + "/builds",
	entry: "./js/main.js",
	devtool: debug ? "inline-sourcemap" : null,
    output: {
        path: "./dist",
        filename: "js/[name].js"
    },
    module:{
    	loaders:[	
            { test: /\.styl$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss?pack=cleaner!stylus-loader")},
            { include: /\.pug/, loader: "pug-html-loader" }
    	]

    },
    plugins: debug ? [new ExtractTextPlugin("css/[name].css"), new HtmlWebpackPlugin({filename:'index.html',template:'./index.pug'}) ] : [
    	new ExtractTextPlugin("css/[name].css"),
    	new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    ],
  	stylus:{
  		use: [nib()]
  	},
    postcss: function () {
        return {
            default: [autoprefixer],
            cleaner: [autoprefixer({browsers:[]})]
        }
    }

	// module: {
	// 	loaders: [{
	// 		test: /\.styl$/,
	// 		loader: stylusLoader
	// 	}]
	// },
	// plugins: [
	// 	new ExtractTextPlugin("./dist/css/[name].css")
	// ]
};