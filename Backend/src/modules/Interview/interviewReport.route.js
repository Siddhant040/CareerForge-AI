import { Router } from "express";
import { upload } from "../../middleware/upload.middleware.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import {createInterviewReport,getInterviewReportById,getAllInterviewReports , deleteReport} from "./interviewReport.controller.js"
const router = Router();
router.post("/", authMiddleware, upload.single("resume"), createInterviewReport)
router.get("/reports", authMiddleware,  getAllInterviewReports)
router.delete("/:id", authMiddleware, deleteReport)
router.get("/:id", authMiddleware, getInterviewReportById)
    

export default router