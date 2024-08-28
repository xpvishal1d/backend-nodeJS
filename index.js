const express = require('express')
const app = express()
const db = require('./db')
require('dotenv').config();

const passport= require('passport')
const LocalStrategy = require('passport-local').Strategy;
// const Person = require('./models/Person')


// Middleware Function

const logRequest = (req , res , next) => {
    console.log(`[${new Date().toLocaleString()}] Request MAde To : ${req.originalUrl} `);

    next() ;
}

passport.use(new LocalStrategy(async (username, password, done) =>{
    // authentication logic
    try {
        console.log('received credetials');
        const user =await Person.findOne({username: username})
        if (!user) {
            return done(null , false, {message: "Incorrect username"});
        }

        const isPasswordMatch = user.password=== password ? true : false;
        if (isPasswordMatch) {
            return done(null, user)
        }
        else{
          return done(null, false ,{message: " Incorrect password"})  
        }
        
    } catch (err) {
        return done(err);
    }
}))








const bodyParser = require('body-parser'); 
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000

app.use(logRequest);

app.use(passport.initialize());




app.get('/', passport.authenticate('local', {session: false}), function (req , res ) {
    res.send('welcome to our hotels')
})





const personRoutes =require('./routes/person.Routes')

app.use('/person' , personRoutes)


const menuItemRoutes = require('./routes/menuItem.Routes');
const Person = require('./models/Person');

app.use('/menu' , menuItemRoutes)


app.listen(PORT , () =>{
    console.log(`app is running on PORT ${PORT}`);
    
} )