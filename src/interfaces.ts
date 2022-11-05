export interface Message<T> {
	name: string
	payload: T
}

export interface PlayerUpdate {
	x: number
	y: number
	playerId: string
	angle: number
}

