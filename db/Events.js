const sqlite3 = require('sqlite3');

const events = new sqlite3.Database('events.db');

events.run(`CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY,
    name TEXT UNIQUE,
    email TEXT UNIQUE,
    person TEXT,
    phone_number TEXT,
    date DATE,
    time TIME,
    location TEXT,
    FOREIGN KEY (person) REFERENCES users(name)
)`);

module.exports = events;