const jwt = require("jsonwebtoken")


const tokenCheck = async (req, res, next) => {
    console.log(req.headers, "headers")
    const token = req.headers['authorization']
    if (!token) {
        return res.status(400).json({message : "token is missing"})
    }
    try{
        const decode = jwt.verify(token, process.env.SECRECT_KEY)
        console.log(decode, "token")
        next()
    }
    catch(err){
        console.log(err.message)
    }
}

module.exports = tokenCheck