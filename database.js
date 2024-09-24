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

// delete person with name from the database
function deletePerson(name) {
  db.run('DELETE FROM people WHERE name = ?', name, function(err) {
    if (err) {
      console.error(err.message);
    } else {
      console.log(`Person deleted with ID: ${this.lastID}`);
    }
  });
}
function editPerson(name, age, email) {
  db.run('UPDATE people SET age = ?, email = ? WHERE name = ?', [age, email, name], function(err) {
    if (err) {
      console.error(err.message);
    } else {
      console.log(`Person updated with ID: ${this.lastID}`);
    }
  });
}
// get single person with name from the database
function getPerson(name, callback) {
  db.all('SELECT * FROM people WHERE name = ?', name, (err, rows) => {
    if (err) {
      throw err;
    }
    callback(rows);
  });
}

module.exports = {
  initDatabase,
  addPerson,
  getPeople,
  deletePerson,
  editPerson,
  getPerson
};
