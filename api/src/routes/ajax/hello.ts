import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import { hashPassword } from "./register";



const BodySchema = Type.Object({
    name: Type.String(),
    password: Type.String(),
});

const saltRounds = 1
export default async (fastify: FastifyInstance) => {
    fastify.route<{
        Body: Static<typeof BodySchema>
    }>({
        method: "POST",
        url: "/hello",
        schema: {
            body: BodySchema
        },
        handler: async (request, reply) => {
            const password = await hashPassword(request.body.password)

            try {
                reply.send({
                    message: `hello ${request.body.name}`,
                    password
                })
            } catch (ex) {
                console.error(ex);
                throw new Error(ex);
            }
        }
    });
}