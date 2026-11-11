import { useEffect, useRef, useState } from "react";
import { bootMessages } from "../data.js";
import { btn } from "./ui.jsx";

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
    <div id="boot-screen" className="fixed inset-0 z-2000 grid place-items-center bg-boot" style={leaving ? leavingStyle : undefined}>
      <div className="w-[min(500px,calc(100%-40px))] text-center">
        <div className="mb-3.5 font-mono text-[42px] font-bold tracking-[-4px]">M<span className="text-accent">.</span>D</div>
        <div className="font-mono text-[24px] font-bold tracking-[3px]">MANISH<span className="text-accent">.DEV</span></div>
        <div className="mt-2 text-muted font-mono text-2xs tracking-[1.5px]">DEVELOPER RPG / SYSTEM INITIALIZATION</div>

        <div className="mt-[42px] mb-3 min-h-[122px] text-left text-muted font-mono text-[11px] leading-[2]" id="boot-log">
          {bootMessages.slice(0, step).map(message => (
            <div className="flex justify-between border-b border-[rgba(255,255,255,.04)]" key={message}>
              <span>{message}</span><strong className="text-accent">✓</strong>
            </div>
          ))}
        </div>

        <div className="h-[2px] mb-7 bg-[#171d24] overflow-hidden">
          <div id="boot-progress-bar" className="h-full bg-accent shadow-[0_0_15px_var(--color-accent)] transition-[width]" style={{ width: `${Math.round((step / bootMessages.length) * 100)}%` }}></div>
        </div>

        <button
          id="start-game"
          ref={startButton}
          className={btn({ primary: true })}
          disabled={!ready || leaving}
          onClick={handleStart}
        >
          {ready ? "START GAME" : "INITIALIZING..."}
        </button>

        <div>
          <button className="mt-3.5 bg-transparent border-0 text-muted font-mono text-[10px] leading-[normal] tracking-[1px] cursor-pointer hover:text-accent" onClick={handleStart}>
            {ready ? "PRESS ANY KEY" : "SKIP INTRO →"}
          </button>
        </div>
      </div>
    </div>
  );
}
