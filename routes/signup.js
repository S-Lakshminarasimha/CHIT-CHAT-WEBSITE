const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')

router.get('/',userController.signup)
router.post('/createAccount',userController.createAccount)

module.exports = router