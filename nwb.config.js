module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'ReactFilter',
      externals: {
        react: 'React'
      }
    }
  },
  karma: {
    testContext: 'tests.webpack.js'
  }
}
