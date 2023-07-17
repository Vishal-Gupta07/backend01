
const express = require("express")
const {UserModel} = require("../models/users.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const userRouter = express.Router()


userRouter.post("/register", async (req, res)=> {
    const {name, email, password , gender} = req.body 
    try {

        bcrypt.hash(password, 5, async (err, hash)=> {
            if(err){
                res.json({error: err.message})
            }else {
                const user = new UserModel({name, email, gender, password:hash})
                await user.save()
                res.json({msg: "User has been register", user: user})
            }
        })
    } catch (error) {
        res.json({error:error.message})
    }
})

userRouter.post("/login", async (req, res)=> {
    const {email, password} = req.body
    try {
        const user = await UserModel.findOne({email})
        if(user){
            bcrypt.compare(password, user.password, (err, result) =>{
                if(result){
                    let token = jwt.sign({userID: user._id, user: user.name}, process.env.sct)
                    res.json({msg: "Logged In !! ", token})
                }else{
                    res.json({error: "Wrong condential !!"})
                }
            })
        }
    } catch (err) {
        res.json({error: err.message})
    }
})


module.exports={
    userRouter
}