const path = require('path');
module.exports = {
    entry: {
        entry: [path.resolve(__dirname, './index.js')],
    },
    output: {
        path: path.resolve(__dirname, "./"),
        filename: "bundle.js"
    },
    mode: 'production',
    resolve: {
        extensions: ['.js', '.jsx']
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
    }
}

