import { useState } from "react";
import { questEyebrow, questFilters, quests } from "../data.js";
import QuestDetail from "./QuestDetail.jsx";
import SectionHeading, { sectionClass } from "./SectionHeading.jsx";
import { chip, headingStatus } from "./ui.jsx";

function filterButton(active) {
  return [
    "py-2 px-3 border font-mono text-2xs tracking-[1px] cursor-pointer transition-all",
    active
      ? "border-accent-line bg-accent-soft text-accent"
      : "border-line bg-transparent text-muted hover:border-line-strong hover:text-ink"
  ].join(" ");
}

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
        <div className={`${headingStatus} py-2.25 px-2.75 text-muted`}>{String(visible.length).padStart(2, "0")} QUESTS</div>
      </SectionHeading>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {questFilters.map(([key, label]) => (
          <button key={key} className={filterButton(filter === key)} onClick={() => setFilter(key)}>
            {label}
          </button>
        ))}
      </div>

      <div className="grid gap-3">
        {visible.map(quest => (
          <button
            key={quest.id}
            className="w-full grid grid-cols-[48px_minmax(0,1fr)_110px] gap-4.5 items-center p-5 border border-line rounded-panel bg-panel text-left cursor-pointer transition-all duration-250 hover:border-accent-line hover:translate-x-1.25 hover:bg-[rgba(140,255,59,.035)] mobile:grid-cols-[38px_minmax(0,1fr)]"
            onClick={() => openDetail(quest.title, questEyebrow(quest), <QuestDetail quest={quest} />)}
          >
            <div
              className={`w-10 h-10 grid place-items-center border font-mono text-[14px] leading-[normal] ${
                quest.active ? "border-[rgba(99,179,255,.3)] text-blue" : "border-[rgba(140,255,59,.25)] text-accent"
              }`}
            >
              {quest.active ? "◉" : "✓"}
            </div>
            <div>
              <span className="text-muted-2 font-mono text-2xs tracking-[1px]">{questEyebrow(quest)}</span>
              <h2 className="my-1.5 text-[16px] tracking-[-.4px]">{quest.title}</h2>
              <p className="mb-3 text-muted text-[12px] leading-normal">{quest.summary}</p>
              <div className="flex flex-wrap gap-1.5">{quest.tags.map(tag => <span key={tag} className={chip}>{tag}</span>)}</div>
            </div>
            <div className="pl-4.5 border-l border-line text-right mobile:col-2 mobile:pt-2.5 mobile:pl-0 mobile:border-l-0 mobile:border-t mobile:text-left">
              <small className="block text-muted-2 font-mono text-2xs">REWARD</small>
              <strong className="block mt-1.25 text-accent font-mono text-2xs font-normal">+{quest.reward} XP</strong>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
