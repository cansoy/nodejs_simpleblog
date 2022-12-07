const express=require('express')
const router=express.Router()
const dbConnect=require('../mongodb/dbConnect')
const BlogSchema=require('../mongodb/dbBlogSchema')

router.post('/created',async(req,res)=>{
    const blogSchema=new BlogSchema({
        blogSubject:req.body.blogSubject,
        blogTextarea:req.body.blogTextarea,
        blogWriter:req.session.user_login_name,
        blogRegisterTime:new Date().toLocaleString(),
    })
    
    try {
        await dbConnect()
        await blogSchema.save()
        req.flash('datasaved','Your Blog Successfully Saved :)')
        res.redirect('/home')
    } 
    catch (error) {
        req.flash('datasaved','Your Blog Couldnt Saved !')
        res.redirect('/home')
    }
})

router.post('/postdeleted',async(req,res)=>{
    const reqBody=req.body
    const homedatadelete=reqBody.homedatadelete
    const count_1=await BlogSchema.count()
    console.log(count_1)
    const findData=await BlogSchema.findOneAndDelete({_id:homedatadelete })
    const count_2=await BlogSchema.count()
    console.log(count_2)
    res.redirect('/home')
})



module.exports=router