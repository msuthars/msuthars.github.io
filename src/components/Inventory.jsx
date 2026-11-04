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

      <div className="inventory-grid">
        {inventory.map(([key, logo, label, level, brand]) => (
          <button
            key={key}
            className="item-card"
            style={{ "--logo": `url(${import.meta.env.BASE_URL}assets/logos/${logo}.svg)`, "--brand": brand }}
            onClick={() => showItem(key)}
          >
            <span className="item-icon"><i className="item-logo" aria-hidden="true"></i></span>
            <b>{label}</b><small>LVL {level}</small>
          </button>
        ))}
      </div>
    </section>
  );
}
