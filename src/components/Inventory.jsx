import { inventory, skillInfo } from "../data.js";
import SectionHeading, { sectionClass } from "./SectionHeading.jsx";

export default function Inventory({ active, openDetail }) {
  function showItem(key) {
    const data = skillInfo[key];
    if (!data) {
      openDetail(key, "EQUIPMENT", <p>Custom development equipment / capability used in project work.</p>);
      return;
    }

    openDetail(data[0], "EQUIPPED TECHNOLOGY", (
      <>
        <p><strong>{data[1]}</strong></p>
        <p>{data[3]}</p>
        <p><strong>Level:</strong> {data[2]}</p>
      </>
    ));
  }

  return (
    <section id="inventory" className={sectionClass(active)}>
      <SectionHeading
        eyebrow="EQUIPMENT / 005"
        title="INVENTORY"
        intro="Technologies equipped for current missions."
      />

      <div className="inventory-grid">
        {inventory.map(([key, icon, label, level]) => (
          <button key={key} className="item-card" onClick={() => showItem(key)}>
            <span className="item-icon">{icon}</span><b>{label}</b><small>LVL {level}</small>
          </button>
        ))}
      </div>
    </section>
  );
}
