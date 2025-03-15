const mongoose = require("mongoose")

const connectionDb = ()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName:"hospital-management"
    }).then(()=>{
        console.log("db is connected  successfully")
    })
    .catch((err)=>{
        console.log(`error accured while db is stablish connection ${err}`)
    })
}

module.exports=connectionDb