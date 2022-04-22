const mysql = require('mysql');
require('dotenv').config();
// criação de conexao com o banco de dados

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT
});

connection.connect(function(err) {
  if (err) {
    throw(err);
  }
  console.log('Connected!');
});


module.exports = { connection } 