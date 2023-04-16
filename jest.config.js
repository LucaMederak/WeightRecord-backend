/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/**/*.test.ts'],
  verbose: true,
  forceExit: true,
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
  moduleNameMapper: {
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@routes/(.*)$': '<rootDir>/src/api/routes/$1',
    '^@services/(.*)$': '<rootDir>/src/api/services/$1',
    '^@controllers/(.*)$': '<rootDir>/src/api/controllers/$1',
    '^@interfaces/(.*)$': '<rootDir>/src/api/interfaces/$1',
    '^@middleware/(.*)$': '<rootDir>/src/api/middleware/$1',
    '^@models/(.*)$': '<rootDir>/src/api/models/$1',
    '^@schemas/(.*)$': '<rootDir>/src/api/schemas/$1',
  },
};
