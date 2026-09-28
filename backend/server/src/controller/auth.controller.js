import bcrypt from "bcryptjs"
import userModel from "../model/user.model.js"
import { generateTokens, verifyRefreshtoken } from "../utils/auth.js"


// @POST /api/auth/register
export const register =async(req, res)=>{
    const { name, email, password} = req.body

    const isUserExists = await userModel.findOne({email})
    
    if (isUserExists) {
        return res.status(400).json({
            message: "User already exists",
            error: [
                {
                    path: "email",
                    message: "User already exists"
                }
            ]
        })
    }

    const user = await userModel.create({
        name,
        email,
        passwordHash: await bcrypt.hash(password, 10)
    })
   
    const { accessToken, refreshToken } = generateTokens({
        userId: user._id
    })

    user.refreshToken = refreshToken
    await user.save()

    res.cookie("refreshToken", refreshToken,{
        httpOnly: true,
    })

    res.status(201).json({
        message: "User registered successfully",
        data:{
            user:{
                name: user.name,
                email: user.email,
            },
            accessToken
        }
    })

} 

export const login = async (req, res) => {
    const { email, password } = req.body

    const user = await userModel.findOne({ email })

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" })
    }

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
        return res.status(401).json({ message: "Invalid email or password" })
    }

    const { accessToken, refreshToken } = generateTokens({ userId: user._id })
    user.refreshToken = refreshToken
    await user.save()

    res.cookie("refreshToken", refreshToken,{
        httpOnly: true,
    })
    res.status(200).json({
        message: "Logged in successfully",
        data: { user: { name: user.name, email: user.email }, accessToken }
    })
}

export const logout = async (req, res) => {
    const user = await userModel.findById(req.user.id)
    if (user) {
        user.refreshToken = null
        await user.save()
    }

    res.clearCookie("refreshToken")
    res.status(200).json({ message: "Logged out successfully" })
}

export const getMe = async (req, res) => {
    const user = await userModel.findById(req.user.id).select("-passwordHash -refreshToken")
    if (!user) {
        return res.status(404).json({ message: "User not found" })
    }

    res.status(200).json({ message: "User fetched successfully", data: { user } })
}

export const refresh = async (req, res) => {
    const { refreshToken } = req.cookies

    if (!refreshToken) {
        return res.status(401).json({ message: "Unauthorized, refresh token not found" })
    }

    try {
        const decoded = verifyRefreshtoken(refreshToken)
        const user = await userModel.findById(decoded.id)

        if (!user || refreshToken !== user.refreshToken) {
            if (user) { user.refreshToken = null; await user.save() }
            return res.status(401).json({ message: "Unauthorized, refresh token mismatch" })
        }

        const { accessToken, refreshToken: newRefreshToken } = generateTokens({ userId: user._id })
        user.refreshToken = newRefreshToken
        await user.save()

        res.cookie("refreshToken", newRefreshToken, COOKIE_OPTIONS)
        res.status(200).json({ message: "Token refreshed successfully", accessToken })

    } catch {
        res.status(401).json({ message: "Unauthorized, invalid or expired refresh token" })
    }
}
