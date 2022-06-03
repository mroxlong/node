require('dotenv').config()
const express = require('express');
const mysql = require('mysql')
const app = express();
const bodyParser = require('body-parser');
const json = require('body-parser/lib/types/json');

app.use(bodyParser.json())

const db = mysql.createConnection({
    host:process.env.DBHOST,
    database:process.env.DB,
    user:process.env.DBUSER,
    password:process.env.DBPASS

})

db.connect((err)=>{
    if(err){
        console.log(err)
    }
    console.log('Mysql initialized')
})

app.post("/mail/",(req, res)=>{
    console.log("Post came in")
    
    let sql = "CREATE "
    db.query(sql, req.body.db,(err, result)=>{
            if(err){
                throw err
            }
            console.log(result);
            res.sendStatus(200)
    })
})



app.listen({port: process.env.port},()=>{
    console.log("dev server up")
})