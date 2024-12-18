module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'], // If you're using Expo
    plugins: [
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env',
          blocklist: null,
          allowlist: null,
          safe: false,
          allowUndefined: true,
          verbose: false,
        },
      ],
    ],
  }
}
