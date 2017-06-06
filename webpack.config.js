const PRODUCTION = (process.env.NODE_ENV === "production");

const webpack = require('webpack'); //to access built-in plugins
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: [
        './src/iScrollDropdownMenu.js',
        './src/iScrollDropdownMenu.scss',
        './src/demo-basic.scss',
        './src/demo-intralignes.scss',
        './src/demo-rh.scss',
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'iScrollDropdownMenu.bundle.js'
    },
    devtool: PRODUCTION ? 'source-map' : 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].css',
                        }
                    },
                    {
                        loader: 'extract-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: !PRODUCTION,
                            minimize: PRODUCTION,
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: !PRODUCTION
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('[name].css'),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }),
    ]
};
