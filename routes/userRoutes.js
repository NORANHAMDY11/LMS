
const express = require('express')
const httpStatusText= require('../utils/httpStatusText')
const upload = require('../middleware/upload')
const router = express.Router()
const {body, validationResult} = require('express-validator');
const userController = require ('../controllers/userController') 
const verifyToken = require('../middleware/verifyToken')


router.route('/')
.get(verifyToken , userController.getAllUsers)

router.route('/login')
.post(userController.login)

router.route('/register')
.post(upload.single('avatar') , userController.register)


module.exports= router;




