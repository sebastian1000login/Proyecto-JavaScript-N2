/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */
const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
app.use(cors());
app.use(express.json());
const db = mysql.createConnection({
    host: "localhost",
    user: "dbaccess",
    password: "password",
    database: "dbalmacen",
    port: "3306"
});

app.post("/create", (req, res)=>{
    const nombre = req.body.nombre;
    const precio = req.body.precio;
    const stock = req.body.stock;
    db.query('insert into producto (despro, precio, stock) values (?, ?, ?)', [nombre, precio, stock],
    (err, result)=>{
        if (err)
        {
            console.log(err);
        }else
        {
            res.send("grabacion ok");
        }
    });
});
app.put("/update", (req, res)=>{
    const id = req.body.id;
    const nombre = req.body.nombre;
    const precio = req.body.precio;
    const stock = req.body.stock;
    db.query('update producto set despro = ?, precio = ?, stock = ? where codpro = ?', [nombre, precio, stock, id],
    (err, result)=>{
        if (err)
        {
            console.log(err);
        }else
        {
            res.send("grabacion ok");
        }
    });
});
app.get("/list", (req, res)=>{
    db.query('select * from producto',
    (err, result)=>{
        if (err)
        {
            console.log(err);
        }else
        {
            res.send(result);
        }
    });
});
app.delete("/delete/:id", (req, res)=>{
    const id = req.params.id;
    db.query('delete from producto where codpro = ?', id,
    (err, result)=>{
        if (err)
        {
            console.log(err);
        }else
        {
            res.send(result);
        }
    });
});
db.connect(err => {
  if (err) {
    console.log("MySQL Connection Error:", err);
  } else {
    console.log("MySQL Connected!");
  }
});

// Get all users
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) return res.json({ error: err });
    res.json(result);
  });
});

// Insert user
app.post("/users", (req, res) => {
  const { name, email } = req.body;
  db.query("INSERT INTO users (name, email) VALUES (?, ?)", [name, email], (err, result) => {
    if (err) return res.json({ error: err });
    res.json({ message: "User added successfully" });
  });
});
app.listen(3001, ()=>{
    console.log("puerto 3001 escucha");
});