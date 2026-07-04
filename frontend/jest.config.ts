export default {
  displayName: 'frontend',
  preset: '../../jest.preset.js',
  coverageReporters: ['cobertura', 'lcov', 'text'],
  reporters: [
    'default',
    ['jest-junit', {
      outputDirectory: '../../coverage/frontend',
      outputName: 'junit.xml',
    }]
  ],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.spec.ts',
    '!src/main.ts',
  ],
  coverageDirectory: '../../coverage/frontend',
};