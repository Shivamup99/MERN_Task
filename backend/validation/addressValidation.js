const {body,validationResult} = require('express-validator')

const addressValidation = ()=>{
    return [
        body('post_code').isNumeric().isLength({min:3,max:10}),
        body('state').isString().isLength({min:3,max:20}),
        body('distric').isString().isLength({min:3,max:20}),
        body('house_location').isString().isLength({min:3,max:40}),
        body('country').isString().isLength({min:3,max:20}),
    ]
}

const validateSchema = (req,res,next)=>{
    const error = validationResult(req)
    if(error.isEmpty()){
        return next()
    }

    const schemaError = []
    error.array().map(err=>schemaError.push({[err.param]:err.msg}))
    res.status(422).json({
        error:schemaError
    })
}

module.exports ={addressValidation , validateSchema}