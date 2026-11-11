/* =========================================================
   MSUTHARS — PORTFOLIO GAME LOGIC
========================================================= */

import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { questEyebrow, sectionFromPath, sectionPath, sections, sectionTitle } from "./data.js";
import BootScreen from "./components/BootScreen.jsx";
import Topbar from "./components/Topbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import DetailModal from "./components/DetailModal.jsx";
import Toast from "./components/Toast.jsx";
import Terminal from "./components/Terminal.jsx";
import BugHunter from "./components/BugHunter.jsx";
import ContactForm from "./components/ContactForm.jsx";
import QuestDetail from "./components/QuestDetail.jsx";
import Character from "./components/Character.jsx";
import Quests from "./components/Quests.jsx";
import SkillTree from "./components/SkillTree.jsx";
import WorldMap from "./components/WorldMap.jsx";
import Inventory from "./components/Inventory.jsx";
import Achievements from "./components/Achievements.jsx";
import Contact from "./components/Contact.jsx";

const sectionComponents = {
  character: Character,
  quests: Quests,
  skills: SkillTree,
  world: WorldMap,
  inventory: Inventory,
  achievements: Achievements,
  contact: Contact
};

/* The inline script in index.html adds .is-booting on a first visit (and not for reduced motion) */
function isBooting() {
  return typeof document !== "undefined" && document.documentElement.classList.contains("is-booting");
}

function isTyping() {
  const tag = document.activeElement?.tagName?.toLowerCase();
  return tag === "input" || tag === "textarea";
}

export default function App() {
  const [started, setStarted] = useState(() => !isBooting());
  const location = useLocation();
  const navigate = useNavigate();
  const active = sectionFromPath(location.pathname) ?? "character";
  const [detail, setDetail] = useState(null);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [gameOpen, setGameOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [toast, setToast] = useState({ message: "", show: false });
  const toastTimer = useRef();

  const showToast = useCallback(message => {
    setToast({ message, show: true });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => {
      setToast(t => ({ ...t, show: false }));
    }, 1800);
  }, []);

  /* Each section has its own URL (/quests/, /skills/…) so it can be linked to */
  const openSection = useCallback(id => navigate(sectionPath(id)), [navigate]);

  /* Old #hash links (#quests) and unknown paths go to the matching section URL */
  useEffect(() => {
    const fromHash = location.hash && sectionFromPath(location.hash.slice(1));
    if (fromHash) navigate(sectionPath(fromHash), { replace: true });
    else if (!sectionFromPath(location.pathname)) navigate("/", { replace: true });
  }, [location.hash, location.pathname, navigate]);

  /* Start each section at the top, and name the tab after it */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = sectionTitle(active);
  }, [active]);

  const openDetail = useCallback((title, eyebrow, body) => {
    setDetail({ title, eyebrow, body });
  }, []);

  useEffect(() => {
    showToast("SYSTEM READY");
  }, [showToast]);

  /* Keyboard shortcuts: 1–7 jump to sections, ` or / opens the terminal (ESC is handled by <dialog>) */
  useEffect(() => {
    function onKeyDown(event) {
      if (!started || isTyping() || terminalOpen || gameOpen || contactOpen || event.metaKey || event.ctrlKey || event.altKey) return;
      if (event.key === "`" || event.key === "/") {
        event.preventDefault();
        setDetail(null);
        setTerminalOpen(true);
        return;
      }
      const section = sections[Number(event.key) - 1];
      if (section) openSection(section.id);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [started, terminalOpen, gameOpen, contactOpen, openSection]);

  const openTerminal = useCallback(() => setTerminalOpen(true), []);
  const openGame = useCallback(() => setGameOpen(true), []);
  const openContact = useCallback(() => setContactOpen(true), []);

  /* Subtle pointer glow */
  useEffect(() => {
    const root = document.documentElement;
    function onPointerMove(event) {
      root.style.setProperty("--mouse-x", `${event.clientX}px`);
      root.style.setProperty("--mouse-y", `${event.clientY}px`);
    }
    document.addEventListener("pointermove", onPointerMove);
    return () => document.removeEventListener("pointermove", onPointerMove);
  }, []);

  function handleStart() {
    document.documentElement.classList.remove("is-booting");
    try { localStorage.setItem("booted", "1"); } catch (e) { /* storage blocked: boot again next time */ }
    setStarted(true);
    showToast("PLAYER INITIALIZED");
  }

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-1000 opacity-[.025] bg-noise"></div>

      {!started && <BootScreen onStart={handleStart} />}

      <div id="app" className="min-h-screen">
        <Topbar />

        <div className="grid grid-cols-[230px_minmax(0,1fr)] min-h-[calc(100vh-72px)] tablet:grid-cols-[minmax(0,1fr)] tablet:grid-rows-[auto_1fr] phone:min-h-[calc(100vh-62px)]">
          <Sidebar active={active} onTerminal={openTerminal} />

          <main className="w-[min(1250px,100%)] mx-auto pt-10.5 px-10.5 pb-15 tablet:pt-8 tablet:px-6 tablet:pb-[50px] phone:pt-[26px] phone:px-3.5 phone:pb-10">
            {sections.map(({ id }) => {
              const Section = sectionComponents[id];
              return <Section key={id} active={active === id} started={started} openDetail={openDetail} onPlay={openGame} onMessage={openContact} />;
            })}
          </main>
        </div>

        <footer className="flex justify-between py-4 px-7 border-t border-line text-muted-2 font-mono text-2xs tracking-[1px] mobile:gap-2.5 mobile:flex-col">
          <span>MSUTHARS // PLAYER 001</span>
          <span>© {new Date().getFullYear()} ALL SYSTEMS OPERATIONAL</span>
        </footer>
      </div>

      <DetailModal detail={detail} onClose={() => setDetail(null)} />
      <Terminal
        open={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        onGoto={id => { setTerminalOpen(false); openSection(id); }}
        onOpenQuest={quest => {
          setTerminalOpen(false);
          openDetail(quest.title, questEyebrow(quest), <QuestDetail quest={quest} />);
        }}
        onPlay={() => { setTerminalOpen(false); setGameOpen(true); }}
      />
      <BugHunter open={gameOpen} onClose={() => setGameOpen(false)} />
      <ContactForm open={contactOpen} onClose={() => setContactOpen(false)} />
      <Toast {...toast} />
    </>
  );
}
