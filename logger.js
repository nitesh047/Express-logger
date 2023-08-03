const winston = require('winston');
const expressWinston = require('express-winston');
 require('winston-mongodb')
 require('dotenv').config();

 const myFormat = winston.format.printf(({timestamp ,level, message }) => {
    return `${timestamp} ${level}: ${message}`
})
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            level:'warn',
            filename:'logsWarning.log'
        }),
        new winston.transports.File({
            level:'error',
            filename:'logsError.log'
        }),
         new winston.transports.MongoDB({
            db:process.env.dbURI,
            collection:'logs'
         })
    ],
    format: winston.format.combine(
        // winston.format.colorize(),
        winston.format.prettyPrint(),
        winston.format.json(),
        winston.format.metadata({ fillExcept: ['message', 'level', 'timestamp', 'label'] }),
        winston.format.timestamp(),
        myFormat
        ),
        meta: true,
        statusLevels:true,  // optional: control whether you want to log the meta data about the request (default to true)
        // msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
        expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
        colorize: true, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
        ignoreRoute: function (req, res) { return false; }
    })

module.exports=logger