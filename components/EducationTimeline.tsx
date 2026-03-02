import type { Education } from '@/lib/content';

type EducationTimelineProps = {
  education: Education[];
};

export default function EducationTimeline({ education }: EducationTimelineProps) {
  return (
    <section>
      <div className="section-header">
        <h2>Education</h2>
        <div className="section-divider" />
      </div>

      <div className="timeline-list" aria-label="학력 목록">
        {education.map((entry) => (
          <article key={entry.slug} className="timeline-card">
            <p className="timeline-period">{entry.period}</p>
            <h3>{entry.title}</h3>
            <p className="timeline-org">{entry.organization}</p>
            <p className="timeline-summary">{entry.summary}</p>
            <article className="markdown-body" dangerouslySetInnerHTML={{ __html: entry.contentHtml }} />
          </article>
        ))}
      </div>
    </section>
  );
}
