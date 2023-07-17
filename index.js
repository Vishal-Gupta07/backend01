const express = require("express")
const {connection} = require("./db")
const {userRouter} = require("./routes/user.routes")
const {postRouter} = require("./routes/post.route")
const cors = require("cors")
require("dotenv").config()


const app = express()
app.use(cors())
app.use(express.json())
app.use("/users", userRouter)
app.use("/posts", postRouter)

app.listen(process.env.port, async ()=>{
    try {
        await connection
        console.log("connect to db");
        console.log(`server is running port ${process.env.port}`);
    } catch (error) {
        console.log(error);
    }
})

