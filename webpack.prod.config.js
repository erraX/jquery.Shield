var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        index: ['./index.js'],
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
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            compress: {
                warnings     : false,
                sequences    : true,
                dead_code    : true,
                conditionals : true,
                booleans     : true,
                unused       : true,
                if_return    : true,
                join_vars    : true,
                drop_console : true,
            },
            mangle: {
                except: ['$super', '$', 'exports', 'require']
            },
            output: {
                comments: false
            }
        }),
    ]
};
