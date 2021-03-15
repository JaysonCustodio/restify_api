import { Response, Request } from "restify";
import http from "http";
import PostModel from "../models/post";
import UserModel from "../models/user";

const PostController = {
  getPost: async ({ params: { id } }: Request, res: Response) => {
    try {
      const result = await PostModel.getPost(id);
      res.send(result! ? result : { message: http.STATUS_CODES["404"] });
    } catch (error) {
      res.status(500);
      res.send({
        message: http.STATUS_CODES["500"],
      });
      throw error;
    }
  },
  createPost: async (req: Request, res: Response): Promise<any> => {
    try {
      const { errors } = await PostModel.createPost(
        req.params.user_id,
        req.body
      );
      res.send({
        message: errors ? http.STATUS_CODES["500"] : http.STATUS_CODES["200"],
      });
    } catch (error) {
      console.log(error);
      res.status(500);
      res.send({
        message: http.STATUS_CODES["500"],
      });
    }
  },

  getAllPosts: async (req: Request, res: Response): Promise<any> => {
    try {
      const result = await PostModel.getAllPosts();
      res.send(result ? result : { message: http.STATUS_CODES["404"] });
    } catch (error) {
      res.status(500);
      res.send({
        message: http.STATUS_CODES["500"],
      });
      throw error;
    }
  },

  getAllUserPosts: async (req: Request, res: Response): Promise<any> => {
    try {
      const user_result = await UserModel.getUser(req.params.user_id);
      if (!user_result) return res.send({ message: http.STATUS_CODES["404"] });
      const result = await PostModel.getAllUserPosts(req.params.user_id);
      res.send(result ? result : { message: http.STATUS_CODES["404"] });
    } catch (error) {
      res.status(500);
      res.send({
        message: http.STATUS_CODES["500"],
      });
    }
  },

  getUserPost: async (req: Request, res: Response): Promise<any> => {
    try {
      const user_result = await UserModel.getUser(req.params.user_id);
      if (!user_result) return res.send({ message: http.STATUS_CODES["404"] });
      const result: any = await PostModel.getUserPost(
        req.params.user_id,
        req.params.id
      );
      if (result.length === 0)
        return res.send({ message: http.STATUS_CODES["404"] });
      res.send(result);
    } catch (error) {
      console.log(error);
      res.status(500);
      res.send({
        message: http.STATUS_CODES["500"],
      });
    }
  },

  updateUserPost: async (req: Request, res: Response): Promise<any> => {
    try {
      const { replaced } = await PostModel.updateUserPost(
        req.params.user_id,
        req.params.id,
        req.body
      );
      res.send({
        message: replaced ? http.STATUS_CODES["200"] : http.STATUS_CODES["404"],
      });
    } catch (error) {
      res.status(500);
      res.send({
        message: http.STATUS_CODES["500"],
      });
      throw error;
    }
  },

  deleteUserPost: async (req: Request, res: Response): Promise<any> => {
    try {
      const { deleted } = await PostModel.deleteUserPost(
        req.params.user_id,
        req.params.id
      );
      res.send({
        message: deleted ? "Data deleted in the db" : http.STATUS_CODES["404"],
      });
    } catch (error) {
      console.log(error);
      res.status(500);
      res.send({
        message: http.STATUS_CODES["500"],
      });
    }
  },
};

export default PostController;
