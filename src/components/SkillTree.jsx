import { skillInfo, skillTree } from "../data.js";
import SectionHeading, { sectionClass } from "./SectionHeading.jsx";

export default function SkillTree({ active, openDetail }) {
  function showSkill(key) {
    const data = skillInfo[key];
    if (!data) return;
    openDetail(data[0], data[1], (
      <>
        <p><strong>{data[1]}</strong></p>
        <p>{data[3]}</p>
        <p><strong>Current level:</strong> {data[2]}</p>
      </>
    ));
  }

  return (
    <section id="skills" className={sectionClass(active)}>
      <SectionHeading
        eyebrow="ABILITY SYSTEM / 003"
        title="SKILL TREE"
        intro="Unlocked abilities and technologies currently being developed."
      />

      <div className="skill-tree">
        <div className="skill-root">WEB<br />DEVELOPMENT</div>
        <div className="tree-line vertical"></div>
        <div className="skill-columns">
          {skillTree.map(([branch, nodes]) => (
            <div className="skill-branch" key={branch}>
              <div className="branch-title">{branch}</div>
              <div className="tree-line"></div>
              {nodes.map(([key, label, level, learning]) => (
                <button
                  key={key}
                  className={`skill-node ${learning ? "learning" : "unlocked"}`}
                  onClick={() => showSkill(key)}
                >
                  <b>{label}</b><small>LVL {level}</small>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
