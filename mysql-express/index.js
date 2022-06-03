require('dotenv').config()
const express = require('express');
const app = express();



app.listen({port: process.env.port},()=>{
    console.log("dev server up")
})