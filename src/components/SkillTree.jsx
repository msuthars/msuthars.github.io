import { skillInfo, skillTree } from "../data.js";
import SectionHeading, { sectionClass } from "./SectionHeading.jsx";
import SkillDetail from "./SkillDetail.jsx";

/* Skills still being learned get a blue border that stays on hover */
function skillNode(learning) {
  return [
    "w-full flex justify-between items-center mb-2.5 p-[15px] border rounded-[9px] bg-[rgba(255,255,255,.025)]",
    "cursor-pointer text-left transition-all hover:-translate-y-[2px]",
    learning ? "border-[rgba(99,179,255,.2)]" : "border-line hover:border-accent-line"
  ].join(" ");
}

export default function SkillTree({ active, openDetail }) {
  function showSkill(key) {
    const data = skillInfo[key];
    if (!data) return;
    openDetail(data[0], data[1], <SkillDetail skill={data} />);
  }

  return (
    <section id="skills" className={sectionClass(active)}>
      <SectionHeading
        eyebrow="ABILITY SYSTEM / 003"
        title="SKILL TREE"
        intro="Unlocked abilities and technologies currently being developed."
      />

      <div className="relative pt-8.75 px-5 pb-11.25 border border-line rounded-panel bg-skill-tree">
        <div className="w-37.5 mx-auto p-4.25 border border-accent-line bg-accent-soft text-accent text-center font-mono text-[11px] leading-normal tracking-[1px]">
          WEB<br />DEVELOPMENT
        </div>
        <div className="w-px h-8.75 mx-auto bg-accent-line"></div>
        <div className="grid grid-cols-4 gap-7 tablet:grid-cols-2 tablet:gap-[30px] mobile:grid-cols-1">
          {skillTree.map(([branch, nodes]) => (
            <div className="relative text-center" key={branch}>
              <div className="mb-4 text-muted font-mono text-2xs tracking-[1px]">{branch}</div>
              <div className="h-px w-[70%] mx-auto mb-4.5 bg-line-strong"></div>
              {nodes.map(([key, label, level, learning]) => (
                <button key={key} className={skillNode(learning)} onClick={() => showSkill(key)}>
                  <b className="font-mono text-2xs font-normal">{label}</b>
                  <small className={`font-mono text-2xs ${learning ? "text-blue" : "text-accent"}`}>LVL {level}</small>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
