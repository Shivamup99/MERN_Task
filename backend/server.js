const express = require('express')
// const connection = require('./model/db')
// connection();
const path = require('path')
const cors = require('cors')
const userRoutes = require('./routes/userRoutes')
const addressRoutes = require('./routes/addressRoutes')
const blogRoutes = require('./routes/blogRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const port = process.env.PORT || 2000
const app = express()
app.use("/upload", express.static("upload"));
app.use("/profile",express.static("profile"))
// app.get("/",(req,res)=>{
//   res.sendFile(__dirname,"upload")
// })
// app.get("/",(req,res)=>{
//   res.sendFile(__dirname,"profile")
// })
app.use(express.json())
app.use(cors())
app.use("/",userRoutes)
app.use("/",addressRoutes)
app.use("/",blogRoutes)
app.use("/",categoryRoutes)
app.listen(port,()=>
    console.log(`server is running on ${port}`)
)
