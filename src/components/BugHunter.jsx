import { useEffect, useRef, useState } from "react";
import useDialog from "./useDialog.js";
import { btn, dialogBase, eyebrow, modalClose } from "./ui.jsx";

const hudLabel = "block text-muted-2 font-mono text-[10px] leading-[normal] tracking-[1px]";
const hudValue = "block mt-[3px] text-accent font-mono font-bold text-[18px] leading-[normal] mobile:text-[15px]";
const overlay = "absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-[rgba(5,7,10,.72)] cursor-default";
const overlayTitle = "mt-2.5 mb-3.5 text-[clamp(30px,6vw,46px)] tracking-[-1px]";
const overlayCopy = "max-w-[460px] mt-0 mb-6 text-muted text-[14px] leading-[1.7]";

/* Red bugs flash before escaping; golden ones just shrink */
function bugClass(golden) {
  return [
    "absolute w-[52px] h-[52px] -mt-[26px] -ml-[26px] border rounded-full text-[26px] leading-none cursor-crosshair",
    golden
      ? "border-[rgba(255,189,74,.7)] bg-[rgba(255,189,74,.15)] shadow-[0_0_24px_rgba(255,189,74,.35)] golden-life"
      : "border-[rgba(255,95,104,.35)] bg-[rgba(255,95,104,.08)] bug-life",
    "motion-reduce:animate-none"
  ].join(" ");
}

const ROUND_MS = 30000;
const MAX_HP = 3;
const BEST_KEY = "bughunter-best";

function readBest() {
  try { return Number(localStorage.getItem(BEST_KEY)) || 0; } catch (e) { return 0; }
}

function saveBest(score) {
  try { localStorage.setItem(BEST_KEY, String(score)); } catch (e) { /* storage blocked */ }
}

function newGame(now) {
  return { bugs: [], pops: [], score: 0, hp: MAX_HP, squashed: 0, start: now, lastSpawn: 0, nextId: 1 };
}

/* Bugs spawn faster and live shorter as the round goes on */
function tick(game, now) {
  const progress = Math.min((now - game.start) / ROUND_MS, 1);
  const spawnEvery = 850 - 500 * progress;
  const lifetime = 1900 - 950 * progress;

  if (now - game.lastSpawn > spawnEvery) {
    game.bugs.push({
      id: game.nextId++,
      x: 6 + Math.random() * 88,
      y: 8 + Math.random() * 84,
      born: now,
      lifetime,
      golden: Math.random() < 0.08
    });
    game.lastSpawn = now;
  }

  const escaped = game.bugs.filter(bug => now - bug.born > bug.lifetime);
  game.hp -= escaped.filter(bug => !bug.golden).length;
  game.bugs = game.bugs.filter(bug => now - bug.born <= bug.lifetime);
  game.pops = game.pops.filter(pop => now - pop.born < 600);

  return { timeLeft: Math.max(0, ROUND_MS - (now - game.start)), over: game.hp <= 0 || progress >= 1 };
}

