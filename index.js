const express = require('express');
// to parse the cookie when browser sends request to server
const cookieParser = require('cookie-parser');
const port = 8000;
const app = express();
const path = require('path');
const db = require('./config/mongoose');

// for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
// using mongo store to persist user session even after server restart and store session cookie in db
const MongoStore = require('connect-mongo');

app.use(express.urlencoded());

app.use(cookieParser());

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));

app.use(session({
    name: 'passport-local-auth',
    secret: 'avin',
    saveUninitialized: false, // helps avoid storing uninitialized sessions. Uninitialized sessions refer to sessions that have been created but have not been populated with any data or modifications.
    resave: false, // the session will only be saved to the session store if it has been modified during the request. If no changes were made, the session will not be saved.
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore(
        {
            mongoUrl: 'mongodb://0.0.0.0/authentication',
            autoRemove: 'disabled'
        },
        function(err){
            console.log(err || 'connect-mongo setup ok');
        }
    )
}));

// tell the app to use passport
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log('Error in connecting to port: ', port);
    }
    console.log('Successfully connected to the server');
})