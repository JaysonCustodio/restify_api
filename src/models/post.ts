import IUser from "../schemas/user";
import dotenv from "dotenv";
import rethinkdbdash from "rethinkdbdash";
import IPost from "../schemas/post";
dotenv.config();
const { RETHINKDB_DB, RETHINKDB_HOST }: any = process.env;
const r = rethinkdbdash({ db: RETHINKDB_DB, servers: RETHINKDB_HOST });

export default class PostModel {
  static getPost(post_id: string) {
    return r.table("posts").get(post_id).run();
  }
  static createPost(user_id: string, post: IPost) {
    return r
      .table("posts")
      .insert({
        ...post,
        user_id,
        created_date: new Date().toISOString(),
        updated_date: new Date().toISOString(),
      })
      .run();
  }

  static getAllPosts() {
    return r.table("posts").run();
  }

  static getAllUserPosts(user_id: string) {
    return r.table("posts").getAll(user_id, { index: "user_id" }).run();
  }

  static getUserPost(user_id: string, post_id: string) {
    return r
      .table("posts")
      .getAll(user_id, { index: "user_id" })
      .filter({ id: post_id })
      .run();
  }

  static updateUserPost(user_id: string, post_id: string, post: IPost) {
    return r
      .table("posts")
      .getAll(user_id, { index: "user_id" })
      .filter({ id: post_id })
      .update({
        ...post,
        updated_date: new Date().toISOString(),
      })
      .run();
  }

  static deleteUserPost(user_id: string, post_id: string) {
    return r
      .table("posts")
      .getAll(user_id, { index: "user_id" })
      .filter({ id: post_id })
      .delete()
      .run();
  }
}
