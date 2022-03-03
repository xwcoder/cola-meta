module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          chrome: '90',
        },
      },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
  ],
};
