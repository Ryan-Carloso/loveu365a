// babel.config.js

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Remove or comment out the dotenv plugin
      // [
      //   'module:react-native-dotenv',
      //   {
      //     moduleName: '@env',
      //     path: '.env',
      //     blacklist: null,
      //     whitelist: null,
      //     safe: false,
      //     allowUndefined: true,
      //   },
      // ],
    ],
  };
};
