const { uglify } = require('rollup-plugin-uglify')
const resolve = require('@rollup/plugin-node-resolve')

module.exports = {
  input: 'dist/browser/browser.js',
  plugins: [resolve({ browser: true }), uglify()],
  output: {
    name: 'Reconnector',
    file: 'dist/reconnection.min.js',
    format: 'umd'
  }
}
