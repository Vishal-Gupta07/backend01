

const jwt = require("jsonwebtoken")
require("dotenv").config()

const auth = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]
    if(token){
        try {
            const decode = jwt.verify(token, process.env.sct)
            if(decode){
                // console.log(decode);
                req.body.userID = decode.userID
                req.body.user = decode.user
                next()
            }else {
                res.json({msg: "Not Authorized"})
            }
        } catch (error) {
            res.json({error: error.message})
        }
    }else {
        res.json({msg: "Please Login !!"})
    }
}

module.exports={
    auth
}