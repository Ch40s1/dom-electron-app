// database.js
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./people.db', (err) => {
  if (err) {
    console.error('Failed to open database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Initialize the people table
function initDatabase() {
  db.run(`
    CREATE TABLE IF NOT EXISTS people (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      age INTEGER,
      email TEXT
    )`, (err) => {
    if (err) {
      console.error('Error creating table:', err.message);
    } else {
      console.log('People table created or already exists.');
    }
  });
}

// Add a person to the database
function addPerson(name, age, email) {
  db.run('INSERT INTO people (name, age, email) VALUES (?, ?, ?)', [name, age, email], function(err) {
    if (err) {
      console.error(err.message);
    } else {
      console.log(`Person added with ID: ${this.lastID}`);
    }
  });
}

// Get all people from the database
function getPeople(callback) {
  db.all('SELECT * FROM people', (err, rows) => {
    if (err) {
      throw err;
    }
    callback(rows);
  });
}
// function deletePerson(id) {
//   db.run('DELETE FROM people WHERE id = ?', [id], function(err) {
//     if (err) {
//       console.error(err.message);
//     } else {
//       console.log(`Person deleted with ID: ${id}`);
//     }
//   });
// }

module.exports = {
  initDatabase,
  addPerson,
  getPeople,
};
