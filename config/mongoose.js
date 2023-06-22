const mongoose = require('mongoose');

mongoose.connect('mongodb://0.0.0.0/authentication');

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error in connecting to Database"));

db.once('open', function(){
    console.log('Successfully connected to Database :: MongoDB');
});

module.exports = db;