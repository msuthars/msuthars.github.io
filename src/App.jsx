/* =========================================================
   MANISH.DEV — PORTFOLIO GAME LOGIC
========================================================= */

import { useCallback, useEffect, useRef, useState } from "react";
import { sections } from "./data.js";
import BootScreen from "./components/BootScreen.jsx";
import Topbar from "./components/Topbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import DetailModal from "./components/DetailModal.jsx";
import Toast from "./components/Toast.jsx";
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

function isTyping() {
  const tag = document.activeElement?.tagName?.toLowerCase();
  return tag === "input" || tag === "textarea";
}

export default function App() {
  const [started, setStarted] = useState(false);
  const [active, setActive] = useState("character");
  const [detail, setDetail] = useState(null);
  const [toast, setToast] = useState({ message: "", show: false });
  const toastTimer = useRef();

  const showToast = useCallback(message => {
    setToast({ message, show: true });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => {
      setToast(t => ({ ...t, show: false }));
    }, 1800);
  }, []);

  const openSection = useCallback(id => {
    setActive(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const openDetail = useCallback((title, eyebrow, body) => {
    setDetail({ title, eyebrow, body });
  }, []);

  useEffect(() => {
    showToast("SYSTEM READY");
  }, [showToast]);

  /* Keyboard shortcuts: 1–7 jump to sections (ESC is handled by <dialog>) */
  useEffect(() => {
    function onKeyDown(event) {
      const section = sections[Number(event.key) - 1];
      if (section && !isTyping()) openSection(section.id);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [openSection]);

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
    setStarted(true);
    showToast("PLAYER INITIALIZED");
  }

  return (
    <>
      <div className="noise"></div>

      {!started && <BootScreen onStart={handleStart} />}

      {started && (
        <div id="app" className="app">
          <Topbar />

          <div className="app-shell">
            <Sidebar active={active} onSelect={openSection} />

            <main className="content">
              {sections.map(({ id }) => {
                const Section = sectionComponents[id];
                return <Section key={id} active={active === id} openDetail={openDetail} />;
              })}
            </main>
          </div>

          <footer className="footer">
            <span>MANISH.DEV // PLAYER 001</span>
            <span>© {new Date().getFullYear()} ALL SYSTEMS OPERATIONAL</span>
          </footer>
        </div>
      )}

      <DetailModal detail={detail} onClose={() => setDetail(null)} />
      <Toast {...toast} />
    </>
  );
}
