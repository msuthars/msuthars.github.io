import { resume, sections } from "../data.js";

export default function Sidebar({ active, onSelect, onTerminal }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-label">NAVIGATION</div>

      <nav id="main-nav">
        {sections.map(({ id, label }, index) => (
          <button
            key={id}
            className={`nav-item${active === id ? " active" : ""}`}
            onClick={() => onSelect(id)}
          >
            <span className="nav-key">{String(index + 1).padStart(2, "0")}</span><span>{label}</span>
          </button>
        ))}
        <button className="nav-item" onClick={onTerminal}>
          <span className="nav-key">&gt;_</span><span>TERMINAL</span>
        </button>
        <a className="nav-item" href={resume.page} target="_blank" rel="noopener">
          <span className="nav-key">CV</span><span>RESUME ↗</span>
        </a>
      </nav>

      <div className="sidebar-bottom">
        <div className="xp-card">
          <div className="xp-heading"><span>PLAYER LEVEL</span><strong>11</strong></div>
          <div className="xp-track"><div className="xp-fill" style={{ width: "87%" }}></div></div>
          <div className="xp-meta"><span>48,720 XP</span><span>NEXT 50K</span></div>
        </div>

        <div className="shortcut">
          <span className="key">1–7</span>
          <span>QUICK TRAVEL</span>
        </div>
        <div className="shortcut">
          <span className="key">`</span>
          <span>TERMINAL</span>
        </div>
      </div>
    </aside>
  );
}
