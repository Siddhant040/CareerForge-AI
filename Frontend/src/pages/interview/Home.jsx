
      import { Button } from "@/components/ui/button";
      import { FileText, Brain, Briefcase, ArrowRight } from "lucide-react";
      import { useNavigate } from "react-router-dom";
      import { useContext } from "react";
      import { AuthContext } from "../../contexts/auth.context";

      export default function HomePage() {
        const navigate = useNavigate();
        const { user } = useContext(AuthContext);

        const handleStartFree = () => {
          if (user) {
            navigate("/home");
          } else {
            navigate("/login");
          }
        };

        return (
          <div className="min-h-screen bg-black text-white">
            {/* Navbar */}
            <nav className="border-b border-rose-500/20">
              <div className="container mx-auto flex items-center justify-between px-6 py-5">
                <h1 className="text-2xl font-bold">
                  Career<span className="text-rose-500">Forge</span> AI
                </h1>

                <div className="flex gap-4">
                  <Button onClick={() => navigate("/login")} variant="ghost">
                    Login
                  </Button>
                  <Button onClick={() => navigate("/register")} className="bg-rose-500 hover:bg-rose-600">
                    Get Started
                  </Button>
                </div>
              </div>
            </nav>

            {/* Hero Section */}
            <section className="container mx-auto px-6 py-24 text-center">
              <div className="mx-auto max-w-4xl">
                <div className="mb-6 inline-flex rounded-full border border-rose-500/30 px-4 py-2 text-sm text-rose-400">
                  AI Powered Career Growth Platform
                </div>

                <h1 className="mb-6 text-5xl font-bold leading-tight md:text-7xl">
                  Turn Your Resume Into
                  <span className="block text-rose-500">Interview Opportunities</span>
                </h1>

                <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-400">
                  Upload your resume, get AI-powered feedback, improve ATS score, match job descriptions,
                  and prepare for interviews with confidence.
                </p>

                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                  <Button size="lg" className="bg-rose-500 hover:bg-rose-600">
                    Analyze Resume
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>

                  <Button size="lg" variant="outline">
                    View Features
                  </Button>
                </div>
              </div>
            </section>

            {/* Features */}
            <section className="container mx-auto px-6 py-20">
              <div className="grid gap-8 md:grid-cols-3">
                <div className="rounded-2xl border border-rose-500/20 bg-zinc-950 p-8">
                  <FileText className="mb-4 h-10 w-10 text-rose-500" />
                  <h3 className="mb-3 text-xl font-semibold">Resume Analysis</h3>
                  <p className="text-gray-400">Get detailed AI feedback on structure, content, readability, and ATS optimization.</p>
                </div>

                <div className="rounded-2xl border border-rose-500/20 bg-zinc-950 p-8">
                  <Brain className="mb-4 h-10 w-10 text-rose-500" />
                  <h3 className="mb-3 text-xl font-semibold">AI Suggestions</h3>
                  <p className="text-gray-400">Improve summaries, projects, achievements, and professional experience automatically.</p>
                </div>

                <div className="rounded-2xl border border-rose-500/20 bg-zinc-950 p-8">
                  <Briefcase className="mb-4 h-10 w-10 text-rose-500" />
                  <h3 className="mb-3 text-xl font-semibold">Job Matching</h3>
                  <p className="text-gray-400">Compare resumes against job descriptions and identify missing skills instantly.</p>
                </div>
              </div>
            </section>

            {/* CTA */}
            <section className="container mx-auto px-6 py-24">
              <div className="rounded-3xl border border-rose-500/20 bg-zinc-950 p-12 text-center">
                <h2 className="mb-4 text-4xl font-bold">Ready to Build Your Career?</h2>

                <p className="mb-8 text-gray-400">Join thousands of job seekers improving their resumes with AI.</p>

                <Button size="lg" className="bg-rose-500 hover:bg-rose-600" onClick={handleStartFree}>
                  Start Free
                </Button>
              </div>
            </section>
          </div>
        );
      }
