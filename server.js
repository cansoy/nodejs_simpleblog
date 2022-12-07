const fs=require('fs')
const path =require('path')
require('dotenv').config({path:path.join(__dirname,'./bin/.env')})
const express=require('express')
const server=express()
const cors=require('cors')
const helmet =require('helmet')
const session=require('express-session')
const flash=require('connect-flash')
const cookieParser=require('cookie-parser')
const loginRouter=require('./routers/loginRouter')
const homeRouter=require('./routers/homeRouter')
const logoutRouter=require('./routers/logoutRouter')
const blogsRouter=require('./routers/blogsRouter')

server.use(cors())
server.use(helmet())
server.use(express.json())
server.use(express.urlencoded({extended:false}))
server.use(express.static(path.join(__dirname,'./public')))
server.set('view engine','ejs')
server.set('views',path.join(__dirname,'./views'))

server.use(session({
    secret:process.env.SESSION_SECRET,
    name:'track_session',
    resave:false,
    saveUninitialized:false,
    cookie:{httpOnly:true,maxAge:24*60*60*1000}
}))

server.use(flash())
server.use(cookieParser())

server.use('/login',loginRouter)
server.use('/home',homeRouter)
server.use('/blog',blogsRouter)
server.use('/logout',logoutRouter)



server.listen(3000,()=>{
    console.log(`${server.get('env')}///////////////////////////////////////////////////////////////////////////////////`)
})



