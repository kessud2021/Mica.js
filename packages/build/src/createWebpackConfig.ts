import * as path from 'path';

export interface BuildConfig {
  appDir: string;
  outDir: string;
  isDev: boolean;
}

export default function createWebpackConfig(config: BuildConfig) {
  return {
    mode: config.isDev ? 'development' : 'production',
    entry: path.join(config.appDir, 'src/index.ts'),
    output: {
      path: config.outDir,
      filename: config.isDev ? '[name].js' : '[name].[contenthash].js',
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    devtool: config.isDev ? 'cheap-module-source-map' : 'source-map',
  };
}
