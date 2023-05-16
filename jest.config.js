/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  testMatch: ['<rootDir>/src/**/*.spec.{tsx,ts}'],
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '~/(.*)$': '<rootDir>/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/scripts/jest/setupTests.ts'],
}
