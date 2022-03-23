const {body,validationResult} = require('express-validator')

const categoryValidation =()=>{
    return[
        body("cat_name").isString()
    ]
}

const validateSchema = (req,res,next)=>{
    const error = validationResult(req)
    if(error.isEmpty()){
        return next()
    }

    const errorSchema = []
    error.array().map(err=>errorSchema.push({[err.param]:err.msg}))

    res.status(422).json({
        error:errorSchema
    })
}

module.exports = {categoryValidation,validateSchema}