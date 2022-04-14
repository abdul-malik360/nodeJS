const mysql = require("mysql");
const express = require("express");
const cors = require("cors");

// create connection
const db = mysql.createConnection({
  host: "localhost",
  user: "abdulmalik",
  password: "0213748346Ll!",
  database: "sqlserver",
});

// connect to mysql
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("mysql connected");
});

const app = express();
app.use(cors());

// create db
app.get("/createddb", (req, res) => {
  let sql = "CREATE DATABASE sqlserver";
  db.query(sql, (err) => {
    if (err) {
      throw err;
    }
    res.send("db created");
  });
});

// create table
app.get("/createemployee", (req, res) => {
  let sql =
    "CREATE TABLE employee(id INT AUTO_INCREMENT, name VARCHAR(255), designation VARCHAR(255), PRIMARY KEY(id))";
  db.query(sql, (err) => {
    if (err) {
      throw err;
    }
    res.send("employee table created successfully");
  });
});

// insert into table
app.get("/employee1", (req, res) => {
  let post = {
    name: "Abdul-Malik Mohamed",
    designation: "Full Stack Angular Developer",
  };
  let sql = "INSERT INTO employee SET ?";
  let query = db.query(sql, post, (err) => {
    if (err) {
      throw err;
    }
    res.send("employee added");
  });
});
// ADD with methods
app.post("/add", (req, res) => {
  message = "";

  if (req.method == "POST") {
    let post = req.body;
    let name = req.name;
    let designation = req.designation;

    // let values = { name: name, designation: designation };

    // let sql = "INSERT INTO employee SET ?";
    var sql =
      "INSERT INTO `employee`(`name`,`designation`) VALUES ('" +
      name +
      "','" +
      designation +
      "')";

    let query = db.query(sql, (err) => {
      if (err) {
        throw err;
      }
      message = "Success, Added";
      res.render({ message: message });
    });
  }
});
// select from table
app.get("/getemployee", (req, res) => {
  let sql = "SELECT * FROM employee";
  let query = db.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    console.log(results);
    res.send("employee details fetched");
  });
});

// update table
app.get("/updateemployee/:id", (req, res) => {
  let newName = "Abdul-Malik";
  let sql = `UPDATE employee SET name = '${newName}' WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err) => {
    if (err) {
      throw err;
    }
    res.send("Employee Updated");
  });
});

// delete from table
// app.get("/deleteemployee/:id", (req, res) => {
//   let sql = `DELETE FROM employee WHERE id = ${req.params.id}`;
//   let query = db.query(sql, (err) => {
//     if (err) {
//       throw err;
//     }
//     res.send("Employee Deleted");
//   });
// });

app.listen("3000", () => {
  console.log("server started on port 3000");
});
