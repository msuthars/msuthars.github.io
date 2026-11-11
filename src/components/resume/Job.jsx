import BulletList, { itemClass, listClass } from "./BulletList.jsx";

export const subsectionTitle = "m-0 text-[13px] font-bold text-black print:break-after-avoid";

export default function Job({ job }) {
  return (
    <div className="flex flex-col gap-2.5 mb-5 last:mb-0">
      <div className="flex flex-col gap-0.5 print:break-inside-avoid print:break-after-avoid">
        <span className="text-[13px] text-black">{job.dates}</span>
        <h3 className="m-0 text-[13px] font-bold text-black">{job.title}</h3>
      </div>

      <BulletList items={job.duties} />

      {job.projects && (
        <>
          <h4 className={subsectionTitle}>Key Projects</h4>
          <ul className={listClass}>
            {job.projects.map(([project, description]) => (
              <li key={project} className={itemClass}><strong>{project}</strong> {description}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
