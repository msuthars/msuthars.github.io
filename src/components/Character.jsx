import { useEffect, useState } from "react";
import { Link } from "react-router";
import { profile, quickTags, stats, openToWork, sectionPath } from "../data.js";
import { avatar } from "./avatar.js";
import SectionHeading, { sectionClass } from "./SectionHeading.jsx";
import { chip, eyebrow, openToWork as openToWorkPill, panel, statusDot } from "./ui.jsx";

const fieldLabel = "block mb-[7px] text-muted-2 font-mono text-2xs";
const panelTitle = "flex justify-between pb-4 border-b border-line text-muted font-mono text-2xs tracking-[1px]";
const orbit = "absolute border border-[rgba(140,255,59,.12)] rounded-full";

function Stat({ label, value, index, started }) {
  const [width, setWidth] = useState(0);

  /* Bars fill once the game has started (they're hidden behind the boot screen until then) */
  useEffect(() => {
    if (!started) return;
    const timer = setTimeout(() => setWidth(value), 120 + index * 80);
    return () => clearTimeout(timer);
  }, [value, index, started]);

  return (
    <div>
      <div className="flex justify-between mb-1.75 font-mono text-2xs"><span>{label}</span><b className="text-accent font-normal">{value}</b></div>
      <div className="h-0.75 bg-[#1b222b] overflow-hidden">
        <i
          className="block h-full bg-accent shadow-[0_0_12px_rgba(140,255,59,.35)]"
          style={{ width: `${width}%`, transition: "width 1s cubic-bezier(.2,.8,.2,1)" }}
        ></i>
      </div>
    </div>
  );
}

export default function Character({ active, started }) {
  return (
    <section id="character" className={sectionClass(active)}>
      <SectionHeading
        eyebrow="PLAYER PROFILE / 001"
        title="CHARACTER"
        intro="Full stack Drupal developer building long-running client platforms since Drupal 6."
      >
      { openToWork == true &&
        <Link className={`${openToWorkPill} hover:border-line-strong mobile:self-start`} to={sectionPath("contact")}><span className={statusDot}></span> OPEN TO WORK</Link>
      }
      </SectionHeading>

      <div className="grid grid-cols-[minmax(280px,.8fr)_minmax(360px,1.2fr)] gap-3.5 mobile:grid-cols-1">
        <article className={`${panel} overflow-hidden`}>
          {/* --avatar drives the stage, ring and orbits so they scale together */}
          <div className="relative [--avatar:clamp(110px,34vw,160px)] min-h-[calc(var(--avatar)*2.25)] grid place-items-center overflow-hidden bg-stage">
            <div className="absolute inset-x-0 top-1/2 h-px bg-accent-line shadow-[0_0_20px_var(--color-accent)] opacity-25"></div>
            <div className="relative z-2 w-(--avatar) h-(--avatar) grid place-items-center border border-[rgba(140,255,59,.5)] rounded-full bg-avatar text-accent font-mono font-extrabold text-[40px] leading-[normal] shadow-[0_0_80px_rgba(140,255,59,.08)] phone:text-[30px]">
              <div className="absolute inset-[calc(var(--avatar)*-0.11)] border border-dashed border-[rgba(140,255,59,.28)] rounded-full animate-orbit-spin"></div>
              <img src={avatar} alt="Manish Kumar" className="w-full h-auto aspect-square object-cover rounded-full" />
            </div>
            <div className={`${orbit} w-[calc(var(--avatar)*1.8)] h-[calc(var(--avatar)*0.7)] -rotate-25`}></div>
            <div className={`${orbit} w-[calc(var(--avatar)*2.1)] h-[calc(var(--avatar)*0.94)] rotate-42`}></div>
            <div className="absolute bottom-4 left-4 text-muted-2 font-mono text-2xs">PLAYER_001</div>
          </div>
          <div className="flex justify-between gap-5 py-4.5 px-5 border-t border-line">
            <div>
              <span className={eyebrow}>CLASS</span>
              <h2 className="mt-1.75 mb-0 text-[20px] tracking-[-.7px]">MANISH KUMAR</h2>
            </div>
            <div className="h-fit py-2 px-2.5 border border-accent-line text-accent text-right font-mono text-[11px] leading-normal">FULL STACK<br />DEVELOPER</div>
          </div>
        </article>

        <article className={`${panel} p-5.5`}>
          <div className={panelTitle}><span>PLAYER INFORMATION</span><b className="text-muted-2 font-normal">01</b></div>
          <div className="grid grid-cols-2 gap-y-5.5 gap-x-7.5 py-6 phone:grid-cols-1 phone:gap-[15px]">
            {profile.map(([label, value]) => (
              <div key={label}><small className={fieldLabel}>{label}</small><strong className="text-[13px] font-semibold">{value}</strong></div>
            ))}
          </div>
          <div className="h-px bg-line"></div>
          <small className={fieldLabel}>ABOUT PLAYER</small>
          <p className="mt-2.5 mb-4.5 text-muted text-[12px] leading-[1.75]">
            Most of my recent work is on long-running client platforms: a document management system
            for a bank, a genetic diagnostics reporting tool, an environmental credits platform and
            CiviCRM-based tender and event sites. I build custom modules, APIs and payment flows, and
            I've taken several large sites through major version upgrades. I care about code the next
            developer can pick up easily, so I write tests, tidy up legacy code as I go and contribute
            fixes back to Drupal.org.
          </p>
          <div className="flex flex-wrap gap-1.5">
            {quickTags.map(tag => <span key={tag} className={chip}>{tag}</span>)}
          </div>
        </article>
      </div>

      <article className={`${panel} mt-3.5 p-5.5`}>
        <div className={panelTitle}><span>ATTRIBUTES</span><b className="text-muted-2 font-normal">CHARACTER STATS</b></div>
        <div className="grid grid-cols-2 gap-y-6 gap-x-9.5 pt-6 mobile:grid-cols-1">
          {stats.map(([label, value], index) => (
            <Stat key={label} label={label} value={value} index={index} started={started} />
          ))}
        </div>
      </article>
    </section>
  );
}
