module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb',
    'plugin:sonarjs/recommended',
  ],
  plugins: [
    '@typescript-eslint',
    'sonarjs',
  ],
  env: {
    browser: true,
    es2021: true,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
        ],
      },
    },
  },
  rules: {
    complexity: ['error', { max: 10 }],
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          'windi.config.ts',
          '**/*.test.js',
          '**/*.spec.js',
        ],
      },
    ],
    'import/extensions': [
      'error',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
        json: 'always',
      },
    ],
    'import/prefer-default-export': ['off'],
  },
};
