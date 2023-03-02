module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    // 'eslint:recommended',
    // 'plugin:import/errors',
    // 'plugin:import/warnings',
    // 'plugin:import/typescript',
    // 'google',
    // 'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.json', 'tsconfig.dev.json'],
    sourceType: 'module',
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: [
    './src/**/__fixtures__/*',
    '/lib/**/*',
    './jest.config.js', // Ignore built files.
  ],
  plugins: ['@typescript-eslint', 'import'],
  rules: {
    'import/no-unresolved': 0,
    semi: 0,
    'valid-jsdoc': 0,
  },
}
