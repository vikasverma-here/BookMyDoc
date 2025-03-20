const mongoose = require("mongoose");
const validator = require("validator");


const appointmentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: [3, "First name must contain at least three characters!"]
    },
    lastName: {
        type: String,
        required: true,
        minLength: [3, "Last name must contain at least three characters!"]
    },
    email: {
        type: String,
        required: true,
        unique: true, 
        validate: [validator.isEmail, "Please provide a valid email"]
    },
    phone: {
        type: String,
        required: true,
        minLength: [10, "Phone number must contain exactly 10 digits!"],
        maxLength: [10, "Phone number must contain exactly 10 digits!"]
    },
    nic: {
        type: String,
        required: true,
        minLength: [12, "NIC must contain exactly 12 digits!"],
        maxLength: [12, "NIC must contain exactly 12 digits!"]
    },
    dob: {
        type: Date,
        required: [true, "DOB is required!"]
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female"]
    },
    appointment_date:{
        type:String,
        require:true,

    },
    doctor:{
        firstName:{
            type:String,
            require:true,
        },
        lastName:{
            type:String,
            require:true,
        }
    },
    hasVisited:{
        type:Boolean,
        default:false
    },
    doctorId:{
        type:mongoose.Schema.ObjectId,
        require:true,
    },
    patientId:{
        type:mongoose.Schema.ObjectId,
        require:true,
    },
    address:{
        type:String,
            require:true,
    },
    status:{
        type:String,
        enum:["Pending","Accepted","Rejected"],
        default:"Pending"
    }
   
});


const Appointment = mongoose.model("Appointment",appointmentSchema)
module.exports=Appointment