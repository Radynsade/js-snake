const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	entry: './src/index.ts',
	output: {
		filename: 'index.[contenthash].js',
		publicPath: "",
		path: path.resolve(__dirname, 'bin'),
	},
	mode: 'production',
	resolve: {
		extensions: ['.jsx', '.html', '.js', '.ts', '.tsx'],
		alias: {
			Classes: path.resolve(__dirname, './src/classes'),
			Interfaces: path.resolve(__dirname, './src/interfaces'),
			Root: path.resolve(__dirname, './src'),
		}
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title: 'Snake!',
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
