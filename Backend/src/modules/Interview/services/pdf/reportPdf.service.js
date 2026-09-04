import puppeteer from "puppeteer";

export async function generateInterviewReportPdf(report) {
  const browser = await puppeteer.launch({
    headless: true,
  });

  try {
    const page = await browser.newPage();

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <title>${escapeHtml(report.title)}</title>

          <style>
            * {
              box-sizing: border-box;
            }

            @page {
              size: A4;
              margin: 0;
            }

            body {
              margin: 0;
              padding: 40px;

              font-family: Arial, Helvetica, sans-serif;

              background: #050810;
              color: #f4f4f5;

              line-height: 1.5;
              font-size: 13px;
            }

            h1,
            h2,
            h3 {
              margin-top: 0;
            }

            /* =========================
               HEADER
            ========================= */

            .header {
              padding: 28px;
              margin-bottom: 30px;

              background: #111827;

              border: 1px solid #1e293b;
              border-radius: 18px;
            }

            .brand {
              margin-bottom: 18px;

              color: #f4f4f5;

              font-size: 14px;
              font-weight: 700;
              letter-spacing: 0.08em;
            }

            .brand span {
              color: #f43f5e;
            }

            .header h1 {
              max-width: 75%;

              margin-bottom: 10px;

              color: #3b82f6;

              font-size: 28px;
              line-height: 1.15;
            }

            .subtitle {
              color: #a1a1aa;
              font-size: 13px;
            }

            /* =========================
               MATCH SCORE
            ========================= */

            .score-container {
              display: inline-block;

              margin-top: 22px;
              padding: 12px 20px;

              background: #020617;

              border: 1px solid #1e293b;
              border-radius: 12px;
            }

            .score-label {
              color: #71717a;

              font-size: 10px;
              letter-spacing: 0.2em;
              text-transform: uppercase;
            }

            .score {
              margin-top: 2px;

              color: #22c55e;

              font-size: 26px;
              font-weight: 700;
            }

            /* =========================
               SECTIONS
            ========================= */

            .section {
              margin-bottom: 32px;
            }

            .section-title {
              margin-bottom: 16px;
              padding-bottom: 9px;

              color: #f4f4f5;

              border-bottom: 1px solid #1e293b;

              font-size: 18px;
              font-weight: 700;
              letter-spacing: 0.08em;
              text-transform: uppercase;
            }

            /* =========================
               QUESTIONS
            ========================= */

            .question {
              margin-bottom: 16px;
              padding: 17px;

              background: #111827;

              border: 1px solid #263449;
              border-radius: 12px;

              page-break-inside: avoid;
              break-inside: avoid;
            }

            .question-number {
              display: inline-block;

              margin-bottom: 8px;
              padding: 3px 8px;

              background: rgba(244, 63, 94, 0.1);

              border: 1px solid rgba(244, 63, 94, 0.25);
              border-radius: 6px;

              color: #fb7185;

              font-size: 10px;
              font-weight: 700;
            }

            .question-text {
              margin-bottom: 9px;

              color: #f4f4f5;

              font-size: 13px;
              font-weight: 600;
            }

            .intention {
              margin-bottom: 10px;

              color: #a1a1aa;

              font-size: 11px;
            }

            .intention strong {
              color: #d4d4d8;
            }

            /* =========================
               PREPARATION GUIDE
            ========================= */

            .answer {
              padding: 11px 13px;

              background: #020617;

              border-left: 3px solid #3b82f6;
              border-radius: 6px;

              color: #d4d4d8;

              font-size: 11px;
            }

            .answer strong {
              color: #60a5fa;
            }

            /* =========================
               SKILL GAPS
            ========================= */

            .skill {
              margin-bottom: 10px;
              padding: 13px 15px;

              background: #111827;

              border: 1px solid #263449;
              border-radius: 10px;

              page-break-inside: avoid;
              break-inside: avoid;
            }

            .skill strong {
              color: #f4f4f5;
            }

            .severity {
              margin-top: 4px;

              color: #facc15;

              font-size: 9px;
              font-weight: 700;

              letter-spacing: 0.12em;
              text-transform: uppercase;
            }

            /* =========================
               ROADMAP
            ========================= */

            .day {
              margin-bottom: 12px;
              padding: 15px;

              background: #111827;

              border: 1px solid #263449;
              border-radius: 10px;

              page-break-inside: avoid;
              break-inside: avoid;
            }

            .day-title {
              color: #60a5fa;

              font-size: 13px;
              font-weight: 700;
            }

            ul {
              margin-top: 8px;
              padding-left: 20px;
            }

            li {
              margin-bottom: 4px;

              color: #d4d4d8;

              font-size: 11px;
            }

            /* =========================
               FOOTER
            ========================= */

            .footer {
              margin-top: 30px;
              padding-top: 15px;

              border-top: 1px solid #1e293b;

              color: #52525b;

              font-size: 9px;
              text-align: center;
            }
          </style>
        </head>

        <body>

          <!-- HEADER -->

          <div class="header">

            <div class="brand">
              Career<span>Forge</span> AI
            </div>

            <h1>
              ${escapeHtml(report.title)}
            </h1>

            <div class="subtitle">
              Personalized Interview Preparation Report
            </div>

            <div class="score-container">

              <div class="score-label">
                Match Score
              </div>

              <div class="score">
                ${report.matchScore}%
              </div>

            </div>

          </div>


          <!-- TECHNICAL QUESTIONS -->

          <div class="section">

            <h2 class="section-title">
              Technical Questions
            </h2>

            ${report.technicalQuestions
              .map(
                (q, index) => `
                  <div class="question">

                    <div class="question-number">
                      Question ${index + 1}
                    </div>

                    <div class="question-text">
                      ${escapeHtml(q.question)}
                    </div>

                    <div class="intention">
                      <strong>What it tests:</strong>
                      ${escapeHtml(q.intention)}
                    </div>

                    <div class="answer">
                      <strong>Preparation Guide:</strong><br />
                      ${escapeHtml(q.answer)}
                    </div>

                  </div>
                `,
              )
              .join("")}

          </div>


          <!-- BEHAVIORAL QUESTIONS -->

          <div class="section">

            <h2 class="section-title">
              Behavioral Questions
            </h2>

            ${report.behavioralQuestions
              .map(
                (q, index) => `
                  <div class="question">

                    <div class="question-number">
                      Question ${index + 1}
                    </div>

                    <div class="question-text">
                      ${escapeHtml(q.question)}
                    </div>

                    <div class="intention">
                      <strong>What it tests:</strong>
                      ${escapeHtml(q.intention)}
                    </div>

                    <div class="answer">
                      <strong>Preparation Guide:</strong><br />
                      ${escapeHtml(q.answer)}
                    </div>

                  </div>
                `,
              )
              .join("")}

          </div>


          <!-- SKILL GAPS -->

          <div class="section">

            <h2 class="section-title">
              Skill Gaps
            </h2>

            ${report.skillGaps
              .map(
                (gap) => `
                  <div class="skill">

                    <strong>
                      ${escapeHtml(gap.skill)}
                    </strong>

                    <div class="severity">
                      ${escapeHtml(gap.severity)}
                    </div>

                  </div>
                `,
              )
              .join("")}

          </div>


          <!-- PREPARATION ROADMAP -->

          <div class="section">

            <h2 class="section-title">
              Preparation Roadmap
            </h2>

            ${report.preparationPlan
              .map(
                (day) => `
                  <div class="day">

                    <div class="day-title">
                      Day ${day.day} —
                      ${escapeHtml(day.focus)}
                    </div>

                    <ul>
                      ${day.tasks
                        .map(
                          (task) =>
                            `<li>${escapeHtml(task)}</li>`,
                        )
                        .join("")}
                    </ul>

                  </div>
                `,
              )
              .join("")}

          </div>


          <div class="footer">
            Generated by CareerForge AI
          </div>

        </body>
      </html>
    `;

    await page.setContent(html, {
      waitUntil: "networkidle0",
    });

    return await page.pdf({
      format: "A4",

      printBackground: true,

      margin: {
        top: "15mm",
        right: "15mm",
        bottom: "15mm",
        left: "15mm",
      },

      displayHeaderFooter: true,

      footerTemplate: `
        <div style="
          width: 100%;
          text-align: center;
          font-size: 9px;
          color: #71717a;
        ">
          CareerForge AI — Page
          <span class="pageNumber"></span>
          of
          <span class="totalPages"></span>
        </div>
      `,

      headerTemplate: `<div></div>`,
    });
  } finally {
    await browser.close();
  }
}

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}