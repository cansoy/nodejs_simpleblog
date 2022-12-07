const express=require('express')
const router=express.Router()
const jwt=require('jsonwebtoken')

router.get('/',(req,res)=>{
    try {
       const login_token=req.cookies.login_token
       jwt.verify(login_token,process.env.JWT_SECRET)
       res.redirect('/home')
       return
    } catch (error) {
        res.clearCookie('login_token')
        delete  req.session.user_login_name
        delete req.session.user_gender
        const fillName=req.flash('fillName')
        const selectGender=req.flash('selectGender')
        res.render('login',{fillName:fillName,selectGender:selectGender}) 
    }
})

module.exports=router