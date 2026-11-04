import { resume, youtube } from "../data.js";
import { avatar } from "./avatar.js";

export default function Topbar() {
  return (
    <header className="topbar">
      <div className="brand">
        <div className="brand-icon">M.</div>
        <div>
          <strong>MSUTHARS</strong>
          <small>DEVELOPER RPG</small>
        </div>
      </div>

      <div className="top-player">
        <div className="mini-avatar"><img src={avatar} alt="" /></div>
        <div className="top-player-info">
          <strong>MANISH KUMAR</strong>
          <span>FULL STACK DEVELOPER</span>
        </div>
      </div>

      <div className="topbar-actions">
        <a className="topbar-youtube" href={youtube} target="_blank" rel="noopener" aria-label="My gaming channel on YouTube">
          <i className="youtube-logo" aria-hidden="true"></i>
          <span>GAMING</span>
        </a>
        <a className="btn topbar-resume" href={resume.page} target="_blank" rel="noopener">RESUME ↗</a>
      </div>
    </header>
  );
}
