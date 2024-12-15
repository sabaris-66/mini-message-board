const pool = require("./pool");

exports.selectMessageList = async () => {
  const { rows } = await pool.query("select * from messages");
  return rows;
};

exports.insertMessages = async (username, text) => {
  const date = String(new Date());
  await pool.query(
    "insert into messages (username, text, added) values ($1, $2, $3)",
    [username, text, date]
  );
};
