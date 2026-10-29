export default function SectionHeading({ eyebrow, title, intro, children }) {
  return (
    <div className="section-heading">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{intro}</p>
      </div>
      {children}
    </div>
  );
}

export function sectionClass(active) {
  return `section${active ? " active" : ""}`;
}
