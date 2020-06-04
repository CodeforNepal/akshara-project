// This is a deprecated way, and you should see a warning when starting storybook
// But only Allah knows what's up. I spent an entire day in webpack hell and gave up.
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: '[name]__[local]___[hash:base64:5]',
              }
            },
          }
        ],
      },
    ],
  },
  resolve: {
    alias: {
      'react': 'preact/compat',
      'react-dom': 'preact/compat',
    }
  },
}
