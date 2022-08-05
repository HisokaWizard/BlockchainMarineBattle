module.exports = {
  env: {
    browser: false,
    es2021: true,
    mocha: true,
    node: true,
  },
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:prettier/recommended', 'plugin:react/recommended'],
  parser: '@typescript-eslint/parser',
  rules: {
    'node/no-unsupported-features/es-syntax': ['error', { ignores: ['modules'] }],
    'camelcase': 'off',
    'node/no-missing-import': 'off',
    'node/no-missing-require': 'off',
    'no-use-before-define': 'off',
  },
  ignorePatterns: ['webpack.config.js'],
};
