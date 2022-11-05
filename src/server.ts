import { Server, WebSocket } from 'ws';
import { Client, Login } from './interfaces';

export const clients: Client[] = [];
type Handler<T> = (ws: WebSocket, payload: T) => void;

const onLogin: Handler<Login> = (socket, login) => {
	clients.push({ player: { x: 0, y: 0, angle: 0 }, socket, playerId: login.playerId });
};

export const handlers: { [key: string]: Handler<any> } = {
	Login: onLogin,
};

const wss = new Server({ port: 8080 }, () => {
	console.log('Server started 🚀');
});

wss.on('connection', (ws) => {
	console.log('Client connectect');
	ws.on('message', (data) => {
		try {
			const obj = JSON.parse(data.toString());
			const handler = handlers[obj.name as any];
			handler?.(ws, obj.payload);
		} catch (ex) {
			console.error(ex);
		}
	});
	ws.on('close', () => {
		const index = clients.findIndex((client) => client.socket == ws);
		if (index > -1) {
			clients.splice(index, 1);
		}
	});
});
