import { Server, WebSocket } from 'ws'
import {
  Client,
  Login,
  PlayerJoined,
  Message,
  PlayerUpdate,
} from './interfaces'

export const clients: Client[] = []
type Handler<T> = (ws: WebSocket, payload: T) => void

const onLogin: Handler<Login> = (socket, login) => {
  broadcast<PlayerJoined>(socket, {
    name: 'PlayerJoined',
    payload: { playerId: login.playerId, pos: { x: 0, y: 0 }, angle: 0 },
  })
  clients.forEach(client => {
	socket.send(JSON.stringify({
	  name: 'PlayerJoined',
	  payload: { playerId: client.playerId, pos: client.player.pos, angle: client.player.angle },
	}))
  });
  clients.push({
    player: { pos: {x: 0, y: 0}, angle: 0 },
    socket,
    playerId: login.playerId,
  })
}

const onPlayerUpdate: Handler<PlayerUpdate> = (socket, payload) => {
  broadcast<PlayerUpdate>(socket, { name: 'PlayerUpdate', payload })
  console.log(payload)
  //setTimeout(() => {
  //   socket.send(
  //     JSON.stringify({
  //       name: 'PlayerUpdate',
  //       payload: {
  //         playerId: 'penis',
  //         pos: { x: payload.pos.x, y: payload.pos.y },
  //         angle: 0,
  //       },
  //     })
  //   )
  //  }, 1000)
}

function broadcast<T>(socket: WebSocket, message: Message<T>) {
  clients.forEach((client) => {
    if (client.socket == socket) {
      return
    }
    client.socket.send(JSON.stringify(message))
  })
}

export const handlers: { [key: string]: Handler<any> } = {
  Login: onLogin,
  PlayerUpdate: onPlayerUpdate,
}

function randomCoord() {
  return Math.random() * 10
}

const wss = new Server({ port: 8080 }, () => {
  console.log('Server started 🚀')
})

wss.on('connection', (ws) => {
  console.log('Client connectect')
  //   setTimeout(() => {
  //     ws.send(
  //       JSON.stringify({
  //         name: 'PlayerJoined',
  //         payload: { playerId: 'penis' },
  //       })
  //     )

  ws.on('message', (data) => {
    try {
      const obj = JSON.parse(data.toString())
      console.log(obj)
      const handler = handlers[obj.name as any]
      handler?.(ws, obj.payload)
    } catch (ex) {
      console.error(ex)
    }
  })

  ws.on('close', () => {
    const index = clients.findIndex((client) => client.socket == ws)
    console.log('Client disconected ' + clients[index].playerId)
    if (index > -1) {
      clients.splice(index, 1)
    }
  })
})
