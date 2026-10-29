import { useEffect, useRef } from "react";

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
      onClose={onClose}
      onClick={event => { if (event.target === dialog.current) dialog.current.close(); }}
    >
      <div className="modal-inner">
        <button className="modal-close" aria-label="Close" onClick={() => dialog.current.close()}>×</button>
        <span className="eyebrow">{detail?.eyebrow ?? "DETAIL"}</span>
        <h2>{detail?.title ?? "TITLE"}</h2>
        <div>
          <div className="modal-content-copy">{detail?.body}</div>
        </div>
      </div>
    </dialog>
  );
}
