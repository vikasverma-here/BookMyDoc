const express=require("express")

const router  =  express.Router()
const appointmentController = require("../controllers/appointment.controller")
const {isAdminAuthenticated,isPatientAuthenticated} = require("../middleware/auth")
router.post("/post",isPatientAuthenticated,appointmentController.postAppointment)
router.get("/getAll",isAdminAuthenticated,appointmentController.getAllAppointments)
router.put("/update",isAdminAuthenticated,appointmentController.updateAppointmentStatus)
router.delete("/delete",isAdminAuthenticated,appointmentController.deleteAppointment)

module.exports = router