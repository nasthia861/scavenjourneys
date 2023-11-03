// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const Dotenv = require('dotenv-webpack');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


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
            favicon: 'client/favicon.svg'
        }),

        new MiniCssExtractPlugin(),

        new Dotenv({
            template: path.join(__dirname, ".env"),
          }),

        // new BundleAnalyzerPlugin()
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
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif|ico)$/i,
                type: 'asset',
            },

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '.svg', '...'],
        alias: {
            'client/addons/TextGeometry': path.resolve(__dirname, 'client/addons/TextGeometry'),
            'client/addons/FontLoader': path.resolve(__dirname, 'client/addons/FontLoader'),
          }
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';

        //config.plugins.push(new MiniCssExtractPlugin());
        //config.plugins.push(new Dotenv());
        config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());

    } else {
        config.mode = 'development';
        // config.plugins.push(new Dotenv())
    }
    return config;
};