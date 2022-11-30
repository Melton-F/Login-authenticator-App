import express  from "express";
import authController from "../authController/authController"
const router = express.Router()

router.get('/all-users', authController.showUsers)
router.post('/register', authController.register)
router.post('/validate-user', authController.validateUser)
router.post('/user-Password', authController.createPassword)
router.post('/login', authController.login)
router.post('/admin-acceptance', authController.adminCheck)
router.post('/auth-app', authController.authPassword)

module.exports = router