const path = require('path');
// Optimizes duplicates in splitted bundles
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const distFolder = "./dist/game";

const gameConfig = {
    mode: 'development',
    target: 'web',
    node: {
        fs: 'empty'
    },
    entry: './src/game/Initializer.ts',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: distFolder
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all"
                }
            }
        }
    },
    resolve: {
        extensions: [ ".tsx", ".ts", ".js" ]
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, distFolder)
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: __dirname + '/assets',
                to: __dirname + '/' + distFolder +'/assets',
                toType: 'dir'
            }
        ])
    ]
};


module.exports = [ gameConfig ];
