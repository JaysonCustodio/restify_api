import IUser from "../schemas/user";
import dotenv from "dotenv";
import rethinkdbdash from "rethinkdbdash";
dotenv.config();
const { RETHINKDB_DB, RETHINKDB_HOST }: any = process.env;
const r = rethinkdbdash({ db: RETHINKDB_DB, servers: RETHINKDB_HOST });

export default class UserModel {
  static createUser(user: IUser) {
    return r
      .table("users")
      .insert({
        ...user,
        created_date: new Date().toISOString(),
        updated_date: new Date().toISOString(),
      })
      .run();
  }

  static getUser(id: string) {
    return r.table("users").get(id).run();
  }

  static getAllUsers() {
    return r.db(RETHINKDB_DB).table("users").run();
  }

  static updateUser(id: string, new_user: IUser) {
    return r
      .table("users")
      .get(id)
      .update({
        ...new_user,
        updated_date: new Date().toISOString(),
      })
      .run();
  }
  static deleteUser(id: string) {
    return r.table("users").get(id).delete().run();
  }
}