export default function BugHunter({ open, onClose }) {
  const dialog = useDialog(open);
  const game = useRef(null);
  const [phase, setPhase] = useState("ready");
  const [timeLeft, setTimeLeft] = useState(ROUND_MS);
  const [best, setBest] = useState(0);
  const [newBest, setNewBest] = useState(false);
  const startButton = useRef();

  useEffect(() => {
    if (open) setBest(readBest());
    else setPhase("ready");
  }, [open]);

  useEffect(() => {
    if (open && phase !== "playing") startButton.current?.focus();
  }, [open, phase]);

  useEffect(() => {
    if (phase !== "playing") return;
    const timer = setInterval(() => {
      const state = tick(game.current, performance.now());
      setTimeLeft(state.timeLeft);
      if (state.over) {
        const { score } = game.current;
        const record = score > readBest();
        if (record) saveBest(score);
        setNewBest(record);
        setBest(readBest());
        setPhase("over");
      }
    }, 50);
    return () => clearInterval(timer);
  }, [phase]);

  function start() {
    game.current = newGame(performance.now());
    setTimeLeft(ROUND_MS);
    setNewBest(false);
    setPhase("playing");
  }

  function squash(event, bug) {
    event.preventDefault();
    const g = game.current;
    if (!g.bugs.includes(bug)) return;
    const points = bug.golden ? 50 : 10;
    g.bugs = g.bugs.filter(b => b !== bug);
    g.pops.push({ id: bug.id, x: bug.x, y: bug.y, born: performance.now(), text: `+${points}` });
    g.score += points;
    g.squashed += 1;
  }

  const g = game.current;
  const survived = g && g.hp > 0;

  return (
    <dialog
      ref={dialog}
      className={`${dialogBase} w-[min(880px,calc(100%-24px))] overflow-hidden touch-manipulation select-none border-line-strong bg-[#0b1016] shadow-modal`}
      aria-label="Bug Hunter mini-game"
      onClose={onClose}
    >
      <div className="relative flex gap-7 py-3.5 pr-[60px] pl-5 border-b border-line bg-panel-solid mobile:gap-4 mobile:py-3 mobile:pr-[52px] mobile:pl-3.5">
        <div><small className={hudLabel}>SCORE</small><strong className={hudValue}>{g && phase !== "ready" ? g.score : 0}</strong></div>
        <div><small className={hudLabel}>PRODUCTION HP</small><strong className={hudValue}>
          {Array.from({ length: MAX_HP }, (_, i) => (
            <span key={i} className={`mr-0.5 ${g && phase !== "ready" && i >= g.hp ? "text-muted-2" : "text-danger"}`}>♥</span>
          ))}
        </strong></div>
        <div><small className={hudLabel}>TIME</small><strong className={hudValue}>{Math.ceil(timeLeft / 1000)}s</strong></div>
        <div><small className={hudLabel}>BEST</small><strong className={hudValue}>{best}</strong></div>
        <button className={`${modalClose} top-1/2 right-3.5 -translate-y-1/2`} aria-label="Close game" onClick={onClose}>×</button>
      </div>

      <div className="relative h-[min(480px,62vh)] overflow-hidden bg-arena cursor-crosshair">
        {phase === "playing" && g.bugs.map(bug => (
          <button
            key={bug.id}
            className={bugClass(bug.golden)}
            style={{ left: `${bug.x}%`, top: `${bug.y}%`, animationDuration: `${bug.lifetime}ms` }}
            onPointerDown={event => squash(event, bug)}
            aria-label={bug.golden ? "Golden bug, 50 points" : "Bug, 10 points"}
          >
            {bug.golden ? "🪲" : "🐛"}
          </button>
        ))}

        {phase === "playing" && g.pops.map(pop => (
          <span key={`pop-${pop.id}`} className="absolute [transform:translate(-50%,-50%)] text-accent font-mono font-bold text-[16px] leading-[normal] pointer-events-none animate-pop-up" style={{ left: `${pop.x}%`, top: `${pop.y}%` }}>{pop.text}</span>
        ))}

        {phase === "ready" && (
          <div className={overlay}>
            <span className={eyebrow}>MINI-GAME / BONUS STAGE</span>
            <h2 className={overlayTitle}>BUG HUNTER</h2>
            <p className={overlayCopy}>Bugs are crawling towards production. Squash them before they escape. Every bug that gets through costs 1 HP.
              Golden bugs are worth 50 points. You have 30 seconds.</p>
            <button ref={startButton} className={btn({ primary: true })} onClick={start}>START HUNT</button>
          </div>
        )}

        {phase === "over" && (
          <div className={overlay}>
            <span className={eyebrow}>{survived ? "ROUND COMPLETE" : "GAME OVER"}</span>
            <h2 className={overlayTitle}>{survived ? "PRODUCTION SURVIVED" : "PRODUCTION IS DOWN"}</h2>
            <p className={overlayCopy}>
              <strong className="text-accent text-[22px]">{g.score}</strong> points · {g.squashed} bugs squashed
              {newBest && <span className="block mt-1.5 text-warning font-mono font-bold text-[12px] leading-[normal] tracking-[1px]">★ NEW HIGH SCORE</span>}
            </p>
            <div className="flex flex-wrap justify-center gap-2.5">
              <button ref={startButton} className={btn({ primary: true })} onClick={start}>PLAY AGAIN</button>
              <button className={btn()} onClick={onClose}>BACK TO PORTFOLIO</button>
            </div>
          </div>
        )}
      </div>
    </dialog>
  );
}
