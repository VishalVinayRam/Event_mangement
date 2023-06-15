const express = require("express")
const  router  = express.Router(); 
const db = require('../db/User')

router.get('/hello',(req,res)=>
{ try{
  db.all('SELECT * FROM users', [], function(err, rows) {
    if (err) {
      console.error(err.message);
    } else {
      rows.forEach(row => {
        console.log(`ID: ${row.id}, Name: ${row.name}, Email: ${row.email}`);
      });
    }
  });
}catch(e)
{
  console.log("eroor");
}
})

router.post('/', (req, res)=> { 
  try{
    const {data} = req;
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT
    )`);
    console.log("creation succesfull");
    const name = 'John Doe';
const email = 'johndoe@example.com';
db.run(`INSERT INTO users (name, email) VALUES (?, ?)`, [name, email], function(err) {
  if (err) {
    console.error(err.message);
  } else {
    console.log(`A row has been inserted with id ${this.lastID}`);
  }
});
db.close();
res.send("success")
  }
  catch(e)
  {
    console.log("it is a error");
    res.send("failed");
  }
})



 module.exports = router;