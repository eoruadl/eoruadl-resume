import type { Experience } from '@/lib/content';

type ExperienceTimelineProps = {
  experiences: Experience[];
};

export default function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  return (
    <section>
      <div className="section-header">
        <h2>Experience</h2>
        <div className="section-divider" />
      </div>

      <div className="timeline-list" aria-label="경력 목록">
        {experiences.map((experience) => (
          <article key={experience.slug} className="timeline-card">
            <div className="experience-row">
              <div className="experience-meta">
                <p className="experience-period">{experience.period}</p>
                <p className="experience-company">{experience.organization}</p>
                <p className="experience-role">{experience.title}</p>
              </div>

              <div
                className="markdown-body experience-achievements"
                dangerouslySetInnerHTML={{ __html: experience.contentHtml }}
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
