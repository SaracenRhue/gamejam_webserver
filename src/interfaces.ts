import type { WebSocket } from 'ws';
export interface Message<T> {
  name: string;
  payload: T;
}

export interface PlayerUpdate {
  pos: { x: number; y: number };
  playerId: string;
  angle: number;
}

export interface Player {
  pos: { x: number; y: number };
  angle: number;
}

export interface Login {
  playerId: string;
}

export interface Client {
  playerId: string;
  socket: WebSocket;
  player: Player;
}

export interface PlayerJoined extends PlayerUpdate {}
