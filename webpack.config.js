const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const environment = require('./environment');

const {
    NODE_ENV = 'production',
    DB_URL = environment && environment.dbUrl ? environment.dbUrl : ''
} = process.env;

module.exports = {
    entry: './src/index.ts',
    mode: NODE_ENV,
    devtool: 'inline-source-map',
    target: 'node',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'server.js'
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    'ts-loader',
                ],
                exclude: /node_modules/,
            }
        ]
    },
    externals: [ nodeExternals() ],
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
            'process.env.DB_URL': JSON.stringify(DB_URL)
        })
    ]
}
