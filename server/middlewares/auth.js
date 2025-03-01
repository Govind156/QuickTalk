const jwt=require("jsonwebtoken")

module.exports=(req,res,next)=>{
    try{
        const token=req.headers.authorization.split(' ')[1]
        const decodetoken=jwt.verify(token,process.env.SECRET_KEY)
        req.body.userId=decodetoken.userId
        next()
    }
    catch(error){
        res.send({
            message:error.message,
            success:false
        })

    }
}
