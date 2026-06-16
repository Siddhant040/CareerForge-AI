import api from "./axios";
{ createInterviewReport,
     getInterviewReportById,
      getAllInterviewReports }


export const createInterviewReport = async (interviewReport) => {
    const response = await api.post("/interviewReport", interviewReport);
    return response.data;
  };
  
  export const getInterviewReportById = async (id) => {
    const response = await api.get(`/interviewReport/${id}`);
    return response.data;
  };
  
  export const getAllInterviewReports = async () => {
    const response = await api.get("/interviewReport");
    return response.data;
  };
      