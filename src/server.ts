import restify from "restify";
import dotenv from "dotenv";
import initializer from "./config/db_setup";
import user from "./routes/user";
import post from "./routes/post";
const restifyPlugins = require("restify-plugins");

dotenv.config();
const { TESTIYFY_PORT }: any = process.env;
const server = restify.createServer();
server.use(restifyPlugins.jsonBodyParser({ mapParams: true }));

user(server);
post(server);
server.listen(TESTIYFY_PORT, async () => {
  try {
    await initializer();
    console.log("%s listening at %s", server.name, server.url);
  } catch (error) {
    throw error;
  }
});
