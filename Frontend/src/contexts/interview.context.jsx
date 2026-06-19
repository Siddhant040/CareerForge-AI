import { createContext,useState } from "react";

export const interviewContext = createContext();

export const InterviewProvider = ({ children }) => {
    
    const [interview, setInterview] = useState(null);
    const [interviewList, setInterviewList] = useState([]);
    return (
        <interviewContext.Provider value={{ interview, setInterview, interviewList, setInterviewList}}>
            {children}
        </interviewContext.Provider>
    );
}