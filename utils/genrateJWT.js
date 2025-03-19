const  jwt = require ('jsonwebtoken')
const httpStatusText= require('../utils/httpStatusText')
module.exports = async (payload)=> {
    
        const token = await jwt.sign(
            payload,
            process.env.JWT_SECRET_KEY,
            {expiresIn: '10m'}
            );
            return token;
    
    
    }


    