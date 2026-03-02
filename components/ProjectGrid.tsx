'use client';

import { useMemo, useState } from 'react';
import type { Project } from '@/lib/content';
import ProjectModal from '@/components/ProjectModal';

type ProjectGridProps = {
  projects: Project[];
};

export default function ProjectGrid({ projects }: ProjectGridProps) {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  const selectedProject = useMemo(
    () => projects.find((project) => project.slug === selectedSlug) ?? null,
    [projects, selectedSlug]
  );

  return (
    <>
      <section>
        <div className="section-header">
          <h2>Projects</h2>
          <div className="section-divider" />
        </div>

        <div className="project-grid">
          {projects.map((project) => (
            <button
              key={project.slug}
              className="project-card"
              onClick={() => setSelectedSlug(project.slug)}
              type="button"
            >
              <div className="project-thumb">
                <span>{project.title}</span>
              </div>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              <div className="tech-list">
                {project.tech.map((tech) => (
                  <span key={tech} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </section>

      {selectedProject ? (
        <ProjectModal project={selectedProject} onClose={() => setSelectedSlug(null)} />
      ) : null}
    </>
  );
}
