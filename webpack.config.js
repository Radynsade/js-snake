const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const devMode = false;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// Need to be configured
const PreloadWebpackPlugin = require('preload-webpack-plugin');

module.exports = {
	entry: './src/index.tsx',
	output: {
		filename: 'index.[contenthash].js',
		publicPath: "/",
		path: path.resolve(__dirname, 'bin'),
	},
	mode: 'production',
	resolve: {
		extensions: ['.jsx', '.html', '.js', '.ts', '.tsx'],
		alias: {
			Components: path.resolve(__dirname, './src/components'),
			Appearance: path.resolve(__dirname, './src/appearance'),
			Routes: path.resolve(__dirname, './src/routes'),
			Libraries: path.resolve(__dirname, './src/libraries')
		}
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title: 'Ardy',
			template: './src/index.html'
		}),
	],
	module: {
		rules: [
			{
				test: /\.(tsx|ts)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				},
			},
			{
                test: /\.html$/,
                loader: 'html-loader'
            }
		]
	},
	optimization: {
		splitChunks: {
			chunks: 'async',
			cacheGroups: {
				common: {
					name: 'common',
					minChunks: 2,
					chunks: 'initial',
					priority: 10,
					reuseExistingChunk: true,
					enforce: true
				},
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendor',
					chunks: 'all',
					priority: 20
				}
			}
		}
	}
};
