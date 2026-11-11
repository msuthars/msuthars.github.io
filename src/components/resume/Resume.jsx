import BulletList from "./BulletList.jsx";
import Job, { subsectionTitle } from "./Job.jsx";
import MainSection from "./MainSection.jsx";
import ResumeSidebar from "./ResumeSidebar.jsx";
import { activities, certifications, jobs, languages, name, skills, summary } from "./resumeData.js";
import "./resume.css";

const header = "h-[106px] flex items-center px-[30px] bg-header mobile:px-5 mobile:justify-center mobile:text-center";

export default function Resume() {
  return (
    <section id="section-resume" className="flex justify-center py-10 px-5 print:p-0">
      <div className="w-full max-w-200 flex flex-row overflow-hidden bg-white shadow-sheet mobile:flex-col print:max-w-none print:bg-transparent print:shadow-none">
        {/* Coloured block in the top-left corner, matching the header */}
        <div>
          <header className={header}></header>
        </div>

        <ResumeSidebar />

        <main className="flex-1 flex flex-col">
          <header className={header}>
            <h1 className="m-0 text-[26px] font-bold text-black tracking-[1px]">{name}</h1>
          </header>

          {/* Top/bottom padding repeats on every printed page */}
          <div className="flex flex-col gap-7.5 p-7.5 mobile:p-5 print:py-10 print:box-decoration-clone">
            <MainSection title="PROFESSIONAL SUMMARY">
              <BulletList items={summary} />
            </MainSection>

            <MainSection title="SKILLS">
              <div className="flex gap-15 mobile:flex-col mobile:gap-2.5">
                {skills.map(column => <BulletList key={column[0]} items={column} />)}
              </div>
            </MainSection>

            <MainSection title="CERTIFICATIONS">
              {certifications.map(item => <p key={item} className="m-0 text-[13px] leading-normal text-black">{item}</p>)}
            </MainSection>

            <MainSection title="WORK HISTORY">
              {jobs.map(job => <Job key={job.title} job={job} />)}
            </MainSection>

            <MainSection title="ACTIVITIES">
              <BulletList items={activities} />
            </MainSection>

            <MainSection title="OTHER">
              <div className="flex flex-col gap-2.5">
                <h3 className={subsectionTitle}>Language</h3>
                <BulletList items={languages} />
              </div>
            </MainSection>
          </div>
        </main>
      </div>
    </section>
  );
}
