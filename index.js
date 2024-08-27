const express = require('express')
const app = express()
const db = require('./db')
require('dotenv').config();




const bodyParser = require('body-parser'); 
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000






const personRoutes =require('./routes/person.Routes')

app.use('/person' , personRoutes)


const menuItemRoutes = require('./routes/menuItem.Routes')

app.use('/menu' , menuItemRoutes)


app.listen(PORT , () =>{
    console.log(`app is running on PORT ${PORT}`);
    
} )