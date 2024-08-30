const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();

const passport = require('./auth');
const bodyParser = require('body-parser'); 
const Person = require('./models/Person');
const personRoutes = require('./routes/person.Routes');
const menuItemRoutes = require('./routes/menuItem.Routes');

// Middleware Function
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request Made To: ${req.originalUrl}`);
    next();
};

// Passport Local Strategy


// Middleware Setup
app.use(bodyParser.json());
app.use(logRequest);
app.use(passport.initialize());

localAuthMiddleware = passport.authenticate('local', { session: false })

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to our hotels');
});

app.use('/person', personRoutes);
app.use('/menu', menuItemRoutes);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App is running on PORT ${PORT}`);
});
