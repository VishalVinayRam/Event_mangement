const express =  require('express');
const router = express.Router();
const checkAccess = require('../utls/middleware')
const events = require('../db/Events')

router.get('/hello',(req,res)=>
{ try{
  events.all('SELECT * FROM events', [], function(err, rows) {
    if (err) {
      console.error(err.message);
    } else {
      rows.forEach(row => {
        console.log(`ID: ${row.id}, Name: ${row.name}, Email: ${row.date}`);
      });
    }
    res.send("sucess");
  });
}catch(e)
{
  console.log("error");
  res.send("failure");
}
})

router.post('/register',async(req, res)=> { 
  try{
    const {id,name,person,phone_number,date,time,location} = req.body;
events.run(`INSERT INTO events (id,name,person,phone_number,date,time,location) VALUES (?, ?,? ,?,?,?,?)`, [id,name,person,phone_number,date,time,location], function(err) {
  if (err) {
    console.error(err.message);
  } else {
    console.log(`A row has been inserted with id ${this.lastID}`);
  }
});
res.send("success")
  }
  catch(e)
  {
    console.log(e.message);
    console.log("it is a error");
    res.send("failed");
  }
})

router.put('/update', checkAccess, (req, res) => {
  try {
    const { id, name, person, phone_number, date, time, location } = req.body;
    
    events.run(`UPDATE events SET name = ?, person = ?, phone_number = ?, date = ?, time = ?, location = ? WHERE id = ?`,
      [name, person, phone_number, date, time, location, id],
      function(err) {
        if (err) {
          console.error(err.message);
          res.status(500).json({ error: 'Internal server error' });
        } else if (this.changes === 0) {
          res.status(404).json({ error: 'Event not found' });
        } else {
          console.log(`Row updated with ID: ${id}`);
          res.json({ message: 'Event updated successfully' });
        }
      });
  } catch (e) {
    console.log("it is an error");
    res.status(500).json({ error: 'Internal server error' });
  }
});

 module.exports = router;