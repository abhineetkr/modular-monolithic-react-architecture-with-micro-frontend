const { ModuleFederationPlugin } = require("@module-federation/enhanced/webpack");

module.exports = {
	mode: "development",
	plugins: [
		new ModuleFederationPlugin({
			name: "shared",
			filename: "remoteEntry.js",
			exposes: {
				"./AppStore": "./src/store/AppStore.js",
				"./useAppState": "./src/hooks/useAppState.js"
			},
			shared: {
				react: { singleton: true, requiredVersion: "^18.2.0", eager: true },
				"react-dom": { singleton: true, requiredVersion: "^18.2.0", eager: true }
			}
		})
	]
};