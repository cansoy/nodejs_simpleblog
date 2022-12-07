const mongoose=require('mongoose')

const BlogSchema=new mongoose.Schema({
    blogSubject:{
        type:String
    },
    blogTextarea:{
        type:String
    },
    blogWriter:{
        type:String
    },
    blogRegisterTime:{
        type:String
    },
    blogDefaultTime:{
        type:Date,
        default:new Date()
    },
    blogDefaultLocalTime:{
        type:Date,
        default:new Date().toLocaleString()
    }
},{timestamps:true})

const blogSchema=mongoose.model('BlogSchema',BlogSchema)

module.exports=blogSchema