const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// App directory
const appDirectory = fs.realpathSync(process.cwd());

// Gets absolute path of file within app directory
const resolveAppPath = (relativePath) =>
    path.resolve(appDirectory, relativePath);

const host = process.env.HOST || 'localhost';

module.exports = {
    mode: 'development',

    // Entry point of app
    entry: resolveAppPath('src'),

    output: {
        path: path.resolve(__dirname, './public'),
        filename: 'bundle.js',
    },

    devServer: {
        // Serve index.html as the base
        static: resolveAppPath('public'),

        // Enable compression
        compress: true,

        // Enable hot reloading
        hot: true,
        host,
        port: 8080,
        open: true,
    },

    plugins: [
        // Re-generate index.html with injected script tag.
        // The injected script tag contains a src value of the
        // filename output defined above.
        new HtmlWebpackPlugin({
            inject: true,
            template: resolveAppPath('public/index.html'),
        }),

        new MiniCssExtractPlugin(),
    ],

    module: {
        rules: [
            {
                test: /\.(ts|js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.(c|sa|sc)ss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg|jpg|png)$/,
                use: {
                    loader: 'url-loader',
                },
            },
        ],
    },

    resolve: {
        extensions: ['*', '.ts', '.js', '.jsx'],
    },
};
