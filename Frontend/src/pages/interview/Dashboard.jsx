import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  Upload,
  Sparkles,
  History,
  User,
  LogOut,
  Loader2,
} from "lucide-react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "../../hooks/checkAuth";

export default function Dashboard() {
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");

  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const { user, handleLogout, logoutLoading } = useAuth();
  const LoggingOut = async () => {
    try {
      const response = await handleLogout();
      toast.success(response.message);
      navigate("/login");

    } catch (error) {
      console.log("Full Error:", error);
      toast.error(
        error.response?.data?.message ||
        "Something went wrong while logging out"
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
                <Button variant="ghost" onClick={() => navigate("/profile")}>
                  <User className=" h-4 w-4" />
                  Profile
                </Button>

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
                className="min-h-[350px] border-rose-500/20 bg-black text-white"
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
                className="cursor-pointer rounded-2xl border-2 border-dashed border-rose-500/30 p-10 text-center transition hover:border-rose-500"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="mx-auto mb-4 h-10 w-10 text-rose-500" />

                <h4 className="font-medium">
                  Upload Resume
                </h4>

                <p className="mt-2 text-sm text-gray-400">
                  PDF or DOCX (Max 5MB)
                </p>

                <input
                  ref={fileInputRef}
                  type="file"
                  hidden
                  accept=".pdf,.doc,.docx"
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
                className="min-h-[150px] border-rose-500/20 bg-black text-white"
              />

              <div className="mt-4 rounded-xl border border-rose-500/20 bg-black/50 p-4">
                <p className="text-sm text-gray-400">
                  Either a resume upload or self-description is
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
                size="lg"
                className="bg-rose-500 hover:bg-rose-600"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Interview Report
              </Button>
            </div>
          </div>
        </div>

        {/* Recent Reports */}
        <div className="mt-14">
          <div className="mb-6 flex items-center gap-3">
            <History className="h-6 w-6 text-rose-500" />

            <h2 className="text-3xl font-bold">
              Recent Reports
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            <div className="rounded-2xl border border-rose-500/20 bg-zinc-950 p-6">
              <h3 className="font-semibold">
                MERN Stack Developer
              </h3>

              <p className="mt-2 text-sm text-gray-400">
                Generated 2 days ago
              </p>

              <div className="mt-4 inline-flex rounded-full bg-rose-500/10 px-3 py-1 text-sm text-rose-400">
                Score: 82%
              </div>
            </div>

            <div className="rounded-2xl border border-rose-500/20 bg-zinc-950 p-6">
              <h3 className="font-semibold">
                Frontend Engineer
              </h3>

              <p className="mt-2 text-sm text-gray-400">
                Generated 5 days ago
              </p>

              <div className="mt-4 inline-flex rounded-full bg-rose-500/10 px-3 py-1 text-sm text-rose-400">
                Score: 76%
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}