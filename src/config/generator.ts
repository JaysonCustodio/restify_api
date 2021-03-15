//for testing only
import Bluebird from "bluebird";
import dotenv from "dotenv";
import rethinkdbdash from "rethinkdbdash";
import IUser from "../schemas/user";
import http from "http";

const random = require("random-name");
const password = require("secure-random-password");
const randomTitle = require("random-title");

dotenv.config();
const { RETHINKDB_DB, RETHINKDB_HOST }: any = process.env;
const r = rethinkdbdash({ servers: RETHINKDB_HOST });
const generateUser = async (num: number) => {
  while (num != 0) {
    let fname = random.first();
    let lname = random.last();
    let uname = fname.charAt(0) + lname;
    await r
      .db(RETHINKDB_DB)
      .table("users")
      .insert({
        id: r.uuid(),
        first_name: fname,
        last_name: lname,
        username: uname,
        password: password.randomPassword(),
        created_at: new Date(),
        updated_at: new Date(),
      })
      .run();
    num -= 1;
  }
};
const generatePost = async () => {
  const users: IUser[] = (await r.db(RETHINKDB_DB).table("users").run()) as any;
  users.map(async (data: IUser) => {});
  Bluebird.mapSeries(users, async (user) => {
    for (let i = 0; i < 3; i++) {
      await r
        .db(RETHINKDB_DB)
        .table("posts")
        .insert({
          id: r.uuid(),
          user_id: user.id,
          title: randomTitle({ words: 3 }),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
    }
  });
};
const httpLogs = (status: any) => {
  console.log(http.STATUS_CODES[`${status}`]);
};
//generateUser(5);
generatePost();
console.log("done");
// httpLogs(500);
// httpLogs(200);
// httpLogs(404);
