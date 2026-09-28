import { verifyAccesstoken } from "../utils/auth.js"

const protect = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]

    if (!token) {
        return res.status(401).json({ message: "Unauthorized, no token provided" })
    }

    try {
        req.user = verifyAccesstoken(token)
        next()
    } catch {
        return res.status(401).json({ message: "Unauthorized, invalid or expired token" })
    }
}

export default protect
