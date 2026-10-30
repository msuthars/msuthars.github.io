import { useState } from "react";
import { questEyebrow, questFilters, quests } from "../data.js";
import QuestDetail from "./QuestDetail.jsx";
import SectionHeading, { sectionClass } from "./SectionHeading.jsx";

export default function Quests({ active, openDetail }) {
  const [filter, setFilter] = useState("all");
  const visible = quests.filter(quest => filter === "all" || quest.guild === filter);

  return (
    <section id="quests" className={sectionClass(active)}>
      <SectionHeading
        eyebrow="MISSIONS / 002"
        title="QUEST LOG"
        intro="Projects I've worked on, presented as completed and active missions."
      >
        <div className="section-counter">{String(visible.length).padStart(2, "0")} QUESTS</div>
      </SectionHeading>

      <div className="quest-filters">
        {questFilters.map(([key, label]) => (
          <button key={key} className={filter === key ? "active" : undefined} onClick={() => setFilter(key)}>
            {label}
          </button>
        ))}
      </div>

      <div className="quest-list">
        {visible.map(quest => (
          <button
            key={quest.id}
            className={`quest-card ${quest.active ? "active-quest" : "complete"}`}
            onClick={() => openDetail(quest.title, questEyebrow(quest), <QuestDetail quest={quest} />)}
          >
            <div className="quest-icon">{quest.active ? "◉" : "✓"}</div>
            <div className="quest-body">
              <span className="quest-type">{questEyebrow(quest)}</span>
              <h2>{quest.title}</h2>
              <p>{quest.summary}</p>
              <div className="tags">{quest.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
            </div>
            <div className="quest-reward"><small>REWARD</small><strong>+{quest.reward} XP</strong></div>
          </button>
        ))}
      </div>
    </section>
  );
}
