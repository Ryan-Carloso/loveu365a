// metro.config.js

const { getDefaultConfig } = require('expo/metro-config');

module.exports = (async () => {
  const config = await getDefaultConfig(__dirname);

  // Add alias for '@env' to resolve to the .env file
  config.resolver.alias = {
    ...(config.resolver.alias || {}),
    '@env': './.env',
  };

  return config;
})();
