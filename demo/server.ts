import * as WebSocket from 'ws'

const wss = new WebSocket.Server({ port: 8000 })

wss.on('connection', ws => {
    // do nothing
})

process.on('SIGINT', () => {
  process.exit()
})

process.on('SIGTERM', () => {
  process.exit()
})
