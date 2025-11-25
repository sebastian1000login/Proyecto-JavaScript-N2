import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
const express = require("express");
const app = express();
const mysql = required("mysql");
const cors = require("cors");
app.use(cors());
app.use(express.body());
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "dbalmacen"
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
app.post("/update", (req, res)=>{
    const id = req.body.id;
    const nombre = req.body.nombre;
    const precio = req.body.precio;
    const stock = req.body.stock;
    db.query('update producto set despro = ?, precio = ?, stock = ? where producto = ?', [nombre, precio, stock, id],
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
app.post("/productos", (req, res)=>{
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
app.post("/delete/id", (req, res)=>{
    const id = req.body.id;
    db.query('delete from productos where codpro = ?', [id],
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
app.listen(3001, ()=>{
    console.log("puerto 3001 escucha");
});
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
