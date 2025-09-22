const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("@module-federation/enhanced/webpack");

module.exports = {
	entry: "./src/index.js",
	mode: "development",
	devServer: {
		port: 3001,
		historyApiFallback: true
	},
	output: {
		publicPath: "auto",
		clean: true
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env", "@babel/preset-react"]
					}
				}
			}
		]
	},
	resolve: {
		extensions: [".js", ".jsx"]
	},
	plugins: [
		new ModuleFederationPlugin({
			name: "auth", // Fixed: was "dashboard"
			filename: "remoteEntry.js",
			exposes: {
				"./AuthApp": "./src/bootstrap.js" // Fixed: correct name and path
			},
			shared: {
				react: { singleton: true, requiredVersion: "^18.2.0", eager: true },
				"react-dom": { singleton: true, requiredVersion: "^18.2.0", eager: true },
				"react-router-dom": { singleton: true, requiredVersion: "^6.22.0", eager: true }
			}
		}),
		new HtmlWebpackPlugin({
			template: "./public/index.html"
		})
	]
};