const express = require('express');
const router = require('./routes/routes');
const app = express()
const events = require('./routes/events');
const mails = require('./utls/mail_service');
const port = 3001

app.use(express.json());

app.use('/event',events);
app.use('/',router);
app.use('/mails',mails)


app.listen(port, () => console.log(`Example app listening on port ${port}!`));