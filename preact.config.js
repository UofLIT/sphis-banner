import CopyWebpackPlugin from 'copy-webpack-plugin';
export default (config, env, helpers) => {
  delete config.entry.polyfills;
  config.output.filename = "[name].js";

  let { plugin } = helpers.getPluginsByName(config, "ExtractTextPlugin")[0];
	plugin.options.disable = true;


	//let { rule } = helpers.getLoadersByName(config, 'babel-loader')[0];
	//let babelConfig = rule.options;
	// Add missing plugin syntax, until new patch for (developit/preact-cli#461)
	//babelConfig.plugins.push('syntax-dynamic-import');
	//babelConfig.plugins.push(require.resolve('babel-plugin-async-to-promises'));

  if (env.production) {
		config.output.libraryTarget = "umd";
		config.devtool = false; // disable sourcemaps

		//let { index } = helpers.getPluginsByName(config, "UglifyJsPlugin")[0];
		//config.plugins.splice(index, 1);
	}
	config.plugins.push(new CopyWebpackPlugin([{ context: `${__dirname}/src/assets`, from: `*.*` }]));
};
