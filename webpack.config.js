const path = require('path');
const webpack = require('webpack');
module.exports = {
    entry: {
        entry: [path.resolve(__dirname, './example/index.js')],
    },
    output: {
        path: path.resolve(__dirname, "./example"),
        filename: "bundle.js"
    },
    mode: 'development',
    resolve: {
        extensions: ['.js', '.jsx']
    },
    devServer: {
        contentBase: path.join(__dirname, "example"),
        inline: true,
        port: 9000,
        historyApiFallback: true
    },
    devtool: 'eval-source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test:/\.css$/,
                use:['style-loader','css-loader'],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin({})
    ],
}

