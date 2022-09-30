module.exports = {
  publicPath: "/pokedex/",
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].title = "My Pokedex";
      return args;
    });
  }
};
