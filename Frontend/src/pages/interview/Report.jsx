import {
  Code2,
  MessageSquare,
  Map,
  Download,
  ChevronDown,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function InterviewPage() {
  const score = 82;
  const scoreText =
    score >= 85
      ? "Excellent match for this role"
      : score >= 70
      ? "Strong match for this role"
      : score >= 50
      ? "Moderate match — consider upskilling"
      : "Low match — focus on key skill gaps";
  return (
    <div className="h-screen bg-black text-white overflow-hidden">
      <div className="w-full h-full mx-auto max-w-7xl p-6">

        {/* Main Layout */}
        <div className="grid h-full overflow-hidden rounded-3xl border border-rose-500/20 bg-zinc-950 lg:grid-cols-[240px_1fr_280px]">

          {/* Sidebar */}
          <aside className="border-r border-rose-500/20 p-6 flex flex-col justify-between overflow-hidden">

            <div>
              <p className="mb-6 text-xs uppercase tracking-[0.3em] text-zinc-500">
                Sections
              </p>

              <div className="space-y-3">

                <button className="flex w-full items-center gap-3 rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-rose-400">
                  <span className="w-6 flex items-center justify-center">
                    <Code2 size={18} />
                  </span>
                  <span className="flex-1 text-left">Technical Questions</span>
                </button>

                <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-zinc-400 hover:bg-white/5">
                  <span className="w-6 flex items-center justify-center">
                    <MessageSquare size={18} />
                  </span>
                  <span className="flex-1 text-left">Behavioral Questions</span>
                </button>

                <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-zinc-400 hover:bg-white/5">
                  <span className="w-6 flex items-center justify-center">
                    <Map size={18} />
                  </span>
                  <span className="flex-1 text-left">Road Map</span>
                </button>

              </div>
            </div>

            <Button className="h-14 rounded-xl bg-rose-600 hover:bg-rose-700">
              <Download className="mr-2 h-4 w-4" />
              Download AI Resume
            </Button>

          </aside>

          {/* Content */}
          <main className="p-8 flex flex-col">

            <div className="mb-8 flex items-center justify-between">

              <div>
                <h2 className="text-4xl font-bold leading-none">
                  Technical
                  <br />
                  Questions
                </h2>
              </div>

              <div className="rounded-2xl border border-rose-500/20 px-5 py-3 bg-zinc-900">
                <span className="text-3xl font-bold">3</span>
                <p className="text-sm text-zinc-400">
                  questions
                </p>
              </div>

            </div>

            <div className="flex-1 overflow-auto">
              <Accordion
                type="single"
                collapsible
                className="space-y-4"
              >

              <AccordionItem
                value="q1"
                className="rounded-2xl border border-rose-500/20 bg-zinc-900 px-5"
              >
                <AccordionTrigger className="hover:no-underline">

                  <div className="flex items-start gap-4 text-left">

                    <span className="rounded-md bg-rose-500/10 px-2 py-1 text-xs font-semibold text-rose-400">
                      Q1
                    </span>

                    <span className="max-w-xl font-medium">
                      Can you explain how you optimized MongoDB queries
                      using aggregation pipelines and indexing?
                    </span>

                  </div>

                </AccordionTrigger>

                <AccordionContent>

                  <div className="pt-4 space-y-6">

                    <div>
                      <h4 className="mb-2 text-sm font-semibold text-rose-400">
                        Intention
                      </h4>

                      <p className="text-zinc-400">
                        Tests database optimization knowledge.
                      </p>
                    </div>

                    <div>
                      <h4 className="mb-2 text-sm font-semibold text-emerald-400">
                        Model Answer
                      </h4>

                      <p className="text-zinc-400">
                        Discuss compound indexes, aggregation stages,
                        explain plans, query profiling and performance monitoring.
                      </p>
                    </div>

                  </div>

                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="q2"
                className="rounded-2xl border border-rose-500/20 bg-zinc-900 px-5"
              >
                <AccordionTrigger className="hover:no-underline">

                  <div className="flex items-start gap-4">

                    <span className="rounded-md bg-rose-500/10 px-2 py-1 text-xs font-semibold text-rose-400">
                      Q2
                    </span>

                    <span>
                      Explain React reconciliation process.
                    </span>

                  </div>

                </AccordionTrigger>

                <AccordionContent>
                  <p className="text-zinc-400">
                    Answer content goes here...
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="q3"
                className="rounded-2xl border border-rose-500/20 bg-zinc-900 px-5"
              >
                <AccordionTrigger className="hover:no-underline">

                  <div className="flex items-start gap-4">

                    <span className="rounded-md bg-rose-500/10 px-2 py-1 text-xs font-semibold text-rose-400">
                      Q3
                    </span>

                    <span>
                      What are database transactions?
                    </span>

                  </div>

                </AccordionTrigger>

                <AccordionContent>
                  <p className="text-zinc-400">
                    Answer content goes here...
                  </p>
                </AccordionContent>
              </AccordionItem>

              </Accordion>
            </div>

          </main>

          {/* Right Sidebar */}
          <aside className="border-l border-rose-500/20 p-6 overflow-hidden">

            <p className="mb-6 text-xs uppercase tracking-[0.3em] text-zinc-500">
              Match Score
            </p>

            <Card className="border-rose-500/20 bg-zinc-900 p-8">

              <div className="flex justify-center">

                <div className="flex h-36 w-36 items-center justify-center rounded-full border-[8px] border-emerald-500">

                  <div className="text-center">
                    <div className="text-5xl font-bold">
                      {score}
                    </div>

                    <div className="text-zinc-400">
                      %
                    </div>
                  </div>

                </div>

              </div>

              <p className="mt-5 text-center text-emerald-400">{scoreText}</p>

            </Card>

                <div className="mt-8">

              <p className="mb-4 text-xs uppercase tracking-[0.3em] text-zinc-500">
                Skill Gaps
              </p>

              <div className="space-y-3">

                <div className="rounded-md border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs">
                  Relational Databases (SQL)
                </div>

                <div className="rounded-md border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs">
                  Python / Django
                </div>

                <div className="rounded-md border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs">
                  Docker / Kubernetes
                </div>

              </div>

            </div>

          </aside>

        </div>

      </div>
    </div>
  );
}