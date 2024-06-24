// db.ts
import knex from 'knex';

const db = knex({
  client: 'mysql',
  connection: {
    host : 'localhost',
    user : '', 
    password : '', 
    database : 'discord' 
  }
});

export default db;