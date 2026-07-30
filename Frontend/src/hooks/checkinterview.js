import { useCallback } from "react";
import { useContext,useState} from "react";
import { interviewContext } from "../contexts/interview.context";
import { createInterviewReport,getAllInterviewReports,getInterviewReportById,deleteReport } from "@/api/interviewReport.api";


export const useInterview = () => {
    const context = useContext(interviewContext)
    if (!context) throw new Error("useInterview must be used within a InterviewProvider");
    const { interview, setInterview,  interviewList, setInterviewList } = context;

    const [generateReportsloading, setReportsloading] = useState(false);
    const [getallReportsloading, setAllReportsloading] = useState(false);
    const [getReportByIdloading, setReportByIdloading] = useState(false);
    const [deleteReportloading, setDeleteReportloading] = useState(false);


    const handleGenerateInterviewReport = async({resume,jobDescription,selfDescription})=>{ 
        try {
            setReportsloading(true);
    
            const response = await createInterviewReport({resumeFile:resume,jobDescription,selfDescription})
    
            setInterview(response.data);
    
            return response;
        } finally {
            setReportsloading(false);
        }
    };

const handleGetAllInterviewReports = useCallback(async () => {
  try {
    setAllReportsloading(true);

    const response = await getAllInterviewReports();

    setInterviewList(response.data);

    return response;
  } finally {
    setAllReportsloading(false);
  }
}, []);
   const handleGetInterviewReportById =useCallback( async(id)=>{ 
    try {
        setReportByIdloading(true);

        const response =
          await getInterviewReportById(id);
          

        setInterview(response.data);

        return response;

    } finally {
        setReportByIdloading(false);
    }
}, []);

const deleteInterviewReport = async(id) => {
    try {
      setDeleteReportloading(true);
  
      const response = await deleteReport(id);
  
      return response;
    } finally {
      setDeleteReportloading(false);
    }
  };
    return {
        deleteInterviewReport,
        deleteReportloading,
        generateReportsloading,
        interview,
        setInterview,
        interviewList,
        setInterviewList,
        getallReportsloading,
        getReportByIdloading,
        handleGenerateInterviewReport,
        handleGetAllInterviewReports,
        handleGetInterviewReportById};
}