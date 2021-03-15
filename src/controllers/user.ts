import { Response, Request } from "restify";
import http from "http";
import UserModel from "../models/user";

const UserController = {
  getAllUser: async (req: Request, res: Response): Promise<any> => {
    try {
      const result = await UserModel.getAllUsers();
      res.send(result ? result : { message: http.STATUS_CODES["404"] });
    } catch (error) {
      res.status(500);
      res.send({
        message: http.STATUS_CODES["500"],
      });
    }
  },

  getUser: async (req: Request, res: Response): Promise<any> => {
    try {
      const result = await UserModel.getUser(req.params.id);
      res.send(result ? result : { message: http.STATUS_CODES["404"] });
    } catch (error) {
      res.status(500);
      res.send({
        message: http.STATUS_CODES["500"],
      });
    }
  },

  createUser: async (req: Request, res: Response): Promise<any> => {
    try {
      const { errors } = await UserModel.createUser(req.body);
      if (errors) {
        res.status(404);
      }
      res.send({
        message: errors ? http.STATUS_CODES["404"] : http.STATUS_CODES["200"],
      });
    } catch (error) {
      res.status(500);
      res.send({
        message: http.STATUS_CODES["500"],
      });
    }
  },

  updateUser: async (req: Request, res: Response): Promise<any> => {
    try {
      const { replaced } = await UserModel.updateUser(req.params.id, req.body);
      res.send({
        meesage: replaced ? http.STATUS_CODES["200"] : http.STATUS_CODES["404"],
      });
    } catch (error) {
      res.status(500);
      res.send({
        message: http.STATUS_CODES["500"],
      });
    }
  },

  deleteUser: async (req: Request, res: Response): Promise<any> => {
    try {
      const { deleted } = await UserModel.deleteUser(req.params.id);
      res.send({
        message: deleted ? http.STATUS_CODES["200"] : http.STATUS_CODES["404"],
      });
    } catch (error) {
      res.status(500);
      res.send({
        message: http.STATUS_CODES["500"],
      });
    }
  },
};
export default UserController;
