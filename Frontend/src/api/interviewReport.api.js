import api from "./axios";


/**
 * 
 * @description Service to generate interview report based on user self description, job description and resume
 */
export const createInterviewReport = async ({jobDescription,resumeFile,selfDescription}) => {
  const formData = new FormData();
  formData.append("jobDescription", jobDescription);
  formData.append("resume", resumeFile);
  formData.append("selfDescription", selfDescription);
    const response = await api.post("/interviewReport", formData,{
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  };

  /**
   * @description Service to get interview report by id
   */
  
  export const getInterviewReportById = async (id) => {
    const response = await api.get(`/interviewReport/${id}`);
    return response.data;
  };

  /**
   * @description Service to get all interview reports
   */
  
  export const getAllInterviewReports = async () => {
    const response = await api.get("/interviewReport/reports");
    return response.data;
  };
 /**
  * @description Service to delete the report 
 */     

  export const deleteReport = async (id) => {
    const response = await api.delete(`/interviewReport/${id}`);
    return response.data;
  };