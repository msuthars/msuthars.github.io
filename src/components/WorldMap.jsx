import { locations, mapNodes } from "../data.js";
import SectionHeading, { sectionClass } from "./SectionHeading.jsx";

export default function WorldMap({ active, openDetail }) {
  function showLocation(key) {
    const location = locations[key];
    if (!location) return;
    openDetail(location[0], location[1], (
      <>
        <p>{location[2]}</p>
        <ul className="modal-list">
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

      <div className="world">
        <div className="world-grid"></div>
        <div className="map-route"></div>

        {mapNodes.map(([key, className, years, name, role]) => (
          <button key={key} className={`map-node ${className}`} onClick={() => showLocation(key)}>
            <span>{years}</span><b>{name}</b><small>{role}</small>
          </button>
        ))}

        <div className="map-coordinates">SECTOR 04 / 27.6N / 73.4E</div>
      </div>
    </section>
  );
}
