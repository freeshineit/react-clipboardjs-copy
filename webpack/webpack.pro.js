const path = require('path');
const webpack = require('webpack');
module.exports = {
    entry: {
        entry: [path.resolve(__dirname, '../src/index.js')],
    },
    output: {
        path: path.resolve(__dirname, "../lib"),
        filename: "index.js"
    },
    resolve: {
        extensions: ['.js', '.jsx']
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
        new webpack.optimize.UglifyJsPlugin({ minimize: true }),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify('production')
            }
        })
    ],
}
