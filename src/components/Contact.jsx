import { contactLinks, email, resume } from "../data.js";
import { sectionClass } from "./SectionHeading.jsx";

export default function Contact({ active }) {
  return (
    <section id="contact" className={sectionClass(active)}>
      <div className="party-screen panel">
        <span className="eyebrow">FINAL QUEST / 007</span>
        <h1>JOIN THE PARTY</h1>
        <p>Have a Drupal project, an upgrade to survive or a technical challenge? Let's build something together.</p>
        <div className="party-actions">
          {contactLinks.map(([label, href]) => (
            <a key={label} className="btn" href={href} target="_blank" rel="noopener">{label}</a>
          ))}
          <a className="btn" href={resume.page} target="_blank" rel="noopener">VIEW RESUME</a>
          <a className="btn btn-primary" href={`mailto:${email}`}>SEND MESSAGE</a>
        </div>
      </div>
    </section>
  );
}
