/* Shared Tailwind class strings for elements used across several components */

export const eyebrow = "text-accent font-mono text-2xs tracking-[1.5px]";

export const panel = "border border-line rounded-panel shadow-panel bg-panel-gradient";

/* Small bordered chip, used for tags */
export const chip = "py-[5px] px-[7px] border border-line text-muted font-mono text-2xs tracking-[.5px]";

export const statusDot = "inline-block w-[7px] h-[7px] rounded-full bg-accent shadow-[0_0_12px_var(--color-accent)]";

/* Bordered status box next to a section heading */
export const headingStatus = "whitespace-nowrap border border-line font-mono text-2xs";

/* Pill with the spinning green ring */
export const openToWork = `${headingStatus} spinner-ring inline-flex items-center gap-2 py-2 px-4 rounded-full text-ink no-underline transition-[border-color]`;

/* Square × button in the corner of a dialog; position it with top/right classes */
export const modalClose = "absolute w-8 h-8 border border-line bg-transparent text-muted cursor-pointer text-[18px]";

/* Shared <dialog> look; each dialog adds its own width, background, border colour and shadow */
export const dialogBase = "p-0 border rounded-panel text-ink backdrop:bg-[rgba(0,0,0,.72)] backdrop:[backdrop-filter:blur(7px)]";

export const modalList = "pl-5 text-muted leading-[1.9]";

export function btn({ primary = false } = {}) {
  return [
    "inline-flex items-center justify-center border rounded-[7px] no-underline cursor-pointer",
    "font-mono text-2xs tracking-[.8px] transition-all hover:-translate-y-[2px] hover:border-accent-line",
    "min-h-[42px] px-[17px]",
    primary
      ? "border-accent bg-accent text-[#071006] font-bold hover:shadow-[0_0_30px_rgba(140,255,59,.25)]"
      : "border-line-strong bg-[rgba(255,255,255,.025)] text-ink hover:text-accent"
  ].join(" ");
}

/* An SVG from /assets/logos used as a mask, so it takes the text colour */
export function Icon({ name }) {
  return (
    <span
      className="flex-none w-3.75 h-3.75 mr-2 bg-current icon-mask"
      style={{ "--icon": `url(${import.meta.env.BASE_URL}assets/logos/${name}.svg)` }}
    ></span>
  );
}
