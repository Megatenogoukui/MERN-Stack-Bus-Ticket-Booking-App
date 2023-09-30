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

if(process.env.NODE_ENV === "production")
{
    app.use(express.static("client/build"));
    
    app.get("*" , (req ,res) => {
        res.sendFile(path.resolve(__dirname,"client/build/index.html"))
    })
}

app.listen(port ,() => {
    console.log(`Node server listening on port :${port}`  )
} )