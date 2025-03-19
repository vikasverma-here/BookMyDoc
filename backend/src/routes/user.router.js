


const express = require("express");
const userController = require("../controllers/user.controller");
const { isAdminAuthenticated, isPatientAuthenticated } = require("../middleware/auth");
const router = express.Router();


router.post("/patient/register", userController.patientRegister);
router.post("/login", userController.login);
router.post("/admin/addnew",isAdminAuthenticated,userController.addNewAdmin)
router.get("/doctors",userController.getAllDoctors)
router.get("/admin/me",isAdminAuthenticated,userController.getUserDetails)
router.get("/patient/me",isPatientAuthenticated,userController.getUserDetails)
router.get("/admin/logout",isAdminAuthenticated,userController.logoutAdmin)
router.get("/patient/logout",isPatientAuthenticated,userController.logoutPatient)
router.post("/doctor/addnew",isAdminAuthenticated,userController.addNewDoctor)
module.exports = router;
