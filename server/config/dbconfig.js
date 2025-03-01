//connecting express to mongodb database

const mongoose=require('mongoose')

//connection logic
mongoose.connect(process.env.CONNECTION_STRING)

//connection state
const db=mongoose.connection

//if connect event occured
db.on('connected',()=>{
    console.log(`db connection successfully`);
})

//if error event occured
db.on('err',()=>{
    console.log(`db connection failed`)
});

module.exports=db