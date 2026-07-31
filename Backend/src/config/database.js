const mongoose = require("mongoose")

function ConnectToDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(() =>{
   console.log("Connected To DataBase")
    })
    .catch(err =>{
       console.log("Error Connecting To DataBase",
        err
       )
    })
}

module.exports = ConnectToDB