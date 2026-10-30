import { useEffect, useRef, useState } from "react";
import useDialog from "./useDialog.js";

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
      className="bughunter"
      aria-label="Bug Hunter mini-game"
      onClose={onClose}
    >
      <div className="bh-hud">
        <div><small>SCORE</small><strong>{g && phase !== "ready" ? g.score : 0}</strong></div>
        <div><small>PRODUCTION HP</small><strong className="bh-hp">
          {Array.from({ length: MAX_HP }, (_, i) => (
            <span key={i} className={g && phase !== "ready" && i >= g.hp ? "lost" : ""}>♥</span>
          ))}
        </strong></div>
        <div><small>TIME</small><strong>{Math.ceil(timeLeft / 1000)}s</strong></div>
        <div><small>BEST</small><strong>{best}</strong></div>
        <button className="modal-close bh-close" aria-label="Close game" onClick={onClose}>×</button>
      </div>

      <div className="bh-arena">
        {phase === "playing" && g.bugs.map(bug => (
          <button
            key={bug.id}
            className={`bh-bug${bug.golden ? " golden" : ""}`}
            style={{ left: `${bug.x}%`, top: `${bug.y}%`, animationDuration: `${bug.lifetime}ms` }}
            onPointerDown={event => squash(event, bug)}
            aria-label={bug.golden ? "Golden bug, 50 points" : "Bug, 10 points"}
          >
            {bug.golden ? "🪲" : "🐛"}
          </button>
        ))}

        {phase === "playing" && g.pops.map(pop => (
          <span key={`pop-${pop.id}`} className="bh-pop" style={{ left: `${pop.x}%`, top: `${pop.y}%` }}>{pop.text}</span>
        ))}

        {phase === "ready" && (
          <div className="bh-screen">
            <span className="eyebrow">MINI-GAME / BONUS STAGE</span>
            <h2>BUG HUNTER</h2>
            <p>Bugs are crawling towards production. Squash them before they escape. Every bug that gets through costs 1 HP.
              Golden bugs are worth 50 points. You have 30 seconds.</p>
            <button ref={startButton} className="btn btn-primary" onClick={start}>START HUNT</button>
          </div>
        )}

        {phase === "over" && (
          <div className="bh-screen">
            <span className="eyebrow">{survived ? "ROUND COMPLETE" : "GAME OVER"}</span>
            <h2>{survived ? "PRODUCTION SURVIVED" : "PRODUCTION IS DOWN"}</h2>
            <p className="bh-result">
              <strong>{g.score}</strong> points · {g.squashed} bugs squashed
              {newBest && <span className="bh-record">★ NEW HIGH SCORE</span>}
            </p>
            <div className="bh-actions">
              <button ref={startButton} className="btn btn-primary" onClick={start}>PLAY AGAIN</button>
              <button className="btn" onClick={onClose}>BACK TO PORTFOLIO</button>
            </div>
          </div>
        )}
      </div>
    </dialog>
  );
}
