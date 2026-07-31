require("dotenv").config()
const app = require("./src/app")
const ConnectToD = require("./src/config/database")


ConnectToD()
app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})