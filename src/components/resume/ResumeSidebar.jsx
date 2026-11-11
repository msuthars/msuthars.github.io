import { contact, education, links } from "./resumeData.js";
import emailIcon from "./images/email.svg";
import locationIcon from "./images/location.svg";
import profilePic from "./images/profile.png";

const sidebarText = "text-[13px] leading-[1.4]";

function SidebarSection({ title, children }) {
  return (
    <div className="flex flex-col gap-3.75 pt-5 border-t border-white">
      <h3 className="m-0 text-[15px] font-bold uppercase">{title}</h3>
      <div className="flex flex-col gap-3.75">{children}</div>
    </div>
  );
}

function ContactItem({ icon, label, children }) {
  return (
    <div className="flex flex-col items-center gap-1.25 text-[13px] text-center">
      <img src={icon} alt={label} className="w-3.5 h-3.5" />
      <span>{children}</span>
    </div>
  );
}

export default function ResumeSidebar() {
  return (
    <aside className="w-[28.5%] flex flex-col gap-10 pt-12.5 px-5 pb-10 bg-sidebar text-white mobile:w-full mobile:py-7.5">
      <div className="flex justify-center">
        <img src={profilePic} alt="Manish Kumar" className="w-25.75 h-25.75 rounded-full border border-white object-cover" />
      </div>

      <div className="flex flex-col items-center gap-3.75">
        <ContactItem icon={emailIcon} label="Email">{contact.email}</ContactItem>
        <ContactItem icon={locationIcon} label="Location">{contact.location}</ContactItem>
      </div>

      {links.map(([title, url]) => (
        <SidebarSection key={title} title={title}>
          <ul className={`m-0 pl-5 list-disc ${sidebarText}`}>
            <li>
              <a href={url} target="_blank" rel="noopener noreferrer" className="text-white no-underline break-all hover:underline">{url}</a>
            </li>
          </ul>
        </SidebarSection>
      ))}

      <SidebarSection title="EDUCATION">
        {education.map(item => (
          <div key={item.degree} className={`flex flex-col gap-1.25 *:m-0 print:break-inside-avoid ${sidebarText}`}>
            <p>{item.degree}</p>
            <p>{item.institution}</p>
            <p>{item.year}</p>
          </div>
        ))}
      </SidebarSection>
    </aside>
  );
}
