const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const Port = 9500;
const App = express();
App.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bmwmall'
})


db.connect((err) => {
    if (err) {
        console.log('error whiles connecting db');

    }
    else {
        console.log(`db connected successful ${db.database}`)
    }
})

// routes
App.get('/', (req, res) => {
    res.send('we are in backend')
})
App.get('/users', (req, res) => {
    const sql = "SELECT * FROM users";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})
// server starting
App.listen(Port, () => {
    console.log(`server started on port ${Port}`)
})