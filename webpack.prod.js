const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/client/index.js',
    mode: 'production',
    module: {
        rules: []
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ]
};