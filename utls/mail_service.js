const express = require('express');
const nodemailer = require('nodemailer');
const sqlite3 = require('sqlite3').verbose();

const mails = express.Router();
const db = require('../db/Events')

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail', // e.g., Gmail, Yahoo, etc.
  auth: {
    user: 'vishalvinayram811@gmail.com',
    pass: '12312123Vvr@'
  }
});

mails.get('/',(req,res)=>
{
    res.send("hello world")
})

// Define a route to insert or update events
mails.post('/events', (req, res) => {
  const { name, event_date, email } = req.body;

  db.run(
    'INSERT INTO events (name, date, email) VALUES (?, ?, ?)',
    [name, event_date, email],
    function(err) {
      if (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        console.log(`Event inserted with ID: ${this.lastID}`);
        res.json({ message: 'Event inserted successfully' });

        const today = new Date();
        const oneMonthLater = new Date();
        oneMonthLater.setMonth(today.getMonth() + 1);

        const eventDate = new Date(event_date);
        if (eventDate >= today && eventDate <= oneMonthLater) {
          const mailOptions = {
            from: 'vishalvinayram5432@gmail.com',
            to: email,
            subject: 'Upcoming Event',
            text: `Hello,\n\nThis is a reminder that the event "${name}" is coming up on ${event_date}.\n\nRegards,\nYour mails`
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log('Error sending email:', error);
            } else {
              console.log('Email sent:', info.response);
            }
          });
        }
      }
    }
  );
});
 module.exports = mails;