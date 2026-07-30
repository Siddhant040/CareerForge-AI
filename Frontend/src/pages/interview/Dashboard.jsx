import { useEffect, useRef, useState } from "react";

import {
  FileText,
  Loader2,
  LogOut,
  Sparkles,
  Upload,
  User
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Card } from "@/components/ui/card";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/checkAuth";
import { useInterview } from "@/hooks/checkinterview";

export default function Dashboard() {

  const navigate = useNavigate();


  const { handleGenerateInterviewReport, generateReportsloading } = useInterview();
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [resumeFile, setResumeFile] = useState(null);

  const fileInputRef = useRef(null);

  /**
    * @description This function is used to logout the user
    */
  const { user, handleLogout, logoutLoading } = useAuth();

  const LoggingOut = async () => {
    try {
      const response = await handleLogout();
      toast.success(response.message);
      navigate("/login");

    } catch (error) {
     
      toast.error(
        error.response?.data?.message ||
        "Something went wrong while logging out"
      );


    }


  }





  /**
  * @description this function is used to generate interview report
  * 
  */
  const generateReport = async () => {
    if (!resumeFile) {
      toast.error("Please select a resume file");
      return;
    }

    if (!jobDescription) {
      toast.error("Please enter job description");
      return;
    }

    if (!selfDescription) {
      toast.error("Please enter self description");
      return;
    }

    try {
      const response =
        await handleGenerateInterviewReport({
          resume: resumeFile,
          jobDescription,
          selfDescription,
        });

      toast.success(response.message);

      navigate(`/interviewReport/${response.data._id}`);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Something went wrong while generating interview report"
      );
    }
  };





  /**
  * @description this function is used to get the list of all interview reports
  */
  const { interviewList, handleGetAllInterviewReports } = useInterview();
  useEffect(() => {
    handleGetAllInterviewReports();
  }, [handleGetAllInterviewReports]);

  const { deleteInterviewReport } = useInterview();
  const handleDeleteReport = async (id) => {
    try {
      const response = await deleteInterviewReport(id);
      toast.success(response.message);
      handleGetAllInterviewReports();
    } catch (error) {
     
      toast.error(
        error.response?.data?.message ||
        "Something went wrong while deleting report"
      );
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-rose-500/20">
        <div className="container mx-auto px-6 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              Career<span className="text-rose-500">Forge</span> AI
            </h1>

            <p className="mt-2 text-gray-400">
              Generate personalized interview reports powered by AI.
            </p>
          </div>

          <div className="flex gap-4">
            {user ? (
              <>
                <div className=" text-white  flex items-center gap-2 rounded-md px-2 py-1">
                  <User className=" bg-white text-black rounded-2xl  h-6 w-6" />
                  {user.name}
                </div>


                <Button
                  disabled={logoutLoading}
                  className="bg-rose-500 hover:bg-rose-600"
                  onClick={LoggingOut}
                >
                  {logoutLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Logging out...
                    </>
                  ) : (
                    <>
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </>
                  )}
                </Button>
              </>
            ) : (
              <>
                <Button onClick={() => navigate("/login")} variant="ghost">
                  Login
                </Button>
                <Button onClick={() => navigate("/register")} className="bg-rose-500 hover:bg-rose-600">
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="container mx-auto px-6 py-12">
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex rounded-full border border-rose-500/30 px-4 py-2 text-sm text-rose-400">
            AI Interview Report Generator
          </div>

          <h2 className="text-4xl font-bold md:text-5xl">
            Create Your
            <span className="text-rose-500">
              {" "}Interview Strategy
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            Upload your resume and receive detailed interview insights,
            strengths, weaknesses, improvement areas, and AI-generated
            interview questions.
          </p>
        </div>

        {/* Main Card */}
        <div className="rounded-3xl border border-rose-500/20 bg-zinc-950">
          <div className="grid gap-8 p-8 lg:grid-cols-2">

            {/* Job Description */}
            <div>
              <div className="mb-4 flex items-center gap-3">
                <FileText className="h-5 w-5 text-rose-500" />

                <h3 className="font-semibold">
                  Target Job Description
                </h3>

                <span className="rounded-full bg-rose-500/10 px-3 py-1 text-xs text-rose-400">
                  Optional
                </span>
              </div>

              <Textarea
                value={jobDescription}
                onChange={(e) =>
                  setJobDescription(e.target.value)
                }
                placeholder="Paste the job description here..."
                className="h-[350px] resize-none overflow-y-auto border-rose-500/20 bg-black text-white"
              />

              <p className="mt-2 text-xs text-gray-500">
                {jobDescription.length} characters
              </p>
            </div>

            {/* Profile Section */}
            <div>
              <div className="mb-4 flex items-center gap-3">
                <Upload className="h-5 w-5 text-rose-500" />

                <h3 className="font-semibold">
                  Your Profile
                </h3>
              </div>

              {/* Upload Resume */}
              <div
                className="  h-[220px] cursor-pointer rounded-2xl border-2 border-dashed border-rose-500/20 p-8 text-center"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="mx-auto mb-3 h-10 w-10 text-rose-500" />

                <h3 className="font-semibold">
                  Upload Resume
                </h3>

                <p className="mt-1 text-sm text-zinc-500">
                  PDF or DOCX (Max 5MB)
                </p>

                {resumeFile && (
                  <div className="mt-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-emerald-400">
                          ✓ {resumeFile.name}
                        </p>

                        <p className="text-xs text-zinc-400">
                          {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>

                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={(e) => {
                          e.stopPropagation();

                          setResumeFile(null);

                          if (fileInputRef.current) {
                            fileInputRef.current.value = "";
                          }
                        }}
                      >
                        X
                      </Button>
                    </div>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={(e) => setResumeFile(e.target.files[0])}
                />
              </div>

              {/* Divider */}
              <div className="my-6 flex items-center">
                <div className="h-px flex-1 bg-zinc-800" />

                <span className="px-4 text-sm text-gray-500">
                  OR
                </span>

                <div className="h-px flex-1 bg-zinc-800" />
              </div>

              {/* Self Description */}
              <Textarea
                value={selfDescription}
                onChange={(e) =>
                  setSelfDescription(e.target.value)
                }
                placeholder="Describe your experience, projects, and skills..."
                className="h-[150px]  resize-none overflow-y-auto border-rose-500/20 bg-black text-white"
              />

              <div className="mt-4 rounded-xl border border-rose-500/20 bg-black/50 p-4">
                <p className="text-sm text-gray-400">
                  Uploading a resume and self-description is
                  required to generate a personalized report.
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-rose-500/20 p-8">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <p className="text-sm text-gray-400">
                AI Analysis • Interview Questions • Career Guidance
              </p>

              <Button
                disabled={generateReportsloading}
                onClick={generateReport}
                size="lg"
                className="bg-rose-500 hover:bg-rose-600"


              >
                {generateReportsloading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Interview Report
                  </>
                )}

              </Button>
            </div>
          </div>
        </div>

        {/* Recent Reports */}
        <div className="mt-6 flex items-center justify-between">
          <h2 className="text-3xl mt-2
   font-bold">
            Recent Reports
          </h2>


        </div>
        <div className="mt-12 flex gap-5 overflow-x-auto pb-4 hide-scrollbar">
          {interviewList?.map((report) => (
            <Card
              key={report._id}
              className="
    min-w-[320px]
    max-w-[320px]
    h-[220px]
    rounded-3xl
    border border-rose-500/20
    bg-zinc-950
    p-6
    flex-shrink-0
    transition-all
    hover:border-rose-500/40
    hover:-translate-y-1
  "
            >
              <div className=" p-0 flex h-full flex-col justify-between">

                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {report.title}
                  </h3>

                  <p className="mt-2 text-sm text-zinc-500">
                    {new Date(report.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="mt-auto space-y-4">

                  <div className="flex items-center justify-between">
                    <div className="rounded-xl bg-rose-500/10 px-4 py-2">
                      <p className="text-xs text-zinc-500">
                        Match Score
                      </p>

                      <p className="font-semibold text-rose-400">
                        {report.matchScore}%
                      </p>
                    </div>

                    <div className="flex gap-2">

                      <Button
                        size="sm"
                        className="bg-zinc-800 hover:bg-zinc-700"
                        onClick={() =>
                          navigate(`/interviewReport/${report._id}`)
                        }
                      >
                        View
                      </Button>

                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteReport(report._id)}
                      >
                        Delete
                      </Button>

                    </div>
                  </div>

                </div>
              </div>
            </Card>

          ))}
        </div>

      </section>
    </div>
  );
}