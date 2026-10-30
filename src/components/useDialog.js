import { useEffect, useRef } from "react";

/* Keeps a <dialog> element's open state in sync with a boolean prop */
export default function useDialog(open) {
  const dialog = useRef();

  useEffect(() => {
    const el = dialog.current;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  return dialog;
}
