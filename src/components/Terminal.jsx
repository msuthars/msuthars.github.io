import { useEffect, useRef, useState } from "react";
import { contactLinks, email, guilds, quests, resume, sections, skillInfo } from "../data.js";
import useDialog from "./useDialog.js";

/* [command, usage, description] — shown by `help` and used for Tab completion */
const commands = [
  ["help", "help", "List available commands"],
  ["about", "about", "Who is this player?"],
  ["skills", "skills", "Show skill levels"],
  ["quests", "quests [guild]", "List quests, optionally by guild (codecandy, qed42, addweb, softtech)"],
  ["quest", "quest <n>", "Open quest number n"],
  ["goto", "goto <section>", "Travel to a section"],
  ["resume", "resume", "Open the resume"],
  ["contact", "contact", "How to reach me"],
  ["play", "play", "Launch the Bug Hunter mini-game"],
  ["clear", "clear", "Clear the screen"],
  ["exit", "exit", "Close the terminal"]
];

const welcome = [
  { kind: "out", content: "MANISH.DEV TERMINAL v1.0" },
  { kind: "muted", content: "Type 'help' to see commands. Tab autocompletes, ↑ ↓ browse history, Esc closes." }
];

const pad = (text, width) => text + " ".repeat(Math.max(1, width - text.length));

function skillBar(level) {
  const filled = Math.round(level / 10);
  return "█".repeat(filled) + "░".repeat(10 - filled);
}

