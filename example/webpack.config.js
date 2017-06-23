var webpack = require('webpack');
module.exports = {
    devtool: 'cheap-eval-source-map',

    entry: {
        index: ['./src/js/main.js'],
    },

    output: {
        path: './dist',
        publicPath: '/',
        filename: 'bundle.js',
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
