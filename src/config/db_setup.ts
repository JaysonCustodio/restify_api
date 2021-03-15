"use-strict";
import dotenv from "dotenv";
import rethinkdbdash from "rethinkdbdash";

dotenv.config();
const { RETHINKDB_HOST, RETHINKDB_DB }: any = process.env;

const initializer = async () => {
  const r = rethinkdbdash({ db: RETHINKDB_DB, servers: RETHINKDB_HOST });
  //get all existing db
  const dblist = await r.dbList().run();

  //create jaydb if not exist
  if (!dblist.includes(RETHINKDB_DB)) await r.dbCreate(RETHINKDB_DB).run();

  //get all existing tables
  const tablelist = await r.tableList().run();

  //create users table if not exist
  if (!tablelist.includes("users")) await r.tableCreate("users").run();

  //create posts table if not exist
  if (!tablelist.includes("posts")) await r.tableCreate("posts").run();

  //get all index of posts
  const post_indexes = await r.table("posts").indexList().run();

  //create index user_id if not exist
  if (!post_indexes.includes("user_id"))
    await r.table("posts").indexCreate("user_id").run();
  
};
export default initializer;
