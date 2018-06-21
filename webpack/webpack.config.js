const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: {
		entry: [path.resolve(__dirname, '../src/index.js')],
	},
　　 output: {
		path: path.resolve(__dirname, "../dist"),
	   	filename: "bundle.js"
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
	devServer: {
        contentBase: path.join(__dirname, '../example'),
        compress: true, 
        port: 9000,
        watchContentBase: true,
        watchOptions: {
            poll: true
        }
    },
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			}
		]
	},
	plugins: [
		new webpack.optimize.ModuleConcatenationPlugin(),
		new webpack.LoaderOptionsPlugin({
			minimize: true
		}),
		new webpack.HotModuleReplacementPlugin()
	],
}
