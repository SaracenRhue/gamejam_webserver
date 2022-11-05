import { Server } from 'ws'
import { PlayerUpdate, Message, Login, Client } from './interfaces'
const wss = new Server({ port: 8080 }, () => {
	console.log('server started')
})


// const message: Message<PlayerUpdate> = {
// 	name: 'playerUpdate',
// 	payload: { x: 1, y: 2, angle: 3, playerId: 4308493 },
// }




var players: Client[] = []
function addPlayer(client: Client) {
	players.push(client)
    console.log('player '+client.playerId+' connected')
}


function onLogin(payload: Login) {
    //addPlayer(payload.playerId)
}

function onPlayerUpdate(payload: PlayerUpdate){
    
}

const handlers: { [key: string]: any} = {
PlayerUpdate: onPlayerUpdate,
Login: onLogin
}
wss.on('connection', (ws) => {
	console.log('connection')
    ws.send(JSON.stringify({name: 'test',payload: {}}))
	ws.on('message', (data) => {
		const obj: Message<any> = JSON.parse(data.toString())

        console.log(obj)
		console.log(obj.payload)

		const handler = handlers[obj.name as any]
		handler?.(obj.payload) 
	})
    ws.on('close', (ws) => {
        players.pop()
        console.log('connection closed')
    })
})



// const msg = { name: 'player_update', payload: { playerId: 12, x: 12, y: 32, angle: 75 } }

wss.on('listening', () => {
	console.log('listening on 8080')
})
