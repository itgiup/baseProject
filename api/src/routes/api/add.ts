import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import { decrypt } from "../../utils/crypto";
import { sendToGroup } from '../../utils/telegraf';
import { ParamSchema } from "../../utils/datatable";

const BodySchema = Type.Object({
  token: Type.String(),
  iv: Type.String(),
  encryptedPayload: Type.String()
});


export default async (fastify: FastifyInstance) => {
  fastify.route<{
    Body: Static<typeof BodySchema>
  }>({
    method: "POST",
    url: "/session",
    schema: {
      body: BodySchema
    },
    handler: async (request, reply) => {
      try {
        console.log("session", request.body);

        const { token, iv, encryptedPayload } = request.body;
        const dev = await decrypt(iv, encryptedPayload);
        const json = JSON.parse(dev);
        const ip = request.headers["x-forwarded-for"] || request.socket.remoteAddress;
        const country = request.headers["cf-ipcountry"] || request.headers["http-cf-ipcountry"] || "US";
        const userAgent = request.headers["user-agent"];
        const uid = '';
        const { } = json;

        reply.send({
          success: true,
        });
      } catch (ex) {
        console.error(ex);
        throw new Error(ex);
      }
    }
  });

}