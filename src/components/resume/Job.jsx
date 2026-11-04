import BulletList from "./BulletList.jsx";

export default function Job({ job }) {
  return (
    <div className="job">
      <div className="job-header">
        <span className="job-date">{job.dates}</span>
        <h3 className="job-title">{job.title}</h3>
      </div>

      <BulletList items={job.duties} />

      {job.projects && (
        <>
          <h4 className="subsection-title">Key Projects</h4>
          <ul className="main-list">
            {job.projects.map(([project, description]) => (
              <li key={project}><strong>{project}</strong> {description}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
