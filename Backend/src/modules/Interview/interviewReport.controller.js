import { PDFParse } from "pdf-parse";
import { apiError } from "../../utils/Api-Error.js";
import { apiResponse } from "../../utils/Api-Response.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { main } from "./ai.service.js";
import { Report } from "./interviewReport.model.js";


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
        new apiResponse(200,report, "Report created successfully" ));


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
        new apiResponse(200, report, "Report found successfully"));
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
        new apiResponse(200, report, "Reports found successfully"));
})

/**
 * @description to delete the report 
 * 
 */

const deleteReport = asyncHandler(async(req,res)=>{
    const report = await Report.findByIdAndDelete(req.params.id);
    if(!report){
        throw new apiError(404, "Report not found");
    }
    return res
    .status(200)
    .json(
        new apiResponse(200, report, "Report deleted successfully"));
})
export { createInterviewReport, deleteReport, getAllInterviewReports, getInterviewReportById };
