import type { WebSocket } from 'ws';
export interface Message<T> {
	name: string;
	payload: T;
}

export interface PlayerUpdate {
	x: number;
	y: number;
	playerId: string;
	angle: number;
}

export interface Player {
	x: number;
	y: number;
	angle: number;
}

export interface Login {
    playerId: string
}
export interface Client {
	uuid: string;
	socket: WebSocket;
	player: Player;
}
