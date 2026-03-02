'use client';

import { useEffect } from 'react';
import type { Project } from '@/lib/content';

type ProjectModalProps = {
  project: Project;
  onClose: () => void;
};

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent): void {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby={`project-${project.slug}`}>
      <button className="modal-backdrop" aria-label="닫기" onClick={onClose} />
      <div className="modal-panel-wrap">
        <div className="modal-panel" onClick={(event) => event.stopPropagation()}>
          <button className="close-button" onClick={onClose} aria-label="닫기">
            ×
          </button>

          <div className="modal-header">
            <h3 id={`project-${project.slug}`}>{project.title}</h3>
            {project.role ? <span className="project-pill">{project.role}</span> : null}
          </div>

          <p className="project-summary">{project.summary}</p>

          {project.period ? (
            <p className="project-period">
              <strong>기간:</strong> {project.period}
            </p>
          ) : null}

          <div className="tech-list">
            {project.tech.map((tech) => (
              <span key={tech} className="tech-tag">
                {tech}
              </span>
            ))}
          </div>

          <article
            className="markdown-body"
            dangerouslySetInnerHTML={{ __html: project.contentHtml }}
          />
        </div>
      </div>
    </div>
  );
}
