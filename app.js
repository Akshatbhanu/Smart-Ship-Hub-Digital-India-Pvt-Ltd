import logo from './logo.svg';
import './App.css';




const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());


const db = mysql.createConnection({
    host: 'localhost',
    user: 'TestConnection',
    password: 'root',
    database: 'root'
});


app.get('/user', (req, res) => {
    db.query('SELECT * FROM tablename', (err, rows) => {
        if (err) {
            res.status(500).json({ error: 'ERROR' });
        } else {
            res.json(rows);
        }
    });
});

app.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  db.query('SELECT * FROM your_table WHERE id = ?', [userId], (err, rows) => {
      if (err) {
          res.status(500).json({ error: 'Error' });
      } else {
          if (rows.length === 0) {
              res.status(404).json({ error: 'error' });
          } else {
              res.json(rows[0]);
          }
      }
  });
});

app.post('/user', (req, res) => {
    const { name, email } = req.body;
    db.query('INSERT INTO tablename (name, email) VALUES (?, ?)', [name, email], (err, result) => {
        if (err) {
            res.status(500).json({ error: ' Error' });
        } else {
            res.json({ message: 'User created', id: result.insertId });
        }
    });
});
app.put('/user/:id', (req, res) => {
  const userId = req.params.id;
  const { name, email } = req.body;
  db.query('UPDATE your_table SET name=?, email=? WHERE id=?', [name, email, userId], (err, result) => {
      if (err) {
          res.status(500).json({ error: 'Error' });
      } else {
          if (result.affectedRows === 0) {
              res.status(404).json({ error: 'error' });
          } else {
              res.json({ message: 'User updated' });
          }
      }
  });
});

app.delete('/user/:id', (req, res) => 
{
    const userId = req.params.id;
    db.query('DELETE FROM tablename WHERE id = ?', [userId], (err, result) => { 
      if (err) {
      res.status(500).json({ error: ' Error' });
  } else {
      res.json({ message: 'User deleated'});
  }})
}


function App() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
  
,
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}));

    
export default App;



