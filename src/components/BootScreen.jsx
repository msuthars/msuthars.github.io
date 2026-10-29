import { useEffect, useState } from "react";
import { bootMessages } from "../data.js";

export default function BootScreen({ onStart }) {
  const [step, setStep] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const ready = step >= bootMessages.length;

  useEffect(() => {
    if (ready) return;
    const timer = setTimeout(() => setStep(s => s + 1), 320);
    return () => clearTimeout(timer);
  }, [step, ready]);

  function handleStart() {
    setLeaving(true);
    setTimeout(onStart, 500);
  }

  const leavingStyle = {
    transition: "opacity .5s ease, transform .5s ease",
    opacity: 0,
    transform: "scale(1.02)"
  };

  return (
    <div id="boot-screen" className="boot-screen" style={leaving ? leavingStyle : undefined}>
      <div className="boot-inner">
        <div className="brand-mark">M<span>.</span>D</div>
        <div className="boot-title">MANISH<span>.DEV</span></div>
        <div className="boot-subtitle">DEVELOPER RPG / SYSTEM INITIALIZATION</div>

        <div className="boot-log" id="boot-log">
          {bootMessages.slice(0, step).map(message => (
            <div className="boot-line" key={message}>
              <span>{message}</span><strong>✓</strong>
            </div>
          ))}
        </div>

        <div className="boot-progress">
          <div id="boot-progress-bar" style={{ width: `${Math.round((step / bootMessages.length) * 100)}%` }}></div>
        </div>

        <button id="start-game" className="btn btn-primary" disabled={!ready || leaving} onClick={handleStart}>
          {ready ? "START GAME" : "INITIALIZING..."}
        </button>
      </div>
    </div>
  );
}
