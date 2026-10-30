import { useEffect, useState } from "react";
import { profile, quickTags, stats } from "../data.js";
import { avatar } from "./avatar.js";
import SectionHeading, { sectionClass } from "./SectionHeading.jsx";

function Stat({ label, value, index, started }) {
  const [width, setWidth] = useState(0);

  /* Bars fill once the game has started (they're hidden behind the boot screen until then) */
  useEffect(() => {
    if (!started) return;
    const timer = setTimeout(() => setWidth(value), 120 + index * 80);
    return () => clearTimeout(timer);
  }, [value, index, started]);

  return (
    <div className="stat">
      <div className="stat-head"><span>{label}</span><b>{value}</b></div>
      <div className="stat-track">
        <i style={{ width: `${width}%`, transition: "width 1s cubic-bezier(.2,.8,.2,1)" }}></i>
      </div>
    </div>
  );
}

export default function Character({ active, started }) {
  return (
    <section id="character" className={sectionClass(active)}>
      <SectionHeading
        eyebrow="PLAYER PROFILE / 001"
        title="CHARACTER"
        intro="Full stack Drupal developer building long-running client platforms since Drupal 6."
      >
        <a className="heading-status open-to-work" href="#contact"><span className="status-dot"></span> OPEN TO WORK</a>
      </SectionHeading>

      <div className="character-grid">
        <article className="panel character-card">
          <div className="character-stage">
            <div className="scanline"></div>
            <div className="avatar-large">
              <div className="avatar-ring"></div>
              <img src={avatar} alt="Manish Kumar" />
            </div>
            <div className="character-orbit orbit-one"></div>
            <div className="character-orbit orbit-two"></div>
            <div className="character-tag">PLAYER_001</div>
          </div>
          <div className="character-name">
            <div>
              <span className="eyebrow">CLASS</span>
              <h2>MANISH KUMAR</h2>
            </div>
            <div className="class-badge">FULL STACK<br />DEVELOPER</div>
          </div>
        </article>

        <article className="panel profile-card">
          <div className="panel-title"><span>PLAYER INFORMATION</span><b>01</b></div>
          <div className="profile-grid">
            {profile.map(([label, value]) => (
              <div key={label}><small>{label}</small><strong>{value}</strong></div>
            ))}
          </div>
          <div className="divider"></div>
          <small className="field-label">ABOUT PLAYER</small>
          <p className="body-copy">
            Most of my recent work is on long-running client platforms: a document management system
            for a bank, a genetic diagnostics reporting tool, an environmental credits platform and
            CiviCRM-based tender and event sites. I build custom modules, APIs and payment flows, and
            I've taken several large sites through major version upgrades. I care about code the next
            developer can pick up easily, so I write tests, tidy up legacy code as I go and contribute
            fixes back to Drupal.org.
          </p>
          <div className="quick-tags">
            {quickTags.map(tag => <span key={tag}>{tag}</span>)}
          </div>
        </article>
      </div>

      <article className="panel stats-panel">
        <div className="panel-title"><span>ATTRIBUTES</span><b>CHARACTER STATS</b></div>
        <div className="stats-grid">
          {stats.map(([label, value], index) => (
            <Stat key={label} label={label} value={value} index={index} started={started} />
          ))}
        </div>
      </article>
    </section>
  );
}
