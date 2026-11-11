import { inventory, skillInfo } from "../data.js";
import SectionHeading, { sectionClass } from "./SectionHeading.jsx";
import SkillDetail from "./SkillDetail.jsx";

export default function Inventory({ active, openDetail }) {
  function showItem(key) {
    const data = skillInfo[key];
    if (!data) {
      openDetail(key, "EQUIPMENT", <p>Custom development equipment / capability used in project work.</p>);
      return;
    }

    openDetail(data[0], "EQUIPPED TECHNOLOGY", <SkillDetail skill={data} />);
  }

  return (
    <section id="inventory" className={sectionClass(active)}>
      <SectionHeading
        eyebrow="EQUIPMENT / 005"
        title="INVENTORY"
        intro="Technologies equipped for current missions."
      />

      <div className="grid grid-cols-4 gap-3 mobile:grid-cols-2 phone:gap-2">
        {inventory.map(([key, logo, label, level, brand]) => (
          <button
            key={key}
            className="group min-h-40 flex flex-col items-center justify-center gap-2.5 border border-line rounded-panel bg-panel cursor-pointer transition-all duration-250 hover:-translate-y-1 hover:border-accent-line hover:shadow-panel phone:min-h-[130px]"
            style={{ "--icon": `url(${import.meta.env.BASE_URL}assets/logos/${logo}.svg)`, "--brand": brand }}
            onClick={() => showItem(key)}
          >
            <span className="w-15.5 h-15.5 grid place-items-center border border-line-strong bg-[rgba(255,255,255,.035)] transition-[border-color] duration-250 group-hover:border-(--brand)">
              {/* Logo takes the theme colour, then the brand colour on hover */}
              <i
                className="w-8 h-8 bg-accent icon-mask transition-[background-color,scale] duration-250 group-hover:bg-(--brand) group-hover:scale-[1.08] group-focus-visible:bg-(--brand) group-focus-visible:scale-[1.08]"
                aria-hidden="true"
              ></i>
            </span>
            <b className="font-mono text-2xs font-normal">{label}</b>
            <small className="text-muted-2 font-mono text-2xs">LVL {level}</small>
          </button>
        ))}
      </div>
    </section>
  );
}
