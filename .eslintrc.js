const path = require('path')

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    browser: true,
    node: true,
  },
  env: {
    es6: true,
    amd: true,
    node: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'prettier',
    'plugin:jsx-a11y/recommended',
    'plugin:i18next/recommended',
    'plugin:i18n-json/recommended',
    'plugin:sonarjs/recommended',
    'plugin:json/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: [
    'react',
    'prettier',
    'jsx-a11y',
    'i18next',
    'sonarjs',
    '@typescript-eslint',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'i18n-json/sorted-keys': 'off',
    'i18n-json/valid-message-syntax': 'off',
    'i18n-json/identical-keys': [
      2,
      {
        filePath: path.resolve('scripts/locales/findLocaleFiles.js'),
      },
    ],
  },
  overrides: [
    {
      files: ['**/__tests__/**/*'],
      rules: {
        'i18next/no-literal-string': 0,
      },
    },
    {
      files: ['*.js', '*.jsx'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
    {
      files: ['tests/**/*'],
      rules: {
        'testing-library/prefer-screen-queries': 'off',
      },
    },
    {
      files: ['public/service-worker.js'],
      globals: {
        self: 'readonly',
      },
    },
    // {
    //   files: ['public/locales/**/*'],
    //   rules: {
    //     'no-warning-comments': [
    //       'warn',
    //       { terms: ['TODO', 'fixme', 'any other term'], location: 'anywhere' },
    //     ],
    //   },
    // },
  ],
  globals: {
    plausible: 'readonly',
  },
  settings: {
    'import/resolver': 'parcel',
    react: {
      version: 'detect', // React version. "detect" automatically picks the version you have installed.
    },
  },
}
