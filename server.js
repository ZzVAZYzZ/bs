const express = require("express");
require('dotenv').config()
var bodyParser = require("body-parser");
var cors = require('cors');
var mysql = require('mysql2'); //npm install mysql
const app = express();

app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT;

app.use(express.json());

//MYSQL
var con = mysql.createConnection({
  host: process.env.HOST,
  port: process.env.DATABASE_PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  insecureAuth: process.env.INSECUREAUTH,
  database: process.env.DATABASE
});

// in workbench
//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY
'your_password';
con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!!!")
  var sql = "SELECT * FROM store";
  con.query(sql, function (err, results) {
    if (err) throw err;
    console.log(results);
  })
});
app.get('/store', function (req, res) {
  var sql = "SELECT * FROM store";
  con.query(sql, function (err, results) {
    if (err) throw err;
    res.send(results);
  });
})
app.get('/store/:id', function (req, res) {
  const { id } = req.params
  var sql = "SELECT * FROM store where id=" + id + ""
  con.query(sql, function (err, results) {
    if (err) throw err;
    res.send(results);
  });
})
app.post('/store', function (req, res) {
  const { id, book, author } = req.body
  //sample { id: 4, deviceName: 'DHT22' }
  console.log( req.body );
  var sql = `INSERT INTO store (id, book, author) VALUES (1, 'Book Title', 'Author Name')`;
  con.query(sql, function (err, results) {
    if (err) throw err;
    console.log("sai");
  });
  res.send(`123`);
})


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
