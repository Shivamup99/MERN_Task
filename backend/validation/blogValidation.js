const {body , validationResult} = require('express-validator')

const blogValidation =()=>{
    return[
        body('title').isString().isLength({min:3,max:100}),
        body('blog_creator').isString().isLength({min:3,max:30}),
        body('desc').isString().isLength({min:4,max:600}),
    ]
}

const validateSchema =(req,res,next)=>{
    const error = validationResult(req)
    if(error.isEmpty()){
        return next()                                                     
    }
    const schemaError = []
    error.array().map(err=>schemaError.push({ [err.param] : err.msg}))
    res.status(422).json({
        error:schemaError
    })
}


module.exports = {blogValidation , validateSchema}