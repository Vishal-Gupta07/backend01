

const express = require("express")
const {PostModel} = require("../models/post.model")
const {auth} = require("../middleware/auth.middleware")



const postRouter = express.Router()
postRouter.use(auth)
postRouter.post("/create", async (req, res)=>{
    try {
        const post = new PostModel(req.body)
        await post.save()
        res.json({msg: "New Post has been added", posts: post})
    } catch (err) {
        res.json({error:err.message})
    }
})


postRouter.get("/", async (req, res)=> {
    try {
        const post = await PostModel.find({userID: req.body.userID})
        res.json(post)
    } catch (error) {
        res.json({error: error.message})
    }
})







module.exports={
    postRouter
}