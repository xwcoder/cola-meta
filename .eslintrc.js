module.exports = {
  extends: [
    'airbnb',
    'plugin:sonarjs/recommended',
  ],
  plugins: ['sonarjs'],
  env: {
    browser: true,
    es2021: true,
  },
  rules: {
    complexity: ['error', { max: 10 }],
    'react/prop-types': ['off'],
  },
};
