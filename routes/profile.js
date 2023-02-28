const express = require('express')
const router = express.Router()
const passport = require('passport')
const userController = require('../controllers/userController')

router.get('/',passport.checkAuthentication,userController.profile)


module.exports = router