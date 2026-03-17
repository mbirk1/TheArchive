const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('path');

module.exports = {
  mode: 'development',
  target: 'node',
  output: {
    path: join(__dirname, '../dist/apps/backend'),
    clean: true,
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
  },
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: 'backend/src/main.ts',
      tsConfig: 'backend/tsconfig.app.json',
      assets: ['backend/src/assets'],
      optimization: false,
      outputHashing: 'none',
      generatePackageJson: false,
      sourceMap: true,
    }),
  ],
};
