const httpStatusText = require('../utils/httpStatusText')
module.exports = (...roles)=>{
    return (req,res,next)=>{
        if (!roles.includes(req.decodedToken.role))
        {
            return next (res.status(401).json({ status : httpStatusText.FAIL , data : null , message : " this role is not authorized "}))
        }
        next();

    }
}
