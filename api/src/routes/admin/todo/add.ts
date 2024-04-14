import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import { hashPassword } from "../../ajax/register";

const BodySchema = Type.Object({
    content: Type.String(),
    state: Type.Optional(Type.String()),
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
                const { content, state } = request.body;

                const r = await fastify.mongoose.User.findOne({
                    content
                });
                if (r) throw new Error("Todo already exists");
                const response = await fastify.mongoose.User.create({
                    content, state
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