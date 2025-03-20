const { catchAsyncErrors } = require("../middleware/catchAsyncErrors");
const { ErrorHandler } = require("../middleware/errorMiddleware");
const Appointment =require("../models/appointmentSchema")
const User = require("../models/user.model")


module.exports.postAppointment = catchAsyncErrors(async(req,res,next)=>{
    const {

        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        appointment_date,
        department,
        doctor_firstName,
        doctor_lastName,
        hasVisited,
        address

    } =req.body

    if(!firstName||
        !lastName||
       ! email||
        !phone||
        !nic||
       ! dob||
        !gender||
        !appointment_date||
        !department||
       ! doctor_firstName||
       ! doctor_lastName||
      
       ! address){
        return next(new ErrorHandler("please fill full form !",400))
       }
       const isConflict= await User.find({
        firstName:doctor_firstName,
        lastName:doctor_lastName,
        role:"Doctor",
       doctorDepartment:department
       })

       if(isConflict.length == 0){
        return next (new ErrorHandler("Doctor not found ",404));

       }
       if(isConflict.length>1){
        return next (new ErrorHandler("Docotrs conflict please contact through email or phone !",400))
       }


       const doctorId =isConflict[0]._id;
       const patientId = req.user._id;

       const appointment =await Appointment.create({
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        appointment_date,
        department,
        doctor:{
            firstName:doctor_firstName,
            lastName:doctor_lastName,
        },
        
        doctorId,
        patientId,
        hasVisited,
        address
       })

       res.status(200).json({
        success:true,
        message:'Appointment sent successfully !',
        appointment
       })
})


module.exports.getAllAppointments = catchAsyncErrors(async (req,res,next)=>{
    const appointments =await Appointment.find();
    res.status(200).json({
        success:true,
        appointments
    })
})


module.exports.updateAppointmentStatus=catchAsyncErrors(async(req,res,next)=>{
    const {id} = req.params
      let appointment = await Appointment.findById(id)
     if(!appointment){
        return next (new ErrorHandler('Appointment not found',400))
     }

     appointment = await Appointment.findByIdAndUpdate(id,req.body,{
        new:ture,
        runValidators:true,
        useFindAndModify:false,
     })

     res.status(200).json({
        success:true,
        message:"Appointment status Updated !",
        appointment,
     })

}
    
)


module.exports.deleteAppointment= catchAsyncErrors(async(req,res,next)=>{
    const {id} = req.params
    let appointment = await Appointment.findById(id)
   if(!appointment){
      return next (new ErrorHandler('Appointment not found',400))
   }

   await appointment.deleteOne();
   res.status(200).json({
    success:true,
    message:"Appintment delete successfully",
   })
})