import {Router} from "express"
import { register,login,logout,getUser,refreshAccessToken } from "./user.controller.js"
import { registerSchema,loginSchema } from "./user.validation.js"
import { authMiddleware } from "../../middleware/auth.middleware.js"
import { validate } from "../../middleware/validator.middleware.js"
 const router = Router()
 router.post("/register", validate(registerSchema), register)
 router.post("/login", validate(loginSchema), login)
 router.post("/logout", authMiddleware, logout)
 router.get("/me", authMiddleware, getUser)
 router.post("/refresh-token", refreshAccessToken)

 export default router