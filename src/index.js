require('./config/db');
const seed = require('./database/seed');
const { setUpDatabase } = require('./database/setupDatabase');
const menu = require('./interface/menu');

(async function()  
 {  
  await setUpDatabase()
  await seed()
  await menu()
})();  