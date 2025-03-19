
const express = require('express')
const router = express.Router()
const {body, validationResult} = require('express-validator');
const courseController = require ('../controllers/courseController') 
const verifyToken = require('../middleware/verifyToken');
const userRoles = require('../utils/userRoles');
const allawedTo = require('../middleware/allowedTo')
/*
//Get all courses
router.get('/course',courseController.getAllCorses)
// creat course 
router.post('/course',
    [body('title')
    .notEmpty()
    .withMessage('title is requaired')
    .isLength({min:3})
    .withMessage("minimam length ot title is 3 chars")
    ]
    ,courseController.addCourse)

//get one course
 router.get('/course/:id',courseController.getCourse)

//update in course
router.put('/course/:id',courseController.updateCourse)

// delete course
router.delete('/course/:id',courseController.deleteCourse)
*/

router.route('/course')
.get(courseController.getAllCorses)
.post(
    [body('title')
    .notEmpty()
    .withMessage('title is requaired')
    .isLength({min:3})
    .withMessage("minimam length ot title is 3 chars")
    ],verifyToken,allawedTo (userRoles.ADMIN ,userRoles.MANGER),courseController.addCourse)

router.route('/course/:id')
.get(courseController.getCourse)
.put(verifyToken, allawedTo (userRoles.ADMIN ,userRoles.MANGER), courseController.updateCourse)
.delete(verifyToken,allawedTo (userRoles.ADMIN ,userRoles.MANGER),courseController.deleteCourse)



module.exports= router;



