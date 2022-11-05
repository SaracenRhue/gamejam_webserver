import { Server } from 'ws'
import { PlayerUpdate, Message } from './interfaces'
const wss = new Server({ port: 8080 }, () => {
	console.log('server started')
})


// const message: Message<PlayerUpdate> = {
// 	name: 'playerUpdate',
// 	payload: { x: 1, y: 2, angle: 3, playerId: 4308493 },
// }

var players: string[] = []
function checkPlayer(id: string) {
	players.forEach(item => {
		if (item == id) {
			return true
		}
	})
	return false
}

function onPlayerUpdate(payload: PlayerUpdate){

}

const handlers: { [key: string]: any} = {playerUpdate: onPlayerUpdate}
wss.on('connection', (ws) => {
	console.log('connection')
	ws.on('message', (data) => {
		const obj: Message<any> = JSON.parse(data.toString())
		const handler = handlers[obj.name as any]
		handler?.(obj.payload) 
	//	checkPlayer(obj.playerId)
		console.log(obj)
		console.log(obj.payload)
	})
})

// const msg = { name: 'player_update', payload: { playerId: 12, x: 12, y: 32, angle: 75 } }

wss.on('listening', () => {
	console.log('listening on 8080')
})
