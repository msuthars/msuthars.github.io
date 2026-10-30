import { useEffect, useRef, useState } from "react";
import { bootMessages } from "../data.js";

export default function BootScreen({ onStart }) {
  const [step, setStep] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const ready = step >= bootMessages.length;
  const startButton = useRef();

  useEffect(() => {
    if (ready) {
      startButton.current?.focus();
      return;
    }
    const timer = setTimeout(() => setStep(s => s + 1), 320);
    return () => clearTimeout(timer);
  }, [step, ready]);

  function handleStart() {
    if (leaving) return;
    setLeaving(true);
    setTimeout(onStart, 500);
  }

  /* Once loaded, any key starts the game */
  useEffect(() => {
    if (!ready) return;
    function onKeyDown(event) {
      if (event.key === "Tab" || event.metaKey || event.ctrlKey || event.altKey) return;
      event.preventDefault();
      handleStart();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  });

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

        <button
          id="start-game"
          ref={startButton}
          className="btn btn-primary"
          disabled={!ready || leaving}
          onClick={handleStart}
        >
          {ready ? "START GAME" : "INITIALIZING..."}
        </button>

        <div>
          <button className="boot-skip" onClick={handleStart}>
            {ready ? "PRESS ANY KEY" : "SKIP INTRO →"}
          </button>
        </div>
      </div>
    </div>
  );
}
