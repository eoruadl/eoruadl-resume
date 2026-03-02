import Image from 'next/image';
import EducationTimeline from '@/components/EducationTimeline';
import ExperienceTimeline from '@/components/ExperienceTimeline';
import ProfileContact from '@/components/ProfileContact';
import ProjectGrid from '@/components/ProjectGrid';
import {
  getAllEducation,
  getAllExperiences,
  getAllProjects,
  getContactInfo,
  getProfileHtml
} from '@/lib/content';

export default async function HomePage() {
  const [projects, profileHtml, experiences, education, contact] = await Promise.all([
    getAllProjects(),
    getProfileHtml(),
    getAllExperiences(),
    getAllEducation(),
    Promise.resolve(getContactInfo())
  ]);

  return (
    <main className="page-wrap">
      <div className="container">
        <section className="hero-section">
          <div className="profile-left-col">
            <div className="profile-image-wrap">
              <Image
                src="/images/profile.jpg"
                alt="프로필 사진"
                width={270}
                height={360}
                className="profile-image"
                priority
              />
            </div>
            <ProfileContact contact={contact} />
          </div>

          <div className="hero-content">
            <h1>
              안녕하세요,
              <br />
              <span>소프트웨어 엔지니어</span>입니다.
            </h1>

            <article className="markdown-body" dangerouslySetInnerHTML={{ __html: profileHtml }} />

            <section className="skill-box" aria-label="핵심 기술 스택">
              <h2>핵심 기술 스택</h2>
              <ul>
                <li>
                  <strong>언어:</strong> Python, TypeScript, Kotlin
                </li>
                <li>
                  <strong>프레임워크:</strong> FastAPI, Pytorch, React, Next.js, Spring Boot
                </li>
                <li>
                  <strong>인프라:</strong> Docker, PostgreSQL, Celery, RabbitMQ, CI/CD
                </li>
                <li>
                  <strong>도구:</strong> Claude Code
                </li>
              </ul>
            </section>
          </div>
        </section>

        <ExperienceTimeline experiences={experiences} />
        <ProjectGrid projects={projects} />
        <EducationTimeline education={education} />
      </div>
    </main>
  );
}
