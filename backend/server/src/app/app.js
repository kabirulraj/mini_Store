import express from "express"
import cookieParser from "cookie-parser"
import authRoutes from "../router/auth.router.js"
import productRoutes from "../router/product.router.js"

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/products", productRoutes)

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: `Route ${req.method} ${req.originalUrl} not found` })
})

// global error handler
app.use((err, req, res, next) => {
    console.error(err)
    res.status(err.status || 500).json({ message: err.message || "Internal server error" })
})

export default app
