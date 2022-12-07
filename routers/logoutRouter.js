const express=require('express')
const router=express.Router()

router.get('/',(req,res)=>{
    delete req.session.user_login_name
    delete req.session.user_gender
    res.clearCookie('login_token')
    res.redirect('/login')
})

module.exports=router