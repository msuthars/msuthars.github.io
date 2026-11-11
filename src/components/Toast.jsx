export default function Toast({ message, show }) {
  return (
    <div
      id="toast"
      className={`fixed right-6 bottom-6 z-1500 py-3 px-[15px] border border-accent-line bg-[#0b120b] text-accent font-mono text-2xs pointer-events-none transition-all duration-250 ${
        show ? "translate-y-0 opacity-100" : "translate-y-[30px] opacity-0"
      }`}
    >
      {message}
    </div>
  );
}
