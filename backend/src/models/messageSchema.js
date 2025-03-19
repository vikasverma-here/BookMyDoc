const mongoose = require("mongoose")
const validator =require("validator")

const messageSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:[3,"first name must contain atleast three characters!"]
    },
    lastName:{
        type:String,
        required:true,
        minLength:[3,"first name must contain atleast three characters!"]
    },
    email:{
        type:String,
        required:true,
       validate:[validator.isEmail,"please provide a valid email"]
    },
    phone:{
        type:String,
        required:true,
        minLength:[11,"phone number must contain exact 11 digit!"],
        maxLength:[11,"phone number must contain exact 11 digit!"]
    },
    message:{
        type:String,
        required:true,
        minLength:[10,"message contain atleast 10 character!"]
    },
})

const Message = mongoose.model("Message",messageSchema)
module.exports= Message;