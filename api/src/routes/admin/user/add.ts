import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import { hashPassword } from "../../ajax/register";

export const UserSchema = Type.Object({
  username: Type.String(),
  password: Type.String()
});

export type UserType = Static<typeof UserSchema>;

const BodySchema = Type.Object({
  username: Type.String(),
  password: Type.String(),
  role: Type.String(),
});

export default async (fastify: FastifyInstance) => {
  fastify.route<{
    Body: Static<typeof BodySchema>
  }>({
    method: "POST",
    url: "/add",
    schema: {
      body: BodySchema
    },
    handler: async (request, reply) => {
      try {
        const { username, password, role } = request.body;

        const hash = await hashPassword(password);
        const user = await fastify.mongoose.User.findOne({
          username
        });
        if (user) throw new Error("User already exists");
        const response = await fastify.mongoose.User.create({
          username,
          password: hash,
          role
        });
        reply.send({
          success: true,
          data: response
        });
      } catch (ex) {
        throw new Error(ex);
      }
    }
  });
}