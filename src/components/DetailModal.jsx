import { useEffect, useRef } from "react";
import { dialogBase, eyebrow, modalClose } from "./ui.jsx";

/* Generic detail modal. `detail` is { title, eyebrow, body } or null. */
export default function DetailModal({ detail, onClose }) {
  const dialog = useRef();

  useEffect(() => {
    const el = dialog.current;
    if (detail && !el.open) el.showModal();
    if (!detail && el.open) el.close();
  }, [detail]);

  return (
    <dialog
      id="detail-modal"
      ref={dialog}
      className={`${dialogBase} w-[min(680px,calc(100%-30px))] border-line-strong bg-[#0b1016] shadow-modal`}
      onClose={onClose}
      onClick={event => { if (event.target === dialog.current) dialog.current.close(); }}
    >
      <div className="relative p-8">
        <button className={`${modalClose} top-3.5 right-3.5`} aria-label="Close" onClick={() => dialog.current.close()}>×</button>
        <span className={eyebrow}>{detail?.eyebrow ?? "DETAIL"}</span>
        <h2 className="mt-[9px] mb-5 text-[28px]">{detail?.title ?? "TITLE"}</h2>
        <div>
          <div className="text-muted text-[13px] leading-[1.8] [&_strong]:text-ink">{detail?.body}</div>
        </div>
      </div>
    </dialog>
  );
}
