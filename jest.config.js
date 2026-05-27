module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['src/**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  roots: ['<rootDir>/src', '<rootDir>/test'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
  projects: [
    {
      displayName: 'unit',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/test/modules/unit/**/*.spec.ts'],
      moduleFileExtensions: ['js', 'json', 'ts'],
      transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
      },
      moduleNameMapper: {
        '^src/(.*)$': '<rootDir>/src/$1',
      },
    },
    {
      displayName: 'e2e',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/test/modules/e2e/**/*.e2e-spec.ts'],
      moduleFileExtensions: ['js', 'json', 'ts'],
      transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
      },
      moduleNameMapper: {
        '^src/(.*)$': '<rootDir>/src/$1',
      },
    },
  ],
};
