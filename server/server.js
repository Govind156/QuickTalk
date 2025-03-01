//server.js is now our entry point
const express=require('express')
const app=require('./app')

const dotenv=require('dotenv')
//the environment variable of these path is save in env object which is one of an object or process object 
dotenv.config({path:'./config.env'})
const dbconnect=require('../server/config/dbconfig')
//PORT is a property of env object which is an object of process object
const port=process.env.PORT || 3000
const authrouter=require('./controllers/authcontroller')
const userrouter=require('./controllers/usercontroller')
const chatrouter=require('./controllers/chatcontroller')
const messagerouter=require('./controllers/messagecontroller')
//middleware
app.use(express.json())
app.use('/api/auth',authrouter);
app.use('/api/user',userrouter);
app.use('/api/chat',chatrouter);
app.use('/api/message',messagerouter)

//route


//listen
app.listen(port,()=>{
    console.log(`listen to request on PORT: ${port}`);
});
