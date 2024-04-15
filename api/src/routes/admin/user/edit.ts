import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import { ParamSchema } from "../../../utils/datatable";
import { hashPassword } from "../../ajax/register";

const BodySchema = Type.Object({
  username: Type.Optional(Type.String()),
  password: Type.Optional(Type.String())
});

export default async (fastify: FastifyInstance) => {
  fastify.route<{
    Params: Static<typeof ParamSchema>,
    Body: Static<typeof BodySchema>
  }>({
    method: "POST",
    url: "/edit/:id",
    schema: {
      params: ParamSchema,
      body: BodySchema
    },
    handler: async (request, reply) => {
      try {
        const { id } = request.params;
        const response = await fastify.mongoose.User.findById(id);
        if (!response) throw new Error("User not found");

        const { username, password } = request.body;
        if (username) response.username = username;
        if (password) {
          const hash = await hashPassword(password);
          response.password = hash;
        }
        await response.save();
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