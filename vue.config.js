module.exports = {
  // publicPath: process.env.NODE_ENV === 'production'
  //   ? '/pksf/vfontend/'
  //   : '/',
  // publicPath: process.env.NODE_ENV === "production" ? "/pksf/" : "/",
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
  devServer: {
    disableHostCheck: true,
  },

  transpileDependencies: ["vuetify"],

  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: false,
    },
  },
};
