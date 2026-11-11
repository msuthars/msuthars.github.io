import { locations, mapNodes } from "../data.js";
import SectionHeading, { sectionClass } from "./SectionHeading.jsx";
import { modalList } from "./ui.jsx";

/* The current node is highlighted and keeps its green border on hover */
function mapNode(current) {
  return [
    "absolute w-[150px] p-3.5 border text-ink text-left cursor-pointer -translate-x-1/2 -translate-y-1/2",
    "transition-all duration-250 hover:shadow-[0_0_35px_rgba(140,255,59,.12)] hover:scale-[1.04] mobile:w-[145px]",
    current ? "border-accent-line bg-[rgba(140,255,59,.07)]" : "border-line-strong bg-[rgba(8,12,15,.9)] hover:border-accent"
  ].join(" ");
}

const nodeMeta = "block text-muted-2 font-mono text-2xs";

export default function WorldMap({ active, openDetail }) {
  function showLocation(key) {
    const location = locations[key];
    if (!location) return;
    openDetail(location[0], location[1], (
      <>
        <p>{location[2]}</p>
        <ul className={modalList}>
          {location[3].map(item => <li key={item}>{item}</li>)}
        </ul>
      </>
    ));
  }

  return (
    <section id="world" className={sectionClass(active)}>
      <SectionHeading
        eyebrow="CAREER JOURNEY / 004"
        title="WORLD MAP"
        intro="Explore the major chapters of the developer journey."
      />

      <div className="relative min-h-142.5 overflow-hidden border border-line rounded-panel bg-[#080d0c] mobile:min-h-175">
        <div className="absolute inset-0 bg-world-glow"></div>
        <div className="absolute inset-0 opacity-35 bg-world-grid"></div>
        <div className="absolute left-[13%] right-[13%] top-1/2 h-px bg-map-route mobile:left-1/2 mobile:right-auto mobile:top-[12%] mobile:bottom-[12%] mobile:w-px mobile:h-auto"></div>

        {mapNodes.map(([key, position, years, name, role, current]) => (
          <button key={key} className={`${mapNode(current)} ${position}`} onClick={() => showLocation(key)}>
            <span className={nodeMeta}>{years}</span>
            <b className={`block mt-1.75 mb-1 font-mono text-2xs font-normal ${current ? "text-accent" : ""}`}>{name}</b>
            <small className={nodeMeta}>{role}</small>
          </button>
        ))}

        <div className="absolute bottom-3.75 left-4.25 text-muted-2 font-mono text-2xs">SECTOR 04 / 27.6N / 73.4E</div>
      </div>
    </section>
  );
}
