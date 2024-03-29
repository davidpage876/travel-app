const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './src/client/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'var',
        library: 'Client'
    },
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        static: './src/client',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [ 'style-loader', 'css-loader', 'sass-loader' ]
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                type: 'asset/resource'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/client/views/index.html',
            filename: './index.html'
        }),
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ]
};