const User = require("../models/user.model");
const { catchAsyncErrors } = require("./catchAsyncErrors");
const { ErrorHandler } = require("./errorMiddleware");
const jwt = require("jsonwebtoken")

const isAdminAuthenticated = catchAsyncErrors(async(req,res,next)=>{
    const token = req.cookies.adminToken;
    if(!token){
        return next(new ErrorHandler("Admin not authenticated ! ",400))
    }

    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
    req.user=await User.findById(decoded.id);
    if(req.user.role !== "Admin"){
        return next(

            new ErrorHandler(`${req.user.role} not authorized for this resources`,403)
        )
    }
    next()
})
const isPatientAuthenticated = catchAsyncErrors(async(req,res,next)=>{
    const token = req.cookies.patientToken;
    if(!token){
        return next(new ErrorHandler("pateint not authenticated ! ",400))
    }

    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
    req.user=await User.findById(decoded.id);
    if(req.user.role !== "Patient"){
        return next(

            new ErrorHandler(`${req.user.role} not authorized for this resources`,403)
        )
    }
    next()
})


module.exports={
    isAdminAuthenticated,
    isPatientAuthenticated
}