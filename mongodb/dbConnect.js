const mongoose=require('mongoose')
const dburi =process.env.MONGODB_PATH
const dboptions={ useNewUrlParser: true, useUnifiedTopology: true,dbName:"myblogdb"}

const dbConnection=async()=>{
    console.log('waiting db')
    mongoose.connect(dburi,dboptions)
    .then(res=>{
        console.log('db connection is ok')
    })
    .catch(err=>{
        console.log('db connection is error')
    })
}

module.exports=dbConnection