export default function Terminal({ open, onClose, onGoto, onOpenQuest, onPlay }) {
  const dialog = useDialog(open);
  const input = useRef();
  const screen = useRef();
  const [lines, setLines] = useState(welcome);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  useEffect(() => {
    if (open) input.current?.focus();
  }, [open]);

  useEffect(() => {
    if (screen.current) screen.current.scrollTop = screen.current.scrollHeight;
  }, [lines]);

  function print(...entries) {
    setLines(current => [...current, ...entries]);
  }

  /* Run a command; returns the lines to print */
  function run(raw) {
    const [name = "", ...args] = raw.trim().toLowerCase().split(/\s+/);
    const arg = args.join(" ");

    switch (name) {
      case "":
        return [];

      case "help":
        return [
          ...commands.map(([, usage, description]) => ({ kind: "out", content: `${pad(usage, 18)}${description}` })),
          { kind: "muted", content: "Hidden commands exist. Explore." }
        ];

      case "about":
      case "whoami":
        return [
          { kind: "accent", content: "MANISH KUMAR — FULL STACK DEVELOPER" },
          { kind: "out", content: "11 years of web development, 9 with Drupal (D6 → D11)." },
          { kind: "out", content: "Builds custom modules, APIs and payment flows; upgrades large sites." },
          { kind: "out", content: "Guild: CodeCandy (Bright Solutions, Germany) · Location: India / Remote" },
          { kind: "accent", content: "● STATUS: OPEN TO WORK — type 'contact'" }
        ];

      case "skills":
        return Object.values(skillInfo).map(([skill, , level]) => {
          const n = Number(level.replace(/\D/g, ""));
          return { kind: "out", content: `${pad(skill, 12)}${skillBar(n)} ${n}` };
        });

      case "quests": {
        if (arg && !guilds[arg]) {
          return [{ kind: "err", content: `Unknown guild '${arg}'. Try: ${Object.keys(guilds).join(", ")}` }];
        }
        const list = quests
          .map((quest, index) => ({ quest, index }))
          .filter(({ quest }) => !arg || quest.guild === arg);
        return [
          ...list.map(({ quest, index }) => ({
            kind: "out",
            content: `${pad(String(index + 1).padStart(2, "0"), 4)}${pad(quest.title, 34)}+${quest.reward} XP`
          })),
          { kind: "muted", content: "Type 'quest <n>' to open one." }
        ];
      }

      case "quest": {
        const quest = quests[Number(arg) - 1];
        if (!quest) return [{ kind: "err", content: `Usage: quest <1-${quests.length}>` }];
        onOpenQuest(quest);
        return [{ kind: "muted", content: `Opening ${quest.title}…` }];
      }

      case "goto":
      case "cd": {
        const target = arg.replace(/^#/, "");
        const section = sections.find(s => s.id === target || s.label.toLowerCase() === target);
        if (!section) {
          return [{ kind: "err", content: `Unknown section. Try: ${sections.map(s => s.id).join(", ")}` }];
        }
        onGoto(section.id);
        return [{ kind: "muted", content: `Travelling to ${section.label}…` }];
      }

      case "ls":
        return [{ kind: "out", content: sections.map(s => `${s.id}/`).join("  ") }];

      case "resume":
      case "cv":
        window.open(resume.page, "_blank", "noopener");
        return [{ kind: "muted", content: "Opening resume in a new tab…" }];

      case "contact":
      case "hire":
        return [
          { kind: "out", content: <>EMAIL      <a href={`mailto:${email}`}>{email}</a></> },
          ...contactLinks.map(([label, href]) => ({
            kind: "out",
            content: <>{pad(label, 11)}<a href={href} target="_blank" rel="noopener">{href.replace("https://", "")}</a></>
          }))
        ];

      case "play":
      case "bughunter":
        onPlay();
        return [{ kind: "muted", content: "Launching Bug Hunter…" }];

      case "sudo":
        return arg.startsWith("hire")
          ? [{ kind: "accent", content: "Permission granted. Excellent choice. Type 'contact' to finish the job." }]
          : [{ kind: "err", content: "Nice try. This incident will be reported." }];

      case "rm":
        return [{ kind: "err", content: "Refusing to delete production. That's what the bugs are for." }];

      case "coffee":
        return [{ kind: "accent", content: "☕ +10 HP. Ready for another upgrade." }];

      case "exit":
      case "quit":
        onClose();
        return [];

      default:
        return [{ kind: "err", content: `command not found: ${name}. Type 'help'.` }];
    }
  }

  function submit(event) {
    event.preventDefault();
    const raw = value;
    setValue("");
    setHistoryIndex(-1);
    if (raw.trim()) setHistory(current => [raw, ...current].slice(0, 50));

    if (raw.trim().toLowerCase() === "clear") {
      setLines([]);
      return;
    }
    print({ kind: "cmd", content: raw }, ...run(raw));
  }

  function complete() {
    const [name, ...rest] = value.split(" ");
    const options = rest.length === 0
      ? commands.map(([command]) => command).filter(command => command.startsWith(name))
      : name === "goto"
        ? sections.map(s => s.id).filter(id => id.startsWith(rest.join(" ")))
        : name === "quests"
          ? Object.keys(guilds).filter(guild => guild.startsWith(rest.join(" ")))
          : [];

    if (options.length === 1) {
      setValue(rest.length === 0 ? `${options[0]} ` : `${name} ${options[0]}`);
    } else if (options.length > 1) {
      print({ kind: "cmd", content: value }, { kind: "muted", content: options.join("  ") });
    }
  }

  function onKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      complete();
    } else if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      event.preventDefault();
      const next = event.key === "ArrowUp"
        ? Math.min(historyIndex + 1, history.length - 1)
        : Math.max(historyIndex - 1, -1);
      setHistoryIndex(next);
      setValue(next === -1 ? "" : history[next]);
    } else if (event.key === "l" && event.ctrlKey) {
      event.preventDefault();
      setLines([]);
    }
  }

  return (
    <dialog
      ref={dialog}
      className="terminal"
      aria-label="Command terminal"
      onClose={onClose}
      onClick={event => { if (event.target === dialog.current) onClose(); }}
    >
      <div className="terminal-bar">
        <span className="terminal-dots"><i></i><i></i><i></i></span>
        <span>guest@manish.dev: ~</span>
        <button className="modal-close terminal-close" aria-label="Close terminal" onClick={onClose}>×</button>
      </div>

      <div className="terminal-screen" ref={screen} onClick={() => input.current?.focus()}>
        {lines.map((line, index) => (
          <div key={index} className={`terminal-line ${line.kind}`}>
            {line.kind === "cmd" && <span className="terminal-prompt">❯ </span>}
            {line.content}
          </div>
        ))}

        <form className="terminal-input" onSubmit={submit}>
          <label htmlFor="terminal-command" className="terminal-prompt">❯</label>
          <input
            id="terminal-command"
            ref={input}
            value={value}
            onChange={event => setValue(event.target.value)}
            onKeyDown={onKeyDown}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck="false"
            enterKeyHint="send"
            aria-label="Command"
          />
        </form>
      </div>
    </dialog>
  );
}
