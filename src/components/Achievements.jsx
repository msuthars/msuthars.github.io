import { achievements } from "../data.js";
import SectionHeading, { sectionClass } from "./SectionHeading.jsx";

export default function Achievements({ active }) {
  return (
    <section id="achievements" className={sectionClass(active)}>
      <SectionHeading
        eyebrow="MILESTONES / 006"
        title="ACHIEVEMENTS"
        intro="Milestones earned throughout the journey."
      />

      <div className="grid grid-cols-2 gap-3 mobile:grid-cols-1">
        {achievements.map(([unlocked, label, title, description]) => (
          <article
            key={title}
            className={`flex gap-[18px] items-center p-[22px] border border-line rounded-panel bg-panel ${unlocked ? "" : "opacity-45"}`}
          >
            <div
              className={`w-12 h-12 flex-[0_0_48px] grid place-items-center border font-mono text-[16px] leading-[normal] ${
                unlocked ? "border-accent-line text-accent" : "border-line text-muted"
              }`}
            >
              {unlocked ? "◆" : "?"}
            </div>
            <div>
              <small className="text-accent font-mono text-2xs tracking-[1px]">{label}</small>
              <h2 className="my-[5px] text-[13px]">{title}</h2>
              <p className="m-0 text-muted text-[11px] leading-[1.5]">{description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
