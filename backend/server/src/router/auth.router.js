import { Router } from "express"
import { register, login, logout, getMe, refresh } from "../controller/auth.controller.js"
import protect from "../middleware/auth.middleware.js"
import { loginValidation, registerValidation } from "../validators/auth.validators.js"

const router = Router()

router.post("/register",registerValidation, register)
router.post("/login",loginValidation, login)
router.post("/logout", protect, logout)
router.get("/me", protect, getMe)
router.post("/refresh", refresh)

export default router
