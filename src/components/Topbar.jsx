import { resume, youtube } from "../data.js";
import { avatar } from "./avatar.js";
import { btn } from "./ui.jsx";

const badge = "grid place-items-center border border-accent-line bg-accent-soft text-accent font-mono text-[11px]";
const label = "block text-[11px] tracking-[1.4px]";
const sublabel = "block mt-[3px] text-muted font-mono text-2xs tracking-[1px]";

export default function Topbar() {
  return (
    <header className="sticky top-0 z-100 h-18 flex items-center justify-between px-7 bg-[rgba(7,9,12,.82)] backdrop-blur-[18px] border-b border-line mobile:px-4 phone:h-[62px]">
      <div className="flex items-center gap-2.75">
        <div className={`${badge} w-8.75 h-8.75 font-bold`}>M.</div>
        <div>
          <strong className={label}>MSUTHARS</strong>
          <small className={sublabel}>DEVELOPER RPG</small>
        </div>
      </div>

      <div className="flex items-center gap-2.5 mobile:hidden">
        <div className={`${badge} w-8.5 h-8.5 overflow-hidden rounded-full`}>
          <img src={avatar} alt="" className="w-full h-full object-cover rounded-full" />
        </div>
        <div>
          <strong className={label}>MANISH KUMAR</strong>
          <span className={sublabel}>FULL STACK DEVELOPER</span>
        </div>
      </div>

      <div className="flex items-center gap-4.5 mobile:gap-3 *:whitespace-nowrap">
        <a
          className="group flex items-center gap-2 text-muted font-mono text-2xs tracking-[1px] no-underline transition-colors hover:text-ink"
          href={youtube}
          target="_blank"
          rel="noopener"
          aria-label="My gaming channel on YouTube"
        >
          <i
            className="w-4.5 h-4.5 bg-current icon-mask transition-colors group-hover:bg-[#FF0000]"
            style={{ "--icon": `url(${import.meta.env.BASE_URL}assets/logos/youtube.svg)` }}
            aria-hidden="true"
          ></i>
          <span className="tiny:hidden">GAMING</span>
        </a>
        <a className={btn()} href={resume.page} target="_blank" rel="noopener">RESUME ↗</a>
      </div>
    </header>
  );
}
