import { Server } from 'ws';

export const clients = [];
export const handlers: { [key: string]: Function } = {};

const wss = new Server({ port: 8080 }, () => {
	console.log('Server started 🚀');
});

wss.on('connection', (ws) => {
	console.log('Client connectect');
	ws.on('message', (data) => {
		try {
			const obj = JSON.parse(data.toString());
			const handler = handlers[obj.name as any];
			handler?.(obj.payload);
		} catch (ex) {
			console.error(ex);
		}
	});
});
