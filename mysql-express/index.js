require('dotenv').config()
const express = require('express');
const mysql = require('mysql')
const app = express();

app.get('')

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

app.get("/mail/",(req, res)=>{
    let sql = "CREATE DATABASE ?"
    db.query(sql, req.params.db,(err, result)=>{
            if(err){
                throw err
            }
            console.log(result);
    })
})



app.listen({port: process.env.port},()=>{
    console.log("dev server up")
})