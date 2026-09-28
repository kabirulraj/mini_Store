import { body, param, validationResult } from "express-validator"

// Runs after any validation chain below. If express-validator collected
// errors, respond with 400 and a field-level breakdown BEFORE the request
// ever reaches the controller. Otherwise, pass through.
function handleValidation(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation failed",
      errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
    });
  }
  next();
}

// ---------- Auth validators ----------

export const registerValidation = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").trim().isEmail().withMessage("A valid email is required").normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),
  handleValidation,
];

export const loginValidation = [
  body("email").trim().isEmail().withMessage("A valid email is required").normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required"),
  handleValidation,
];

// ---------- Product validators ----------

export const createProductValidation = [
  body("name").trim().notEmpty().withMessage("Product name is required"),
  body("description").optional().trim(),
  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .bail()
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),
  body("stock")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Stock must be a non-negative integer"),
  handleValidation,
];

export const updateProductValidation = [
  body("name").optional().trim().notEmpty().withMessage("Name cannot be empty"),
  body("description").optional().trim(),
  body("price").optional().isFloat({ min: 0 }).withMessage("Price must be a positive number"),
  body("stock").optional().isInt({ min: 0 }).withMessage("Stock must be a non-negative integer"),
  handleValidation,
];

// Validates the :id route param on every /api/products/:id route so we
// never hit the database with a malformed ObjectId.
export const productIdValidation = [
  param("id").isMongoId().withMessage("Invalid product id"),
  handleValidation,
];

