import * as WebSocket from 'ws'
import Reconnector from '../dist/nodejs/nodejs'

let ws: WebSocket
const reconnector = new Reconnector(() => {
  console.log(`${new Date()} connecting...`)
  ws = new WebSocket('ws://localhost:8000')
  ws.onclose = () => {
    console.log(`${new Date()} disconnected...`)
    reconnector.reconnect()
  }
  ws.onopen = () => {
    console.log(`${new Date()} connected...`)
    reconnector.reset()
  }
  ws.onerror = error => {
    if (error) {
      // do nothing
    }
  }
})

process.on('SIGINT', () => {
  process.exit()
})

process.on('SIGTERM', () => {
  process.exit()
})
