const express = require('express');
const port = 8000;
const app = express();
const path = require('path');

app.set('view engine', 'ejs');
app.use('/', require('./routes'));
app.set('views', path.join(__dirname, 'views'));

app.listen(port, function(err){
    if(err){
        console.log('Error in connecting to port: ', port);
    }
    console.log('Successfully connected to the server');
})