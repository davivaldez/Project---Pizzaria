import * as mysql from "mysql2/promise";

export async function createConnection() {
  return await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "pizzaria"
  });
}

export function closeConn(conn) {
  conn.end(err => {
    if (err)
      throw err;
  });
}