import { FastifyInstance } from "fastify/fastify";
import { WebSocket } from 'ws';

export type handler = (app: FastifyInstance, ws: WebSocket, data: any) => Promise<any>;
