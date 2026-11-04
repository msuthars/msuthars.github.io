import { contact, education, links } from "./resumeData.js";
import emailIcon from "./images/email.svg";
import locationIcon from "./images/location.svg";
import profilePic from "./images/profile.png";

function SidebarSection({ title, children }) {
  return (
    <div className="sidebar-section">
      <h3 className="sidebar-title">{title}</h3>
      <div className="sidebar-content">{children}</div>
    </div>
  );
}

export default function ResumeSidebar() {
  return (
    <aside className="sidebar">
      <div className="profile-pic-container">
        <img src={profilePic} alt="Manish Kumar" className="profile-pic" />
      </div>

      <div className="contact-info">
        <div className="contact-item">
          <img src={emailIcon} alt="Email" className="contact-icon" />
          <span>{contact.email}</span>
        </div>
        <div className="contact-item">
          <img src={locationIcon} alt="Location" className="contact-icon" />
          <span>{contact.location}</span>
        </div>
      </div>

      {links.map(([title, url]) => (
        <SidebarSection key={title} title={title}>
          <ul className="sidebar-list">
            <li><a href={url} target="_blank" rel="noopener noreferrer">{url}</a></li>
          </ul>
        </SidebarSection>
      ))}

      <SidebarSection title="EDUCATION">
        {education.map(item => (
          <div key={item.degree} className="education-item">
            <p className="degree">{item.degree}</p>
            <p className="institution">{item.institution}</p>
            <p className="year">{item.year}</p>
          </div>
        ))}
      </SidebarSection>
    </aside>
  );
}
