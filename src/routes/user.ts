import { Server } from "restify";
import UserController from "../controllers/user";

const user = (server: Server) => {
  server.post("/user", UserController.createUser),
    server.get("/user/:id", UserController.getUser),
    server.get("/users", UserController.getAllUser);
  server.put("/user/:id", UserController.updateUser);
  server.del("/user/:id", UserController.deleteUser);
};
export default user;
