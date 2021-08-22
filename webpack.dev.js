const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/client/index.js',
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        static: './dist',
    },
    module: {
        rules: []
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ]
};