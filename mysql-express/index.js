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
    password:process.env.DBPASS,
    

})

db.connect((err)=>{
    if(err){
        console.log(err)
    }
    console.log('Mysql initialized')
})

app.post("/db/:id",(req, res)=>{
    console.log("Post came in")
    let x ={
       a: db.escape(req.params.id).replace(/'/g, "")
    }
    let sql = "CREATE TABLE `nodetest`.`"+x.a+"` ( `id` INT NOT NULL AUTO_INCREMENT , PRIMARY KEY (`id`))"
    console.log(sql)
   
    db.query(sql,(err, result)=>{
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