const {JWT_SECRET} = require("./config")
const jwtToken = require("jsonwebtoken")

const authMiddleware = (req, res, next)=>{
    const bearerToken = req.headers.authorization;
    if(!bearerToken || !bearerToken.startsWith("Bearer ")){
        res.status(403).json({});
        return;
    }
    const token = bearerToken.split(" ")[1];

    try{
        const user = jwtToken.verify(token, JWT_SECRET);
        req.userId = user.userId;
        req.firstName = user.firstName;
        next();
    }
    catch(err){
        res.status(403).json({});
    }
}

module.exports = {
    authMiddleware
}