import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import fastify from "fastify";
import autoload from "@fastify/autoload";
import jwt from "@fastify/jwt";
import path from "path";
import cors from "@fastify/cors";
import redis from "./plugins/redis";
import logger from "./plugins/logger";
import mongoose from "./plugins/mongoose";
import { connect } from "mongoose";
import configs from "./configs";
import fastifyRecaptcha from "fastify-recaptcha";
import websocket from '@fastify/websocket';
import WebSocket from 'ws';
import autoRoute from "./routes/websocket";
import WebSocketClientsManager from "./utils/WebSocketClients";



const { expand } = require('dotenv-expand')
const { log } = console
expand(dotenv.config());

const ADMIN = process.env.ADMIN;
const API = process.env.API;

const app = fastify({
  logger: false
});

app.register(websocket);
app.register(cors);
app.register(redis);
app.register(logger);
app.register(mongoose);

app.register(fastifyRecaptcha, {
  recaptcha_secret_key: process.env.RECAPTCHA_SECRETKEY
})

app.register(jwt, {
  secret: process.env.SECRET,
  sign: {
    expiresIn: "7d"
  },
  formatUser: (user: {
    id: string,
    username: string,
    permission: string
  }) => {
    return {
      id: user.id,
      username: user.username,
      permission: user.permission
    }
  }
});

app.addHook("onRequest", async (request, reply) => {
  try {
    if ((request.url.startsWith(`/${ADMIN}`) && !request.url.includes("/ajax/")) || request.url.includes("/ajax/isLogin")) {
      await request.jwtVerify();
    } else return;
  } catch (err) {
    log("onRequest", request.url, request.params)
    reply.send({
      status: false,
      message: err.message
    });
  }
});

app.register(autoload, {
  dir: path.resolve(__dirname, "routes", "admin"),
  options: {
    prefix: `/${ADMIN}`
  }
});

app.register(autoload, {
  dir: path.resolve(__dirname, "routes", "api"),
  options: {
    prefix: `/${API}`
  }
});

app.register(autoload, {
  dir: path.resolve(__dirname, "routes", "ajax"),
  options: {
    prefix: `/${ADMIN}/ajax`
  }
});

/**
 * WebSocket server
 */
const websocketClients = new WebSocketClientsManager();
const wss = new WebSocket.Server({ port: 3002 });
wss.on('connection', (ws) => {
  const id = uuidv4();
  console.log('Client connected', id);
  // socket.send('Hello from server!');
  ws.on('close', () => {
    console.log('Client disconnected');
    websocketClients.removeClient(id);
  })

  ws.on('error', (err: any) => {
    console.error('WebSocket error:', err);
  })

  ws.on('ping', () => {
    console.log('Ping received from client');
  })

  ws.on('pong', () => {
    console.log('Pong received from client');
  })

  ws.on('message', (data) => {
    try {
      const message = JSON.parse(data.toString());

      autoRoute(app, ws, message);
      // handle incoming messages from the client
      console.log('Received message:', message);
      // process the message and send a response back to the client
      // For example, you can send a message back to the client like this:
      // ws.send(JSON.stringify({ type: 'response', data: 'Hello from server!' }));

    } catch (err: any) {
      console.error('Error parsing message:', err);
      ws.send(JSON.stringify({ error: 'Invalid message format', message: err.message }));
    }
  })
});



app.setNotFoundHandler((request, reply) => {
  log("setNotFoundHandler", request.params)
  reply.send({
    success: false,
    message: `Route ${request.method}:${request.url} not found`
  });
});


app.setErrorHandler((error, request, reply) => {
  reply.send({
    success: false,
    message: error.message
  });
});

connect(configs.mongo.mongoUri, {
  autoIndex: true,
  appName: configs.mongo.mongoName,
  dbName: configs.mongo.mongoName
}).then(async () => {
  app.listen({
    port: parseInt(process.env.PORT || "5000"),
    host: process.env.HOST || "localhost"
  }, async (err, address) => {
    if (err) {
      app.logger.error(err);
      process.exit(1);
    }
    app.logger.info(`Server listening on ${address}`);
  });
}).catch((err) => {
  log(err)
  app.logger.error(err);
  process.exit(1);
});

log(process.env.MONGO_URI);

