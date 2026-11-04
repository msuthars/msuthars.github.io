import BulletList from "./BulletList.jsx";
import Job from "./Job.jsx";
import MainSection from "./MainSection.jsx";
import ResumeSidebar from "./ResumeSidebar.jsx";
import { activities, certifications, jobs, languages, name, skills, summary } from "./resumeData.js";
import "./resume.css";

export default function Resume() {
  return (
    <section id="section-resume">
      <div className="resume-container">
        {/* Coloured block in the top-left corner, matching the header */}
        <div className="left-sidebar">
          <header className="main-header"></header>
        </div>

        <ResumeSidebar />

        <main className="main-content">
          <header className="main-header">
            <h1 className="name">{name}</h1>
          </header>

          <div className="content-body">
            <MainSection title="PROFESSIONAL SUMMARY">
              <BulletList items={summary} />
            </MainSection>

            <MainSection title="SKILLS">
              <div className="skills-grid">
                {skills.map(column => <BulletList key={column[0]} items={column} />)}
              </div>
            </MainSection>

            <MainSection title="CERTIFICATIONS">
              {certifications.map(item => <p key={item} className="main-text">{item}</p>)}
            </MainSection>

            <MainSection title="WORK HISTORY">
              {jobs.map(job => <Job key={job.title} job={job} />)}
            </MainSection>

            <MainSection title="ACTIVITIES">
              <BulletList items={activities} />
            </MainSection>

            <MainSection title="OTHER">
              <div className="other-subsection">
                <h3 className="subsection-title">Language</h3>
                <BulletList items={languages} />
              </div>
            </MainSection>
          </div>
        </main>
      </div>
    </section>
  );
}
