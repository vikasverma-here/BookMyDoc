const express = require("express");
const messageController = require("../controllers/message.controller");
const { isAdminAuthenticated } = require("../middleware/auth");
 
const router = express.Router()


router.post('/send',messageController.sendMessage)
router.get("/getAll",isAdminAuthenticated,messageController.getAllMessage)
module.exports= router;