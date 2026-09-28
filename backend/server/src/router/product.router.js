import { Router } from "express"
import { getProductsController, getSingleProductController, createProductController, updateProductController, deleteProductController } from "../controller/product.controller.js"
import protect from "../middleware/auth.middleware.js"

const router = Router()

router.use(protect)

router.get("/", getProductsController)
router.get("/:id", getSingleProductController)
router.post("/", createProductController)
router.put("/:id", updateProductController)
router.delete("/:id", deleteProductController)

export default router
