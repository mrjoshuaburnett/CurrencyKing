module.exports = {
  devServer: {
    https: false,
    port: 8085,
  },
  lintOnSave: true,
  transpileDependencies: ["vuetify"],
  configureWebpack: {
    output: {
      filename: `[name].[hash].bundle${new Date().getTime()}.js`,
    },
  },
  css: {
    extract: {
      filename: "css/[name].css?_hash=[contenthash:8]",
      chunkFilename: "css/[name].css?_hash=[contenthash:8]",
    },
  },
  chainWebpack: (config) => {
    config.optimization.minimize(true);

    if (process.env.VUE_APP_ENVIRONMENT === "dev") {
      config.output.filename("js/[name].js?_hash=[contenthash:8]").chunkFilename("js/[name].js?_hash=[contenthash:8]");
    }
  },
};
