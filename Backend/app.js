const express = require('express');
const app = new express();
const bodyParser = require('body-parser');
const log4js = require('log4js');
const logger = log4js.getLogger('app');

// parse URL
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// set CORS headers
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3006');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use('/api', require('./server/routes'));

app.listen(8000,'localhost',function(){
    logger.info('listening @ http://localhost:8000')
});
