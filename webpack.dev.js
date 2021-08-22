const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
        new HtmlWebpackPlugin({
            template: './src/client/views/index.html',
            filename: './index.html'
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ]
};