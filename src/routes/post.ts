import { Server } from "restify";
import PostController from "../controllers/post";

const post = (server: Server) => {
  server.get("/post/:id", PostController.getPost),
    server.get("/posts", PostController.getAllPosts),
    server.get("/user/:user_id/posts", PostController.getAllUserPosts),
    server.get("/user/:user_id/post/:id", PostController.getUserPost),
    server.put("/user/:user_id/post/:id", PostController.updateUserPost),
    server.del("/user/:user_id/post/:id", PostController.deleteUserPost),
    server.post("/user/:user_id/post", PostController.createPost);
};
export default post;
