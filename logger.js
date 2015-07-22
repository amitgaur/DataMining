const winston = require('winston');
var logger = new (winston.Logger)({ transports: [
    new (winston.transports.File)({ 
        filename: 'app.log', 
        colorize: true 
    }),
    new (winston.transports.Console)({ colorize: true })
] });
module.exports = logger;