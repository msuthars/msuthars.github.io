import { avatar } from "./avatar.js";

export default function Topbar() {
  return (
    <header className="topbar">
      <div className="brand">
        <div className="brand-icon">M<span>.</span></div>
        <div>
          <strong>MANISH.DEV</strong>
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

      <div className="system-status">
        <span className="status-dot"></span>
        <span>ONLINE</span>
      </div>
    </header>
  );
}
