// -*- javascript -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// external dependencies
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');

// local geography
const rootDir = __dirname
const sourceDir = path.join(rootDir, 'client')
const buildDir = path.join(rootDir, 'build')


// the configuration
module.exports = {
    // the main entry point
    entry: {
        flocor: path.join(sourceDir, "flocor.js"),
    },

    // the build product
    output: {
        path: buildDir,
        filename: '[name].js',
    },

    // loader rules
    module: {
        rules: [
            {   // jsx
                test: /\.jsx?$/,
                loader: 'babel-loader',
                include: [ sourceDir ],
            }
        ]
    },

    // locations of files
    resolve: {
        modules: [sourceDir, "node_modules"],
        extensions: ['.js', '.jsx'],
        alias: {
            '~': sourceDir,
        },
        fallback: {
            'path': require.resolve("path-browserify"),
        },
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: 'flocor.html',
            inject: 'body',
            filename: path.join(buildDir, 'flocor.html')
        }),
    ],

    devtool: "inline-source-map",

}


// end of file
