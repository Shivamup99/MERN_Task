const {body , validationResult} = require('express-validator')

const userValidation =()=>{
    return [
        body('name').isString().isLength({min:3,max:30}),
        body('email').isEmail().isLength({min:11,max:41}),
        body('password').isString().isLength({min:5,max:20}),
        body('mobile').isMobilePhone().isLength(10),
        body('profession').isString().isLength({min:3,max:30}),
    ]
}

const validateSchema = (req,res,next)=>{
    const error = validationResult(req)
    if(error.isEmpty()){
    return next();
    }

    const schemaError = []
    error.array().map((err)=>schemaError.push({[err.param] : err.msg }))
    res.status(422).json({
        error: schemaError
    });
}


module.exports={userValidation, validateSchema }