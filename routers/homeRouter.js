const express=require('express')
const router=express.Router()
const jwt=require('jsonwebtoken')
const dbConnect=require('../mongodb/dbConnect')
const BlogSchema=require('../mongodb/dbBlogSchema')

router.post('/',(req,res)=>{
    const reqBody=req.body
    if (reqBody.name=="") {
        req.flash('fillName','Please Write Your Name !!!')
        res.redirect('/login')
        return 
    }
    if (reqBody.gender==undefined) {
       req.flash('selectGender','Please Select Your Gender !!!') 
       res.redirect('/login')
       return
    }
    req.session.user_login_name=req.body.name
    req.session.user_gender=req.body.gender
    const login_token=jwt.sign({name:req.body.name,gender:req.body.gender},process.env.JWT_SECRET,{expiresIn:"24h"})
    res.cookie('login_token',login_token)
    res.redirect('/home')
})

router.get('/',async(req,res)=>{
    try {
        const login_token=req.cookies.login_token
        jwt.verify(login_token,process.env.JWT_SECRET)
    } catch (error) {
        res.redirect('/login')
        return
    }
    if (req.session.user_login_name!==undefined && req.session.user_gender!==undefined) {
        const username=req.session.user_login_name
        const usergender=req.session.user_gender
        const dataSaveInformation=req.flash('datasaved')
        await dbConnect()
        const dbdata= await BlogSchema.find()
        res.render('home',{
            username:username,
            usergender:usergender,
            dataSaveInformation:dataSaveInformation,
            dbdata:dbdata
        })
        return
    }
    res.redirect('/logout')
})

module.exports=router