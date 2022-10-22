import { sleep, Service } from 'clean-scripts'

const tsFiles = `"src/**/*.ts" "demo/**/*.ts"`

export default {
  build: [
    `rimraf dist/`,
    {
      back: [
        'tsc -p src/tsconfig.nodejs.json',
        'api-extractor run --local'
      ],
      front: [
        `tsc -p src/tsconfig.browser.json`,
        `rollup --config rollup.config.mjs`
      ]
    }
  ],
  lint: {
    ts: `eslint --ext .js,.ts,.tsx ${tsFiles}`,
    export: `no-unused-export ${tsFiles}`,
    markdown: `markdownlint README.md`,
    typeCoverage: 'type-coverage -p src/tsconfig.nodejs.json --strict',
    typeCoverageBrowser: 'type-coverage -p src/tsconfig.browser.json --strict'
  },
  test: [
    new Service('ts-node demo/server.ts', 'server'),
    () => sleep(2000),
    new Service('ts-node demo/client.ts'),
    () => sleep(2000),
    async (context: any) => context.server.kill('SIGINT'),
    () => sleep(18000),
    new Service('node demo/server.js', 'server')
  ],
  fix: `eslint --ext .js,.ts,.tsx ${tsFiles} --fix`
}
