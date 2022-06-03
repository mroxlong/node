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

/**
 * Cleans string and formats user input for sql injections
 * @param {string} value 
 * @returns {string}
 */
const sqlSanitize = (value)=>{
   const val =  db.escape(value).replace(/'/g, "")
   return val
}

db.connect((err)=>{
    if(err){
        console.log(err)
    }
    console.log('Mysql initialized')
})

app.post("/room/:id",(req, res)=>{
    console.log("Post came in")
    let params ={
       id: db.escape(req.params.id).replace(/'/g, "")
    }
    let sql = "CREATE TABLE `nodetest`.`"+params.id+"` ( `id` INT NOT NULL AUTO_INCREMENT , `uid` INT(10) NOT NULL , `value` VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_nopad_ci NOT NULL , PRIMARY KEY (`id`))"
    console.log(sql)
   
    db.query(sql,(err, result)=>{
            if(err){
                throw err
            }
            console.log(result);
            res.sendStatus(200)
    })
})



app.post("/message/:room",(req, res)=>{
    console.log("User creation init")
    let msg = req.body.message
    let params ={
      
       room: sqlSanitize(req.params.room),
       message: sqlSanitize(req.body.message)
    }
    let sql = "INSERT INTO `"+params.room+"` (`id`, `uid`, `value`) VALUES (NULL, '2', '"+params.message+"')"
    console.log(sql)
   
    db.query(sql,(err, result)=>{
            if(err){
                throw err
            }
            console.log(result);
            res.sendStatus(200)
    })
})

app.post("/anon/:username",(req, res)=>{
    console.log("User creation init")
    let params ={
       username: db.escape(req.params.username).replace(/'/g, "")
    }
    let sql = "INSERT INTO `anons` (`id`, `username`) VALUES (NULL, '"+params.username+"')"
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