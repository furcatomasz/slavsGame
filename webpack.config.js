const path = require('path');
// Optimizes duplicates in splitted bundles
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
// output folder location
const distFolder = "./dist";

const frontConfig = {
    mode: 'development',
    target: 'web',
    node: {
        fs: 'empty'
    },
    entry: './src/indexFrontend.ts',
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
    externals: {
        uws: "uws"
    }
};

const backConfig = {
    mode: 'development',
    target: "node",
    entry: {
        app: ["./src/indexBackend.ts"]
    },
    resolve: {
        extensions: [ ".tsx", ".ts", ".js" ]
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
    output: {
        path: path.resolve(__dirname, distFolder),
        filename: "aiserver-backend.js"
    },
    externals: [nodeExternals()],
};

module.exports = [ frontConfig, backConfig ];
