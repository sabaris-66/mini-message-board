#! /usr/bin/env node

require("dotenv").config();
const { Client } = require("pg");
console.log(
  process.env.PORT,
  process.env.HOST,
  process.env.PASSWORD,
  process.env.DATABASE,
  process.env.USER
);

const SQL = `
create table if not exists messages(
    id integer primary key generated always as identity,
    username varchar(255),
    text varchar(255),
    added varchar(255)
);

insert into messages (username, text, added) values
    ('unknown', 'blah blah blah', '2008-12-12'),
    ('unknown2', 'blah blah blah2', '2008-11-11'),
    ('unknown3', 'blah blah blah3', '2008-10-10');
`;

async function main() {
  console.log("seeding...");
  const blDate = new Date();
  console.log(blDate);
  const client = new Client({
    connectionString: `postgresql://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.PORT}/${process.env.DATABASE}`,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
