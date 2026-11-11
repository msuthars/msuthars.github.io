import { contactLinks, resume, openToWork } from "../data.js";
import { sectionClass } from "./SectionHeading.jsx";
import { btn, eyebrow, Icon, openToWork as openToWorkPill, statusDot } from "./ui.jsx";

export default function Contact({ active, onPlay, onMessage }) {
  return (
    <section id="contact" className={sectionClass(active)}>
      <div className="min-h-120 flex flex-col items-center justify-center p-12.5 text-center border border-line rounded-panel shadow-panel bg-party mobile:min-h-105 mobile:py-7.5 mobile:px-4.5">
        { openToWork == true &&
          <span className={`${openToWorkPill} self-center mb-5.5`}><span className={statusDot}></span> OPEN TO WORK</span>
        }
        <span className={eyebrow}>FINAL QUEST / 007</span>
        <h1 className="my-3 text-[clamp(40px,7vw,75px)] leading-[.9] tracking-[-4px] phone:tracking-[-2px]">JOIN THE PARTY</h1>
        <p className="max-w-137.5 text-muted leading-[1.7]">Have a Drupal project, an upgrade to survive or a technical challenge? Let's build something together.</p>
        <div className="flex flex-wrap justify-center gap-2 mt-5">
          {contactLinks.map(([label, href, icon]) => (
            <a key={label} className={btn()} href={href} target="_blank" rel="noopener"><Icon name={icon} /> {label}</a>
          ))}
          <a className={btn()} href={resume.page} target="_blank" rel="noopener"><Icon name="file" /> VIEW RESUME</a>
          <button className={btn({ primary: true })} onClick={onMessage}><Icon name="email" /> SEND MESSAGE</button>
        </div>
        <button
          className="mt-6.5 py-2.5 px-4 border border-dashed border-accent-line rounded-lg bg-transparent text-muted font-mono text-2xs tracking-[1px] cursor-pointer transition-all hover:text-ink hover:border-solid hover:bg-accent-soft"
          onClick={onPlay}
        >
          <span>🐛</span> BONUS STAGE: <b className="text-accent font-bold">PLAY BUG HUNTER</b> →
        </button>
      </div>
    </section>
  );
}
