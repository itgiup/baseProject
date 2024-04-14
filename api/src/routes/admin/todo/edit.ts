import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import { ParamSchema } from "../../../utils/datatable";

const BodySchema = Type.Object({
  content: Type.String(),
  state: Type.Optional(Type.String()),
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
        let { content, state } = request.body;
        await fastify.mongoose.Todo.findByIdAndUpdate(id, {
          content, state
        });
        reply.send({
          success: true
        });
      } catch (ex) {
        throw new Error(ex);
      }
    }
  });
}