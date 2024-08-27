const express = require('express')
const app = express()
const db = require('./db')




const bodyParser = require('body-parser'); 
app.use(bodyParser.json());





const personRoutes =require('./routes/person.Routes')

app.use('/person' , personRoutes)


const menuItemRoutes = require('./routes/menuItem.Routes')

app.use('/menu' , menuItemRoutes)

app.listen(3000 )