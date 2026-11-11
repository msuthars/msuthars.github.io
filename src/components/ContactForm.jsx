import { useEffect, useRef, useState } from "react";
import { email, web3formsKey } from "../data.js";
import useDialog from "./useDialog.js";
import { btn, dialogBase, eyebrow, modalClose } from "./ui.jsx";

const label = "block mb-[7px] text-muted-2 font-mono text-2xs tracking-[1px]";
const field = "w-full py-3 px-3.5 border border-line-strong rounded-[7px] bg-[rgba(255,255,255,.025)] text-ink text-[13px] [font-family:inherit] [outline:0] transition-colors placeholder:text-muted-2 focus:border-accent-line focus:bg-accent-soft/40";

const empty = { name: "", email: "", message: "" };

/* Contact form in a dialog. Submissions go to Web3Forms, which emails them on. */
export default function ContactForm({ open, onClose }) {
  const dialog = useDialog(open);
  const firstField = useRef();
  const [values, setValues] = useState(empty);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      if (status !== "sending") setStatus("idle");
      firstField.current?.focus();
    }
  }, [open]);

  function update(event) {
    setValues(current => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function submit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setStatus("sending");
    setError("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: web3formsKey,
          subject: `New message from ${values.name} via msuthars.github.io`,
          from_name: "MSUTHARS Portfolio",
          ...values,
          botcheck: form.get("botcheck") ? true : ""
        })
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || "Message could not be sent.");
      setValues(empty);
      setStatus("sent");
    } catch (err) {
      setError(err.message || "Message could not be sent.");
      setStatus("error");
    }
  }

  return (
    <dialog
      ref={dialog}
      className={`${dialogBase} w-[min(560px,calc(100%-30px))] border-line-strong bg-[#0b1016] shadow-modal`}
      aria-label="Send a message"
      onClose={onClose}
      onClick={event => { if (event.target === dialog.current) onClose(); }}
    >
      <div className="relative p-8 mobile:py-7 mobile:px-5">
        <button className={`${modalClose} top-3.5 right-3.5`} aria-label="Close" onClick={onClose}>×</button>
        <span className={eyebrow}>FINAL QUEST / SEND MESSAGE</span>
        <h2 className="mt-2.25 mb-5 text-[28px]">JOIN THE PARTY</h2>

        {status === "sent" ? (
          <div role="status">
            <p className="text-muted text-[13px] leading-[1.8]">
              <strong className="text-accent">✓ MESSAGE DELIVERED.</strong> Thanks for reaching out. I'll reply to you by email soon.
            </p>
            <button className={btn({ primary: true })} onClick={onClose}>BACK TO PORTFOLIO</button>
          </div>
        ) : (
          <form onSubmit={submit} className="grid gap-4">
            {/* Honeypot: hidden from people, bots fill it in and Web3Forms drops the submission */}
            <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

            <div className="grid grid-cols-2 gap-4 mobile:grid-cols-1">
              <div>
                <label htmlFor="contact-name" className={label}>NAME</label>
                <input
                  id="contact-name" ref={firstField} name="name" className={field}
                  value={values.name} onChange={update} required maxLength={100} autoComplete="name"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className={label}>EMAIL</label>
                <input
                  id="contact-email" type="email" name="email" className={field}
                  value={values.email} onChange={update} required maxLength={200} autoComplete="email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="contact-message" className={label}>MESSAGE</label>
              <textarea
                id="contact-message" name="message" rows={6} className={`${field} resize-y min-h-30 leading-[1.6]`}
                value={values.message} onChange={update} required maxLength={5000}
                placeholder="Tell me about your project, upgrade or challenge…"
              />
            </div>

            {status === "error" && (
              <p role="alert" className="m-0 text-danger font-mono text-2xs leading-[1.6]">
                ✕ {error} You can also email me at <a className="text-blue" href={`mailto:${email}`}>{email}</a>.
              </p>
            )}

            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-muted-2 font-mono text-2xs">ALL FIELDS REQUIRED</span>
              <button type="submit" className={`${btn({ primary: true })} disabled:opacity-60 disabled:cursor-wait`} disabled={status === "sending"}>
                {status === "sending" ? "SENDING…" : "SEND MESSAGE →"}
              </button>
            </div>
          </form>
        )}
      </div>
    </dialog>
  );
}
