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

      <div className="achievement-grid">
        {achievements.map(([unlocked, label, title, description]) => (
          <article key={title} className={`achievement ${unlocked ? "unlocked" : "locked"}`}>
            <div className="achievement-icon">{unlocked ? "◆" : "?"}</div>
            <div><small>{label}</small><h2>{title}</h2><p>{description}</p></div>
          </article>
        ))}
      </div>
    </section>
  );
}
