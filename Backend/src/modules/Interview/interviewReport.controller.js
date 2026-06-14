import { Report } from "./interviewReport.model.js";
import { User } from "../user/user.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { apiResponse } from "../../utils/Api-Response.js";
import { apiError } from "../../utils/Api-Error.js";
import { PDFParse } from "pdf-parse";
import { main } from "./ai.service.js";


/**
 * @desc Creating a new report with AI
 */

const createInterviewReport = asyncHandler(async (req, res) => {
    const { selfDescription, jobDescription } = req.body
   
    if (!selfDescription) {
        throw new apiError(400, "Self description is required");
    }
    if (!jobDescription) {
        throw new apiError(400, "Job description is required");
    }
    const resumeContent = await (new PDFParse(Uint8Array.from(req.file.buffer))).getText()
    console.log(resumeContent);
    if(!req.file){
        throw new apiError(400, "Resume is required");
    }
    if (!resumeContent) {
        throw new apiError(400, "something went wrong while parsing resume");
    }
    const resumeText = resumeContent.text;


    


    const interviewReportByAI = await main({
        resume: resumeText,
        jobDescription,
        selfDescription
    });
    if(!interviewReportByAI){
        throw new apiError(400, "something went wrong while generating report");
    }



    const report = await Report.create({
        user: req.user.id,
        resume: resumeText,
        jobDescription,
        selfDescription,
        ...interviewReportByAI
    });

    return res
    .status(200)
    .json(
        new apiResponse(200, "Report created successfully", report));


});

/**
 * @desc finding report by id
 */
const getInterviewReportById = asyncHandler(async(req,res)=>{
    const report = await Report.findById(req.params.id);
    if(!report){
        throw new apiError(404, "Report not found");
    }
    return res
    .status(200)
    .json(
        new apiResponse(200, "Report found successfully", report));
})

/**
 * @desc finding all reports
 */
const getAllInterviewReports = asyncHandler(async(req,res)=>{
    const id = req.user?.id
    const report = await Report.find({user: id}).sort({createdAt: -1}).select("-user -resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")
    if(!report){
        throw new apiError(404, "Report not found");
    }
    return res
    .status(200)
    .json(
        new apiResponse(200, "Report found successfully", report));
})
export { createInterviewReport, getInterviewReportById, getAllInterviewReports };