import { Redis } from "ioredis";
import { Logger } from "winston";
import { User } from "../models/user.model";

declare module "fastify" {
  interface FastifyInstance {
    logger: Logger,
    redis: Redis,
    mongoose: {
      Todo: typeof Todo,
      ClientAppToken: typeof ClientAppToken,
      User: typeof User
    }
  }
}