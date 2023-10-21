const express = require('express')
const app = express();
require('dotenv').config()
const dbConfig = require('./config/dbConfig')
const userRoutes = require('./routes/usersRoute')
const busRoutes = require('./routes/busRoute')
const bookingsRoute = require('./routes/bookingsRoute')
const path = require('path');

app.use(express.json())
app.use('/api/users',userRoutes)
app.use('/api/buses',busRoutes)
app.use('/api/bookings' ,bookingsRoute)
const port = process.env.PORT || 5000;

if(process.env.NODE_ENV === 'production'){
    //Set a static folder
    app.use(express.static(path.join(__dirname , '/Frontend/build')))
  
    //Any route which is not api will be router to index.html
    app.get('*' ,(req,res) => {
      res.sendFile(path.resolve(__dirname , 'Frontend' , 'build' , 'index.html'))
    } )
  } else{
    app.get("/" , (req,res) => {
      res.send("Api is running")
  })
  }

app.listen(port ,() => {
    console.log(`Node server listening on port :${port}`  )
} )