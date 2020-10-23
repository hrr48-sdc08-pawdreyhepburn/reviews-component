const { Client } = require('pg');
const { user, password, database } = require('../data/dbCred.js');

const client = new Client({
  user: user,
  password: password,
  host: "localhost",
  database: database,
  port: 5432
});

client.connect()
  .then(() => {
    console.log('Connected to pgDatabase');
  })
  .catch(err => {
     console.error(err);
  });

module.exports =  client;