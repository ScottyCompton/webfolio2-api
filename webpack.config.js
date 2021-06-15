const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')


process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV === 'development') {
    require('dotenv').config({path: '.env.development'});
}

module.exports = (env, argv) => {
    const isProduction = env==='production';
    return ({
        entry: {
            server: './src/app.js',
        },
        output: {
            path: path.join(__dirname, `dist/app.js`),
            publicPath: '/',
            filename: 'app.js'
        },
        target: 'node',
        node: {
            // Need this when working with express, otherwise the build fails
            __dirname: false,   // if you don't put this is, __dirname
            __filename: false,  // and __filename return blank or /
        },
        externals: [nodeExternals()], // Need this to avoid error when working with Express
        module: {
            rules: [
            {
                // Transpiles ES6-8 into ES5
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                loader: "babel-loader"
                }
            }
            ]
        },
        plugins: [
           new webpack.DefinePlugin({
            'process.env.DB_URL': JSON.stringify(process.env.DB_URL),
            'process.env.JWT_SECRET': JSON.stringify(process.env.JWT_SECRET),
            'process.env.API_PORT': JSON.stringify(process.env.API_PORT),
            'process.env.API_ENV': JSON.stringify(process.env.API_ENV)
           })
        ],        
    })
}    