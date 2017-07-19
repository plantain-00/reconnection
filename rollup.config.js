import uglify from 'rollup-plugin-uglify'
import resolve from 'rollup-plugin-node-resolve'

export default {
  entry: 'dist/browser/browser.js',
  dest: 'dist/reconnection.min.js',
  format: 'umd',
  moduleName: 'Reconnector',
  plugins: [resolve(), uglify()]
}
