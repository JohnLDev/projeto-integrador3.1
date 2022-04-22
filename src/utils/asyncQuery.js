const { connection } = require('../config/db')
// Transforma a query em uma função assíncrona	
/**
* @param {string} query - query to be executed
*/
const asyncQuery = async (query) => {
  return new Promise(function(resolve, reject) {
    connection.query(query, function (err, rows) {
      if (err) {
        console.log('Error executing query: ' + query);
        return reject(err);
      }
      resolve(rows);
    });
  });
}
module.exports = {
  asyncQuery
}