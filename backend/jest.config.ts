export default {
  displayName: ' backend',
  preset: '../../jest.preset.js',
  coverageReporters: ['cobertura', 'lcov', 'text'],
  reporters: [
    'default',
    ['jest-junit', {
      outputDirectory: '../../coverage/backend',
      outputName: 'junit.xml',
    }]
  ],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.spec.ts',
    '!src/main.ts',
  ],
  coverageDirectory: '../../coverage/backend',
};