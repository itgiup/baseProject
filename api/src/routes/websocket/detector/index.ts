import { FastifyInstance } from "fastify/fastify";
import { WebSocket } from 'ws';

export default async function handler(app: FastifyInstance, ws: WebSocket, data: any) {
    ws.send(JSON.stringify({
        type: data.type,
        data: 'Hello from detector!',
    }));
}