module.exports = {
  preset: 'ts-jest',
  verbose: true,
  globals: {
    'ts-jest': {
      tsConfig: 'test/tsconfig.json',
    },
  },
}
