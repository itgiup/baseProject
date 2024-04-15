import fastifyPlugin from "fastify-plugin";
import { User } from "../models/user.model";
import { ClientAppToken } from "../models/clientapptoken.model";
import { Todo } from "../models/todo.model";

export default fastifyPlugin(async (server, options) => {
  const mongoose = {
    User,
    ClientAppToken: ClientAppToken,
    Todo
  }
  server.decorate("mongoose", mongoose);
});