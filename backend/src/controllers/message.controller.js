const Message = require("../models/messageSchema")
const {catchAsyncErrors} = require("../middleware/catchAsyncErrors")
const {ErrorHandler} = require("../middleware/errorMiddleware")
module.exports.sendMessage=catchAsyncErrors(
    async(req,res,next)=>{
        const {firstName,lastName,phone,email,message}=req.body
    
        if(!firstName  || !lastName || !phone ||!email ||!message){
            return next(new ErrorHandler("please Fill Full Form !",400))
        }
    
        const userMessage = await Message.create({
            firstName,lastName,phone,email,message
        })
        res.status(200).json({
            success:true,
            message:"message send successfully!",
        })
    }
)