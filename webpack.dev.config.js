var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'cheap-eval-source-map',

    entry: {
        index: [path.join(__dirname, './index.js')],
    },

    output: {
        path: path.join(__dirname, './dist'),
        publicPath: '/',
        filename: '[name].js',
        libraryTarget: 'umd'
    },

    module: {
        loaders: [
            {
                test: /\.less/,
                loaders: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'stage-0']
                }
            }
        ]
    },

    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
};
