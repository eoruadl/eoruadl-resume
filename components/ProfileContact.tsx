import type { ContactInfo } from '@/lib/content';

type ProfileContactProps = {
  contact: ContactInfo;
};

function toTelHref(value: string): string {
  const normalized = value.replace(/[^\d+]/g, '');
  return `tel:${normalized}`;
}

export default function ProfileContact({ contact }: ProfileContactProps) {
  return (
    <section className="contact-card" aria-label="연락처 정보">
      <ul className="contact-list">
        <li className="contact-item">
          <span className="contact-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M9 19c-5 1.5-5-2.5-7-3m14 6v-4a3.5 3.5 0 00-1-2.5c3.3-.4 6.8-1.6 6.8-7.5A5.8 5.8 0 0020 4c.1-.6.4-2.1-.1-4 0 0-1.2-.4-4 .9a13.6 13.6 0 00-7.2 0c-2.8-1.3-4-.9-4-.9-.5 1.9-.2 3.4-.1 4A5.8 5.8 0 003 8c0 5.9 3.5 7.1 6.8 7.5A3.5 3.5 0 009 18v4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <div className="contact-meta">
            <p className="contact-label">{contact.github.label}</p>
            <a href={contact.github.url} target="_blank" rel="noreferrer" className="contact-value">
              {contact.github.url.replace(/^https?:\/\//, '')}
            </a>
          </div>
        </li>

        <li className="contact-item">
          <span className="contact-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M4 5h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1zm0 0l8 7 8-7"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <div className="contact-meta">
            <p className="contact-label">{contact.blog.label}</p>
            <a href={contact.blog.url} target="_blank" rel="noreferrer" className="contact-value">
              {contact.blog.url.replace(/^https?:\/\//, '')}
            </a>
          </div>
        </li>

        <li className="contact-item">
          <span className="contact-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M22 16.9v3a2 2 0 01-2.2 2A19.8 19.8 0 012 4.2 2 2 0 014 2h3a2 2 0 012 1.7c.1 1 .4 2 .8 2.9a2 2 0 01-.5 2.1L8 10a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.5c.9.4 1.9.7 2.9.8a2 2 0 011.7 1.9z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <div className="contact-meta">
            <p className="contact-label">{contact.phone.label}</p>
            <a href={contact.phone.tel ? `tel:${contact.phone.tel}` : toTelHref(contact.phone.value)} className="contact-value">
              {contact.phone.value}
            </a>
          </div>
        </li>
      </ul>
    </section>
  );
}
