import { FastifyInstance } from "fastify";
import bcrypt from "bcrypt";
import { UserSchema, UserType } from "../admin/user/add";

const { log } = console;

export default async (fastify: FastifyInstance) => {
  fastify.route<{
    Body: UserType
  }>({
    method: "POST",
    url: "/login",
    schema: {
      body: UserSchema
    },
    handler: async (request, reply) => {
      log(request.url, request.params)

      try {
        // if (!request?.recaptcha?.success) {
        const { username, password } = request.body;
        const user = await fastify.mongoose.User.findOne({
          username: username
        });

        if (!user) return reply.send({ success: false, message: 'Incorrect username and password' });
        const verify = await bcrypt.compare(password, user.password);

        if (!verify) return reply.send({ success: false, message: 'Incorrect username and password' });
        const token = fastify.jwt.sign({ id: user.id, username: user.username });

        reply.send({
          success: true,
          token,
          user: {
            username: user.username
          }
        });

        // } else {
        //   reply.send({
        //     success: false,
        //     message: "Recaptcha is not valid"
        //   });
        // }
      } catch (ex) {
        throw new Error(ex);
      }
    }
  });
}