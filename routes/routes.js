const express = require("express")
const  events  = express.Router(); 
const db = require('../db/User')
const bcrypt = require('bcrypt');
const  jwt = require('jsonwebtoken');
const SECRET_KEY = "visahlvinayram";


events.get('/hello',(req,res)=>
{ try{
  db.all('SELECT * FROM users', [], function(err, rows) {
    if (err) {
      console.error(err.message);
    } else {
      rows.forEach(row => {
        console.log(`ID: ${row.id}, Name: ${row.name}, Email: ${row.email}`);
      });
    }
    res.send("sucess");
  });
}catch(e)
{
  console.log("eroor");
  res.send("failure");
}
})

events.post('/register',async(req, res)=> { 
  try{
    const {name,email,password} = req.body;
    console.log(name,password,email);
db.run(`INSERT INTO users (name, email,password) VALUES (?, ?,?)`, [name, email,password], function(err) {
  if (err) {
    console.error(err.message);
  } else {
    console.log(`A row has been inserted with id ${this.lastID}`);
  }
  res.send("post");
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

events.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.get('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, row) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (row) {
      res.json({ message: 'Login successful' });
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  });
});

 module.exports = events;