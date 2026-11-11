import { eyebrow } from "./ui.jsx";

export default function SectionHeading({ eyebrow: label, title, intro, children }) {
  return (
    <div className="flex justify-between items-end gap-5 mb-7.5 mobile:flex-col mobile:items-start">
      <div>
        <span className={eyebrow}>{label}</span>
        <h1 className="mt-2 mb-1.75 text-[clamp(30px,4vw,46px)] leading-[.95] tracking-[-2px] phone:text-[34px]">{title}</h1>
        <p className="m-0 max-w-162.5 text-muted text-[13px] leading-[1.6]">{intro}</p>
      </div>
      {children}
    </div>
  );
}

/* Only the active section is shown */
export function sectionClass(active) {
  return active ? "block animate-section-in" : "hidden";
}
