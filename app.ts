import { Server } from 'ws';
const wss = new Server({ port: 8080 }, () => {
	console.log('server started');
});

interface Message<T> {
	name: string;
	payload: T;
}

interface PlayerUpdate {
	x: number;
	y: number;
	playerId: number;
	angle: number;
}

const message: Message<PlayerUpdate> = {
	name: 'playerUpdate',
	payload: { x: 1, y: 2, angle: 3, playerId: 4308493 },
};

wss.on('connection', (ws) => {
	ws.on('message', (data) => {
		const obj = JSON.parse(data.toString());

		console.log(obj);
	});
});

const message = { name: 'player_update', payload: { playerId: 12, x: 12, y: 32, angle: 75 } };

wss.on('listening', () => {
	console.log('listening on 8080');
});
