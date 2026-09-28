import jwt from "jsonwebtoken"
import config from "../config/config.js"

export const generateTokens = ({userId}) =>{

    const accessToken = jwt.sign({ id: userId }, config.ACCESS_TOKEN_SECRET, { expiresIn: "15m"})
    const refreshToken = jwt.sign({ id: userId }, config.REFRESH_TOKEN_SECRET, { expiresIn: "7d"})

    return { accessToken, refreshToken }

}

export const verifyAccesstoken = (token)=>{
    
    const decoded = jwt.verify(token, config.ACCESS_TOKEN_SECRET)

    return decoded
}


export const verifyRefreshtoken = (token)=>{
    
    const decoded = jwt.verify(token, config.REFRESH_TOKEN_SECRET)

    return decoded
}
