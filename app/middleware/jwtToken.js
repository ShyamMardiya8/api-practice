const jwt = require("jsonwebtoken");

const tokenCheck = async (req, res, next) => {
    console.log(req.headers, "headers");
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(400).json({ message: "Token is missing" });
    }

    try {
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        console.log(decode, "decoded token");
        req.user = decode;
        next();
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token has expired" });
        } else if (err.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Invalid token" });
        } else {
            console.log(err.message);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
};

module.exports = tokenCheck;
