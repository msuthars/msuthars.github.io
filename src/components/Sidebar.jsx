import { Link } from "react-router";
import { resume, sectionPath, sections } from "../data.js";

function navItem(active) {
  return [
    "w-full flex items-center gap-3 py-3 px-[13px] border rounded-lg text-left no-underline cursor-pointer",
    "font-mono text-2xs tracking-[.5px] transition-all [-webkit-tap-highlight-color:transparent] tablet:flex-none tablet:w-auto",
    active
      ? "text-accent bg-accent-soft border-[rgba(140,255,59,.14)]"
      : "text-muted bg-transparent border-transparent hover:text-ink hover:bg-[rgba(255,255,255,.035)]"
  ].join(" ");
}

function navKey(active) {
  return `w-[22px] text-[11px] tablet:w-auto ${active ? "text-accent" : "text-muted-2"}`;
}

const shortcut = "flex items-center gap-2 mt-3.5 px-1 text-muted-2 font-mono text-2xs";
const key = "py-1 px-1.5 border border-line-strong rounded-[4px] text-muted";

export default function Sidebar({ active, onTerminal }) {
  return (
    <aside className="sticky top-[72px] h-[calc(100vh-72px)] flex flex-col pt-7 px-3.5 pb-[18px] bg-[rgba(8,11,15,.72)] border-r border-line tablet:z-90 tablet:w-full tablet:h-auto tablet:p-2 tablet:border-r-0 tablet:border-b tablet:bg-[rgba(7,9,12,.9)] phone:top-[62px]">
      <div className="px-[13px] pb-3 text-muted-2 font-mono text-2xs tracking-[1.5px] tablet:hidden">NAVIGATION</div>

      <nav id="main-nav" className="grid gap-[3px] tablet:flex tablet:overflow-x-auto tablet:[scrollbar-width:none] tablet:[&::-webkit-scrollbar]:hidden">
        {sections.map(({ id, label }, index) => (
          <Link key={id} to={sectionPath(id)} className={navItem(active === id)} aria-current={active === id ? "page" : undefined}>
            <span className={navKey(active === id)}>{String(index + 1).padStart(2, "0")}</span><span>{label}</span>
          </Link>
        ))}
        <button className={navItem(false)} onClick={onTerminal}>
          <span className={navKey(false)}>&gt;_</span><span>TERMINAL</span>
        </button>
        <a className={navItem(false)} href={resume.page} target="_blank" rel="noopener">
          <span className={navKey(false)}>CV</span><span>RESUME ↗</span>
        </a>
      </nav>

      <div className="mt-auto tablet:hidden">
        <div className="p-3.5 border border-line rounded-[10px] bg-[rgba(255,255,255,.025)]">
          <div className="flex justify-between items-center text-muted font-mono text-2xs">
            <span>PLAYER LEVEL</span><strong className="text-accent text-[14px]">11</strong>
          </div>
          <div className="h-1 mt-2.5 mb-[7px] bg-[#1b222b] overflow-hidden">
            <div className="block h-full bg-accent shadow-[0_0_12px_rgba(140,255,59,.35)]" style={{ width: "87%" }}></div>
          </div>
          <div className="flex justify-between items-center text-muted-2 font-mono text-2xs">
            <span>48,720 XP</span><span>NEXT 50K</span>
          </div>
        </div>

        <div className={shortcut}>
          <span className={key}>1–7</span>
          <span>QUICK TRAVEL</span>
        </div>
        <div className={shortcut}>
          <span className={key}>`</span>
          <span>TERMINAL</span>
        </div>
      </div>
    </aside>
  );
}
