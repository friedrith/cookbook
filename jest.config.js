const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

/** @type {import('jest').Config} */
const config = {
  rootDir: './',
  setupFilesAfterEnv: ['<rootDir>/.jest/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  modulePathIgnorePatterns: [
    '<rootDir>/api/lib',
    '<rootDir>/build',
    '<rootDir>/.next',
  ],
  testEnvironment: 'jest-environment-jsdom',
}

module.exports = createJestConfig(config)
