const { sleep, Service, checkGitStatus } = require('clean-scripts')

const tsFiles = `"src/**/*.ts" "spec/**/*.ts" "demo/**/*.ts"`
const jsFiles = `"*.config.js"`

module.exports = {
  build: [
    `rimraf dist/`,
    {
      back: `tsc -p src/tsconfig.nodejs.json`,
      front: [
        `tsc -p src/tsconfig.browser.json`,
        `rollup --config rollup.config.js`
      ]
    }
  ],
  lint: {
    ts: `tslint ${tsFiles}`,
    js: `standard ${jsFiles}`,
    export: `no-unused-export ${tsFiles}`,
    commit: `commitlint --from=HEAD~1`
  },
  test: [
    'tsc -p spec',
    'jasmine',
    'tsc -p demo',
    new Service('node demo/server.js', 'server'),
    new Service('node demo/client.js'),
    () => sleep(2000),
    async context => context.server.kill('SIGINT'),
    () => sleep(18000),
    new Service('node demo/server.js', 'server'),
    () => sleep(10000),
    () => checkGitStatus()
  ],
  fix: {
    ts: `tslint --fix ${tsFiles}`,
    js: `standard --fix ${jsFiles}`
  }
}
