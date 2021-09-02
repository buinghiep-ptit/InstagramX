module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'module:react-native-dotenv',
    [
      'module-resolver',
      {
        moduleName: '@env',
        path: '.env',
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '@src': './src',
          '@screens': './src/screens',
          '@components': './src/components',
          '@assets': './src/assets',
          '@redux': './src/redux',
          '@navigations': './src/navigations',
          '@constants': './src/constants',
          '@api': './src/api',
          '@utils': './src/utils',
        },
      },
    ],
  ],
};