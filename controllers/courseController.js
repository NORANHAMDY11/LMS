const express = require('express')
const {validationResult} = require('express-validator');
const Course = require('../models/course')
const httpStatusText = require('../utils/httpStatusText');
const course = require('../models/course');
 
const getAllCorses = (async(req,res)=>{
try{
     const query = req.query;
     const limit = query.limit || 10;
     const page = query.page || 1;
     const skip = (page - 1)*limit;
    const courses = await Course.find({},{"__v": false}).limit(limit).skip(skip)
    res.json({status : httpStatusText.SUCCESS , data :{courses}})
}catch(error)
{
    res.status(400).json({status : httpStatusText.ERROR , data : null , message : error.message , code : 400})
}
}) 

const getCourse = (async(req,res)=>{
    try{
        
       let course = await Course.findById(req.params.id)
       if(!course)
        {
          return  res.status(404).json({ status : httpStatusText.FAIL , data :{course : 'course not found '}})
        }
        res.json({ status : httpStatusText.SUCCESS , data : {course}})
        

    }catch(error){
        res.status(400).json({status : httpStatusText.ERROR , data : null , message : error.message , code : 400})
    }
 })
 
const addCourse = (async(req,res)=>{
     try{
           const errors = validationResult(req)
           if(!errors.isEmpty())
           {
             return res.status(404).json({ status : httpStatusText.FAIL , data : errors.array()})
           }
 
         const newCourse= new Course(req.body)
         await newCourse.save()
         res.status(201).json({ status : httpStatusText.SUCCESS , data :{course: newCourse}, message: "course added successfuly"})
     }catch(error){
         res.status(400).json({status : httpStatusText.ERROR , data : null , message : error.message , code : 400})
     }
  })
 
const updateCourse = (async(req,res)=>{
      try{
          const { id } = req.params
          const content = req.body
          const updatedCourse = await Course.findByIdAndUpdate(id,content,{new : true})
          res.json({ status : httpStatusText.SUCCESS , data : {course : updatedCourse }, message: "course updated successfuly"})
  
      }catch(error){
          res.status(400).json({status : httpStatusText.ERROR , data : null , message : error.message , code : 400})
      }
  })

const deleteCourse = (async(req,res)=>{
    try{
        const { id }= req.params;
         await Course.findByIdAndDelete(id)
        res.json({ status : httpStatusText.SUCCESS , data : null})

    }
    catch(error){
      res.status(400).json({status : httpStatusText.ERROR , data : null , message : error.message , code : 400})
    }
})

module.exports = {
    getAllCorses,
    getCourse, 
    addCourse,
    updateCourse,
    deleteCourse
}