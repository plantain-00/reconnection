import uglify from 'rollup-plugin-uglify'
import resolve from 'rollup-plugin-node-resolve'

export default {
  input: 'dist/browser/browser.js',
  name: 'Reconnector',
  plugins: [resolve(), uglify()],
  output: {
    file: 'dist/reconnection.min.js',
    format: 'umd'
  }
}
