import { Router } from "express";
import { upload } from "../../middleware/upload.middleware.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import {createInterviewReport,getInterviewReportById,getAllInterviewReports} from "./interviewReport.controller.js"
const router = Router();
router.post("/", authMiddleware, upload.single("resume"), createInterviewReport)
router.get("/reports", authMiddleware,  getAllInterviewReports)
router.get("/:id", authMiddleware, getInterviewReportById)
    

export default router