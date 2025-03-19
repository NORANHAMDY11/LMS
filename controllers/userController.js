const express = require('express')
const {validationResult} = require('express-validator');
const httpStatusText = require('../utils/httpStatusText');
const User = require('../models/user');
const bcrypt = require ('bcrypt')
const jwt = require ('jsonwebtoken')
const genrateJWT = require('../utils/genrateJWT')

const  getAllUsers = (async (req,res)=>{
    try{
        const query = req.query;
        const limit = query.limit || 10;
        const page = query.page || 1;
        const skip = (page-1)* limit;
        const findUsers = await User.find({},{'__v':0 , 'password' : false}).limit(limit).skip(skip)
        res.status(200).json({ status: httpStatusText.SUCCESS, data : findUsers })
    }catch(error){
        res.status(500).json({ status : httpStatusText.error , message : error.message})
    }

})

const  register = (async (req,res)=>{
   
    try{
        const {firstName,lastName,email,password,role} = req.body;
        const findUser =  await User.findOne({email : email })
        if(findUser)
        { 
            return res.status(500).json({ status : httpStatusText.FAIL, message : 'Wrong email or password'})
        }
        const hashedPassword =  await bcrypt.hash(password,10);
        const newUser = new User ({firstName,lastName,email,password : hashedPassword , role , avatar:req.file.filename  })
         
         // jwt token 
          const token =  await genrateJWT ({email : newUser.email ,id : newUser._id , role : newUser.role})
          newUser.token = token ;


          await newUser.save();
         return res.status(201).json({ status : httpStatusText.SUCCESS , message : ' register success' , data : newUser })

    }catch(error){
        return res.status(500).json({ status : httpStatusText.ERROR , message : error.message , data : null , code : 500})
    }

})

const  login = (async (req,res)=>{
    try{
          const {email , password}= req.body;
          const findUser = await  User.findOne({email : email })
         if(!findUser)
        {
            res.status(400).json({status: httpStatusText.FAIL , message :'wrong email or password'})
        }
          const matchedPassword  = await bcrypt.compare(password , findUser.password)
          if (findUser && matchedPassword )
          {
            //login successfuly 
            const token = await  genrateJWT ({ email : findUser.email , id : findUser._id , role: findUser.role})
            res.status(200).json({status:httpStatusText.SUCCESS, data :{ token } })
           }
           else 
           {
            res.status(500).json({ status : httpStatusText.ERROR , message : 'wrong email or password'})
           }
    }catch(error){
        res.status(500).json({ status : httpStatusText.ERROR , message : error.message})
    }

})

module.exports = {
    getAllUsers 
    ,login
    ,register

}
    require ('crypto').randomBytes(32).toString('hex')