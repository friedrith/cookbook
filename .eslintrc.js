const path = require('path')

module.exports = {
  extends: [
    'prettier',
    'react-app',
    'react-app/jest',
    'plugin:jsx-a11y/recommended',
    'plugin:i18next/recommended',
    'plugin:i18n-json/recommended',
    'plugin:sonarjs/recommended',
  ],
  plugins: ['prettier', 'jsx-a11y', 'i18next', 'sonarjs'],
  rules: {
    'i18n-json/sorted-keys': 'off',
    'i18n-json/valid-message-syntax': 'off',
    'i18n-json/identical-keys': [
      2,
      {
        filePath: {
          'default.json': path.join(
            __dirname,
            './public/locales/en/default.json',
          ),
          'faq.json': path.join(__dirname, './public/locales/en/faq.json'),
          'marketing.json': path.join(
            __dirname,
            './public/locales/en/marketing.json',
          ),
          'help.json': path.join(__dirname, './public/locales/en/help.json'),
          'login.json': path.join(__dirname, './public/locales/en/login.json'),
        },
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
      files: ['tests/**/*'],
      rules: {
        'testing-library/prefer-screen-queries': 'off',
      },
    },
    {
      files: ['public/locales/**/*'],
      rules: {
        'no-warning-comments': [
          'warn',
          { terms: ['TODO', 'fixme', 'any other term'], location: 'anywhere' },
        ],
      },
    },
  ],
  globals: {
    plausible: 'readonly',
  },
}
