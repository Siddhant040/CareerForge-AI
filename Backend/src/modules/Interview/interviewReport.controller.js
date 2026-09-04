import { PDFParse } from "pdf-parse";
import { apiError } from "../../utils/Api-Error.js";
import { apiResponse } from "../../utils/Api-Response.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { Report } from "./interviewReport.model.js";
import { generateInterviewPipeline } from "./services/ai/ai.service.js";
import { generateInterviewReportPdf } from "./services/pdf/reportPdf.service.js";


/**
 * @desc Creating a new report with AI
 */

const createInterviewReport = asyncHandler(async (req, res) => {
  console.log(
    "🔥 CREATE INTERVIEW REPORT CALLED",
    new Date().toISOString(),
  );
  const { selfDescription, jobDescription } = req.body;
  console.log("BODY:", req.body);
  console.log("FILE:", req.file?.originalname);

  if (!selfDescription?.trim()) {
    throw new apiError(400, "Self description is required");
  }

  if (!jobDescription?.trim()) {
    throw new apiError(400, "Job description is required");
  }

  if (!req.file) {
    throw new apiError(400, "Resume is required");
  }

  const resumeContent = await new PDFParse(
    Uint8Array.from(req.file.buffer),
  ).getText();

  if (!resumeContent?.text) {
    throw new apiError(
      400,
      "Something went wrong while parsing resume",
    );
  }

  const resumeText = resumeContent.text;

  const interviewReportByAI = await generateInterviewPipeline({
    resume: resumeText,
    jobDescription,
    selfDescription,
  });

  if (!interviewReportByAI) {
    throw new apiError(
      400,
      "Something went wrong while generating report",
    );
  }

  const report = await Report.create({
    user: req.user.id,
    resume: resumeText,
    jobDescription,
    selfDescription,
    ...interviewReportByAI,
  });

  return res.status(200).json(
    new apiResponse(
      200,
      report,
      "Report created successfully",
    ),
  );
});

/**
 * @desc finding report by id
 */
const getInterviewReportById = asyncHandler(async (req, res) => {
 const report = await Report.findOne({
  _id: req.params.id,
  user: req.user.id,
});
  if (!report) {
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
const getAllInterviewReports = asyncHandler(async (req, res) => {
  const id = req.user?.id
  const report = await Report.find({ user: id }).sort({ createdAt: -1 }).select("-user -resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")
  if (!report) {
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

const deleteReport = asyncHandler(async (req, res) => {
  const report = await Report.findOneAndDelete({
  _id: req.params.id,
  user: req.user.id,
});
  if (!report) {
    throw new apiError(404, "Report not found");
  }
  return res
    .status(200)
    .json(
      new apiResponse(200, report, "Report deleted successfully"));
})

/**
 * @desc Download interview report as PDF
 */
const downloadInterviewReport = asyncHandler(async (req, res) => {
  const report = await Report.findOne({
    _id: req.params.id,
    user: req.user.id,
  });

  if (!report) {
    throw new apiError(404, "Report not found");
  }

  const pdfBuffer = await generateInterviewReportPdf(report);

  const safeTitle = (report.title || "CareerForge-Interview-Report")
    .replace(/[^a-z0-9-_]/gi, "-")
    .replace(/-+/g, "-");

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${safeTitle}.pdf"`,
  );
  res.setHeader("Content-Length", pdfBuffer.length);

  return res.status(200).send(pdfBuffer);
});
export { 
  downloadInterviewReport, 
  createInterviewReport,
   deleteReport, 
   getAllInterviewReports, 
   getInterviewReportById };

