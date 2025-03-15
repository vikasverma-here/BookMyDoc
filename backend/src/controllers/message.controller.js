const Message = require("../models/messageSchema")

module.exports.sendMessage=async(req,res,next)=>{
    const {firstName,lastName,phone,email,message}=req.body
    console.log(req.body)
    if(!firstName  || !lastName || !phone ||!email ||!message){
        return  res.status(400).json({
            success:false,
            message:"please fill full  form ",
        })
    }

    const userMessage = await Message.create({
        firstName,lastName,phone,email,message
    })
    res.status(200).json({
        success:true,
        message:"message send successfully!",
    })
}