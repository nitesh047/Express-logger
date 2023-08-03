const express = require('express');
const winston = require('winston');
const expressWinston = require('express-winston');
 require('winston-mongodb')
 require('dotenv').config();
const logger  = require('./logger.js');
 
const app = express();

app.use(expressWinston.logger({
    winstonInstance:logger,
    statusLevels:true
}))
 
    app.get('/',(req,res)=>{
        logger.info("this is a log info")
        res.send("hey! I am listening").status(200)
        // res.sendStatus(200)
    })
    app.get('/400',(req,res)=>{
        res.sendStatus(400)
        // res.sendStatus(200)
    })
    app.get('/500',(req,res)=>{
        res.sendStatus(500)
        // res.sendStatus(200)
    })

app.listen(4000)