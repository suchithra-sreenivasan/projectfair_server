//import expresss
const express = require('express');

//import dotenv
require('dotenv').config()

//import cors
//bind cheyun 1
const cors = require('cors')

//import router
const router = require('./router')

//import connect
require('./connection')

// server
const pfServer = express()

//server using cors
pfServer.use(cors())

//parse the data -middleware - parse the data
//2nd application/json
pfServer.use(express.json())

//use router
//3nd
pfServer.use(router)

//exportiing uplaoded folder
pfServer.use('/upload', express.static('./uploads'))

//port
const PORT = 4000|| process.env.PORT

// listen
pfServer.listen(PORT,()=>{
    console.log(`Server is successfully running at port number ${PORT}`);
    
})

//get request
// pfServer.get('/',(req,res)=>{
//     res.send('get request recieved')
// })

//post request
// pfServer.post('/',(req,res)=>{
//     res.send('post request recieved')
// })

//put request
// pfServer.put('/',(req,res)=>{
//     res.send('put request recieved')
// })

//delete 
// pfServer.delete('/',(req,res)=>{
//    res.send('delete request recieved');
    
// })