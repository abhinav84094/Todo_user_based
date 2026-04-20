import jwt from "jsonwebtoken";

export default function auth(req, res, next){
    const token = req.headers.authorization;

    if(!token){
        res.status(401).json({
            message:"No token "
        })
        return;
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded
    next();

}

