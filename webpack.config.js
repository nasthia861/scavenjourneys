// Generated using webpack-cli https://github.com/webpack/webpack-cli

import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import WorkboxWebpackPlugin from 'workbox-webpack-plugin';
import Dotenv from 'dotenv-webpack';


const isProduction = process.env.NODE_ENV == 'production';


const stylesHandler = MiniCssExtractPlugin.loader;



const config = {
    entry: path.resolve(__dirname, "client/index.tsx"),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    devServer: {
        open: true,
        host: 'localhost',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'client/index.html',
        }),

        new MiniCssExtractPlugin(),

        new Dotenv({
            template: path.join(__dirname, ".env"),
          }),

        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                exclude: ['/node_modules/'],
                use: {
                    loader: "babel-loader",
                    options: {
                      presets: [
                        "@babel/preset-env",
                        "@babel/preset-react",
                        "@babel/preset-typescript",
                      ],
                    },
                  },
            },
            {
                test: /\.css$/i,
                use: [stylesHandler,'css-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';

        config.plugins.push(new MiniCssExtractPlugin());
        config.plugins.push(new Dotenv());
        config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());

    } else {
        config.mode = 'development';
        config.plugins.push(new Dotenv())
    }
    return config;
};
