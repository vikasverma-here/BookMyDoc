

const { catchAsyncErrors } = require("../middleware/catchAsyncErrors");
const { ErrorHandler } = require("../middleware/errorMiddleware");
const Appointment = require("../models/appointmentSchema");
const User = require("../models/user.model");
const {generateToken} =require("../utils/jwtToken")
const cloudinary = require("cloudinary")
module.exports.patientRegister = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, phone, password, gender, dob, nic, role } = req.body;

    if (!firstName || !lastName || !email || !phone || !password || !gender || !dob || !nic || !role) {
        return next(new ErrorHandler("Please fill the full form!", 400));
    }

    let user = await User.findOne({ email });
    if (user) {
        return next(new ErrorHandler("User already registered!", 400));
    }

     user = await User.create({
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        nic,
        role
    });
     generateToken(user,"User Registered!",200,res)
    // res.status(201).json({
    //     success: true,
    //     message: "User Registered!"
    // });
});

// ✅ Fixed Login Function
module.exports.login = catchAsyncErrors(async (req, res, next) => {
    const { email, password, confirmPassword, role } = req.body;

    if (!email || !password || !confirmPassword || !role) {
        return next(new ErrorHandler("Please provide all details!", 400));
    }

    if (password !== confirmPassword) {
        return next(new ErrorHandler("Password and confirm password do not match!", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Invalid email or password!", 400));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password!", 400));
    }

    if (role !== user.role) {
        return next(new ErrorHandler(`User with role '${role}' not found!`, 400));
    }
    generateToken(user,"User login successful!",200,res)
    // res.status(200).json({
    //     success: true,
    //     message: "User login successful!"
    // });
});


// controller for add new admin the website controller 


module.exports.addNewAdmin=catchAsyncErrors(async(req,res,next)=>{
    const { firstName, lastName, email, phone, password, gender, dob, nic, role } = req.body;
    if (!firstName || !lastName || !email || !phone || !password || !gender || !dob || !nic) {
        return next(new ErrorHandler("Please fill the full form!", 400));
    }
    
    const isRegistered = await User.findOne({email});
    if(isRegistered){
        return next(new ErrorHandler("Admin with this email Already exists !"))
    }
    const admin = await User.create({
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        nic,
        role:"Admin"
    })

    res.status(200).json({
        success:true,
        message:"New Admin Registered !"
    })

})


// controller for Doctor  

module.exports.getAllDoctors=catchAsyncErrors(async(req,res,next)=>{
    const doctors = await User.find({role:"Doctor"});
    res.status(200).json({
        success:true,
        doctors,
    })
})


// contorller for getting userr details 

module.exports.getUserDetails = catchAsyncErrors(async(req,res,next)=>{
    const user = req.user ;
    console.log(user)
    res.status(200).json({
        success:true,
        user
    })
})



// contoller  for logout the adimin 

module.exports.logoutAdmin = catchAsyncErrors(async(req,res,next)=>{

    
    res.status(200).cookie("adminToken","",{
        httpOnly:true,
        expires:new Date(Date.now()),
    }).json({
        success:true,
        message:`${req.user.firstName} ${req.user.lastName}, you have been logged out successfully as an Admin.`
    })
    
})



// controller for  patient logout 

module.exports.logoutPatient = catchAsyncErrors(async(req,res,next)=>{
    res.status(200).cookie("patientToken","",{
        httpOnly:true,
        expires:new Date(Date.now()),
    }).json({
        success:true,
        message:`${req.user.firstName} ${req.user.lastName}, you have been logged out successfully as an Patient.`
    })
})


// controller for adding new doctor   

module.exports.addNewDoctor =catchAsyncErrors(async (req,res,next)=>{
    
    if(!req.files|| Object.keys(req.files).length === 0){
        return next (new ErrorHandler("Doctor Avatar Required !" , 400));
    }
    const {docAvatar} = req.files;
    const allowedFormates =["image/png","image/jpeg","image/webp",];
    if(!allowedFormates.includes(docAvatar.mimetype)){
        return next(new ErrorHandler("File Formate Not Supported",400));

    }

    const { firstName, lastName, email, phone, password, gender, dob, nic,doctorDepartment  } = req.body;

    if(!firstName,!lastName,!email,!phone,!password,!gender,!dob,!nic,!doctorDepartment){
        return next(new ErrorHandler("please Provide full details !",400));
    }

    const  isRegistered = await User.findOne({email});
    if(isRegistered){
        return next( new ErrorHandler(`${isRegistered.role} already registred with this email !`,400))
    }

    const cloudinaryResponse = await cloudinary.UploadStream.upload(
        docAvatar.tempFilePath
    );
    if(!cloudinaryResponse || cloudinaryResponse.error){
        console.error("cloudinary Error  : ",cloudinaryResponse.error ||"unknown cloudinary error")
    }
    const doctor = await User.create({
        firstName, lastName, email, phone, password, gender, dob, nic,doctorDepartment,
        role:"Doctor",
        docAvatar:{
            public_id: cloudinaryResponse.public_id,
            url:cloudinaryResponse.secure_url,
        }
    })
    res.status(200).json({
        success:true,
        message:"new doctor added successfully",
        doctor
    })
})





