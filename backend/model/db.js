const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const url = process.env.MONGO_URL

const connection = async()=>{
    try {
        await mongoose.connect(url , 
            {useCreateIndex:true , useFindAndModify:false ,useNewUrlParser:true 
            ,useUnifiedTopology:true}) 
        console.log('Database connected')
    } catch (error) {
        console.log(error)
    }

}

module.exports = connection