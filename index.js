require('dotenv').config();
const express = require('express');
const bodyparser = require('body-parser');
const mysql = require('mysql');


const con = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASS,
    database: process.env.DATABASE
})

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("Hello World")
})

//get all user
app.get('/getuser', (req, res) => {
    con.query('select * from users', (err, rows) => {
        if (!err) res.json(rows);
    })
})

//get userid
app.get('/getuser/:id', (req, res) => {
    con.query('select * from users where userId=?', [req.params.id], (err, rows) => {
        if (!err) res.json(rows);
    })
})

//insert users
app.post('/add', (req, res) => {
    const iname = req.body.name;
    const iphone = req.body.phone;
    con.query('insert into users(Name,Phone) values(?,?)', [iname, iphone], (err, rows) => {
        if (!err) res.send("Insert 1 record success");
    })
})

//delete users
app.delete('/delete/:id', (req, res) => {
    con.query('delete from users where userId=?', [req.params.id], (err, rows) => {
        if (!err) res.send("Delete 1 record success");
    })
})

//update users
app.put('/update/:id', (req, res) => {
    const iname = req.body.name;
    const iphone = req.body.phone;
    con.query(`update users set Name=?,Phone=? where userId=?`, [iname, iphone, req.params.id], (err, rows) => {
        if (!err) res.send("update 1 record success");
    })
})


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`🚀 Server Listening at http://localhost:${PORT}`))