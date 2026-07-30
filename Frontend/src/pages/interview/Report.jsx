import React from 'react'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  Code2,
  MessageSquare,
  Map,
  Download,
  User,
  LogOut,
  Loader2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/checkAuth";

import { useInterview } from "@/hooks/checkinterview";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function Report() {
  const { id } = useParams();

  const {
    interview, getReportByIdloading, handleGetInterviewReportById, } = useInterview();

  const [activeTab, setActiveTab] =
    useState("technical");

  useEffect(() => {
    if (id) {
      handleGetInterviewReportById(id);
    }
  }, [id]);

  const navigate = useNavigate();
  const { user, handleLogout, logoutLoading } = useAuth();

  const LoggingOut = async () => {
    try {
      const response = await handleLogout();
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };



  if (!interview) {
    return (
      <div className="flex h-screen items-center justify-center bg-black text-white">
        Report Not Found
      </div>
    );
  }
 

  const techQuestions =
    interview?.technicalQuestions ?? [];

  const behavioralQuestions =
    interview?.behavioralQuestions ?? [];

  const skillGaps =
    interview?.skillGaps ?? [];

  const score =
    interview?.matchScore ?? 0;

  const scoreText =
    score >= 85
      ? "Excellent match for this role"
      : score >= 70
        ? "Strong match for this role"
        : score >= 50
          ? "Moderate match — consider upskilling"
          : "Low match — focus on key skill gaps";
  return (
    <div className="min-h-screen bg-[#060b14] text-white p-2">
      {/* Header (same as Dashboard) */}
      <div className="border-b border-rose-500/20">
        <div className="container mx-auto px-6   flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              Career<span className="text-rose-500">Forge</span> AI
            </h1>

            <p className="mt-1 text-gray-400">
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

      <div className="mx-auto mt-3 flex h-[88vh] max-w-7xl overflow-hidden rounded-3xl border border-slate-800 bg-black shadow-2xl">

        {/* LEFT SIDEBAR */}
        <aside className="flex w-64 flex-col justify-between border-r border-slate-800 bg-black p-6">

          <div>
            <p className="mb-6 text-xs uppercase tracking-[0.25em] text-zinc-500">
              Sections
            </p>

            <div className="space-y-3">

              <button
                onClick={() => setActiveTab("technical")}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 transition ${activeTab === "technical"
                  ? "border border-rose-500/20 bg-rose-500/10 text-rose-400"
                  : "text-zinc-400 hover:bg-zinc-900"
                  }`}
              >
                <Code2 size={18} />
                <span>Technical Questions</span>
              </button>

              <button
                onClick={() => setActiveTab("behavioral")}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 transition ${activeTab === "behavioral"
                  ? "border border-rose-500/20 bg-rose-500/10 text-rose-400"
                  : "text-zinc-400 hover:bg-zinc-900"
                  }`}
              >
                <MessageSquare size={18} />
                <span>Behavioral Questions</span>
              </button>

              <button
                onClick={() => setActiveTab("roadmap")}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 transition ${activeTab === "roadmap"
                  ? "border border-rose-500/20 bg-rose-500/10 text-rose-400"
                  : "text-zinc-400 hover:bg-zinc-900"
                  }`}
              >
                <Map size={18} />
                <span>Preparation Roadmap</span>
              </button>

            </div>
          </div>

          <Button className="bg-rose-600 hover:bg-rose-700">
            <Download className="mr-2 h-4 w-4" />
            Download Resume
          </Button>
        </aside>

        {/* CENTER CONTENT */}
        <main className="flex-1 bg-black p-8">
          <div className="flex flex-col h-full">
            <Card className="mb-6 border-slate-700 bg-[#111827] p-6">
  <div className="flex items-center justify-between">

    <div>
      <h1 className="text-3xl text-blue-500 font-bold">
        {interview?.title || "AI Interview Report"}
      </h1>

      <p className="mt-2 text-white">
        Personalized Interview Preparation Report
      </p>
    </div>

    <div className="flex gap-3">

      <Badge className="bg-rose-500 px-4 py-4 text-base font-semibold">
        {techQuestions.length} Technical
      </Badge>

      <Badge className="bg-rose-400 px-4 py-4 text-base font-semibold">
        {behavioralQuestions.length} Behavioral
      </Badge>

      <Badge className="bg-rose-300 px-4 py-4 text-base font-semibold">
        {skillGaps.length} Gaps
      </Badge>

    </div>

  </div>
</Card>

         
            {/* Scrollable content: keep header fixed and only this div scrolls */}
            <div className="mt-6 overflow-y-auto hide-scrollbar space-y-4 flex-1 pr-2">
              {/* TECHNICAL QUESTIONS (collapsible) */}
              {activeTab === "technical" && (
                <Accordion type="single" collapsible className="space-y-4">
                  {techQuestions.map((q, idx) => (
                    <Card key={idx} className="border border-slate-700 bg-[#172033]">
                      <AccordionItem value={`tech-${idx}`} className="border-none">
                        <AccordionTrigger className="px-5">
                          <div className="flex items-center gap-3 text-white text-left w-full">
                            <span className="rounded-md border border-pink-500/20 bg-pink-500/10 px-2 py-1 text-xs font-semibold text-pink-400">
                              Q{idx + 1}
                            </span>
                            <span className="flex-1">{q.question}</span>
                          </div>
                        </AccordionTrigger>

                        <AccordionContent className="px-5 pb-5">
                          <div className="mt-3 space-y-5">
                            <div>
                              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-violet-400">Intention</p>
                              <p className="text-slate-400">{q.intention}</p>
                            </div>

                            <div>
                              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-emerald-400">Model Answer</p>
                              <p className="text-slate-400">{q.answer}</p>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Card>
                  ))}
                </Accordion>
              )}

          {/* BEHAVIORAL QUESTIONS */}
          {activeTab === "behavioral" && (
            <Accordion
              type="single"
              collapsible
              className="space-y-4"
            >
              {behavioralQuestions.map((q, idx) => (
                <Card
                  key={idx}
                  className="border-rose-500/20 bg-zinc-900"
                >
                  <AccordionItem
                    value={`behavior-${idx}`}
                    className="border-none"
                  >
                    <AccordionTrigger className="px-5">
                      <div className="flex items-center gap-3 text-white text-left">
                        <span className="rounded-md border border-pink-500/20 bg-pink-500/10 px-2 py-1 text-xs font-semibold text-pink-400">
                          Q{idx + 1}
                        </span>

                        <span>{q.question}</span>
                      </div>
                    </AccordionTrigger>

                    <AccordionContent className="px-5 pb-5">
                      <div className="space-y-5">

                        <div>
                          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-violet-400">
                            Intention
                          </p>

                          <p className="text-zinc-400">
                            {q.intention}
                          </p>
                        </div>

                        <div>
                          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-emerald-400">
                            Model Answer
                          </p>

                          <p className="text-zinc-400">
                            {q.answer}
                          </p>
                        </div>

                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Card>
              ))}
            </Accordion>
          )}

          {/* ROADMAP */}
          {activeTab === "roadmap" && (
            <div className="relative pl-10">

              <div className="absolute left-3 top-0 bottom-0 w-px bg-rose-500/30" />

              {interview?.preparationPlan?.map((day) => (
                <div
                  key={day.day}
                  className="relative mb-8"
                >
                  <div className="absolute -left-8 top-2 h-4 w-4 rounded-full border-2 border-rose-500 bg-zinc-950" />

                  <Card className="border-rose-500/20 bg-zinc-900 p-5">

                    <Badge
                      variant="outline"
                      className="text-white bg-rose-500 border-rose-500/20"
                    >
                      Day {day.day}
                    </Badge>

                    <h3 className="mt- text-white text-lg font-semibold">
                      {day.focus}
                    </h3>

                    <ul className="mt-4 space-y-2">
                      {day.tasks.map((task, idx) => (
                        <li
                          key={idx}
                          className="flex gap-2 text-zinc-400"
                        >
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-zinc-500" />
                          {task}
                        </li>
                      ))}
                    </ul>

                  </Card>
                </div>
              ))}
            </div>
          )}
            </div>
          </div>
        </main>

        {/* RIGHT SIDEBAR */}
        <aside className="w-80 border-l border-slate-800 bg-black p-6">

          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-zinc-500">
            Match Score
          </p>

          <Card className="border-rose-500/20 bg-[#060b14] p-6">

            <div
              className="mx-auto flex h-36 w-36 items-center justify-center rounded-full"
              style={{
                background: `conic-gradient(
                        #22c55e ${score * 3.6}deg,
                                #1f2937 0deg
                                  )`,
              }}
            >
              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-[#111827]">
                <div className="text-center text-white">
                  <div className="text-5xl font-bold">
                    {score}
                  </div>

                  <div className="text-slate-400">
                    %
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-4 text-center text-emerald-400">
              {scoreText}
            </p>

          </Card>

          <div className="mt-8">

            <p className="mb-4 text-xs uppercase tracking-[0.25em] text-zinc-500">
              Skill Gaps
            </p>

            <div className="space-y-3">
              {skillGaps.map((gap, idx) => (
                <div
                  key={idx}
                  className={`
      rounded-lg border p-3 text-sm font-medium
      ${gap.severity === "high"
                      ? "border-red-500/20 bg-red-500/10 text-red-300"
                      : gap.severity === "medium"
                        ? "border-yellow-500/20 bg-yellow-500/10 text-yellow-300"
                        : "border-green-500/20 bg-green-500/10 text-green-300"
                    }
      `}
                >
                  {gap.skill}
                </div>
              ))}
            </div>

          </div>

        </aside>

      </div>
    </div>
  )
}

export default Report