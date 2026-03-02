import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { parse } from 'yaml';

const contentRoot = path.join(process.cwd(), 'content');
const projectsRoot = path.join(contentRoot, 'projects');
const experiencesRoot = path.join(contentRoot, 'experiences');
const educationRoot = path.join(contentRoot, 'education');
const contactPath = path.join(contentRoot, 'contact.yaml');

type RequiredProjectMeta = {
  title: string;
  summary: string;
  tech: string[];
};

type RequiredTimelineMeta = {
  title: string;
  organization: string;
  period: string;
  summary: string;
};

export type ProjectMeta = RequiredProjectMeta & {
  slug: string;
  period?: string;
  role?: string;
  thumbnail?: string;
  order?: number;
};

export type Project = ProjectMeta & {
  contentHtml: string;
};

export type ExperienceMeta = RequiredTimelineMeta & {
  slug: string;
  order?: number;
};

export type Experience = ExperienceMeta & {
  contentHtml: string;
};

export type EducationMeta = RequiredTimelineMeta & {
  slug: string;
  order?: number;
};

export type Education = EducationMeta & {
  contentHtml: string;
};

export type ContactLink = {
  label: string;
  url: string;
};

export type ContactPhone = {
  label: string;
  value: string;
  tel?: string;
};

export type ContactInfo = {
  github: ContactLink;
  blog: ContactLink;
  phone: ContactPhone;
};

async function markdownToHtml(markdown: string): Promise<string> {
  const processed = await remark().use(html).process(markdown);
  return processed.toString();
}

function getSlugs(rootPath: string): string[] {
  if (!fs.existsSync(rootPath)) {
    return [];
  }

  return fs
    .readdirSync(rootPath)
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.replace(/\.md$/, ''));
}

function assertProjectMeta(data: unknown, slug: string): asserts data is RequiredProjectMeta & {
  period?: string;
  role?: string;
  thumbnail?: string;
  order?: number;
} {
  if (!data || typeof data !== 'object') {
    throw new Error(`Invalid frontmatter in ${slug}.md: expected object`);
  }

  const candidate = data as Record<string, unknown>;
  if (typeof candidate.title !== 'string' || candidate.title.length === 0) {
    throw new Error(`Invalid frontmatter in ${slug}.md: title is required`);
  }

  if (typeof candidate.summary !== 'string' || candidate.summary.length === 0) {
    throw new Error(`Invalid frontmatter in ${slug}.md: summary is required`);
  }

  if (!Array.isArray(candidate.tech) || candidate.tech.some((item) => typeof item !== 'string')) {
    throw new Error(`Invalid frontmatter in ${slug}.md: tech must be string[]`);
  }
}

function assertTimelineMeta(
  data: unknown,
  slug: string,
  kind: 'experience' | 'education'
): asserts data is RequiredTimelineMeta & {
  order?: number;
} {
  if (!data || typeof data !== 'object') {
    throw new Error(`Invalid frontmatter in ${kind}/${slug}.md: expected object`);
  }

  const candidate = data as Record<string, unknown>;

  if (typeof candidate.title !== 'string' || candidate.title.length === 0) {
    throw new Error(`Invalid frontmatter in ${kind}/${slug}.md: title is required`);
  }

  if (typeof candidate.organization !== 'string' || candidate.organization.length === 0) {
    throw new Error(`Invalid frontmatter in ${kind}/${slug}.md: organization is required`);
  }

  if (typeof candidate.period !== 'string' || candidate.period.length === 0) {
    throw new Error(`Invalid frontmatter in ${kind}/${slug}.md: period is required`);
  }

  if (typeof candidate.summary !== 'string' || candidate.summary.length === 0) {
    throw new Error(`Invalid frontmatter in ${kind}/${slug}.md: summary is required`);
  }
}

function assertContactInfo(data: unknown): asserts data is ContactInfo {
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid contact.yaml: expected an object');
  }

  const root = data as Record<string, unknown>;
  const github = root.github as Record<string, unknown> | undefined;
  const blog = root.blog as Record<string, unknown> | undefined;
  const phone = root.phone as Record<string, unknown> | undefined;

  if (!github || typeof github.label !== 'string' || typeof github.url !== 'string') {
    throw new Error('Invalid contact.yaml: github.label and github.url are required');
  }

  if (!blog || typeof blog.label !== 'string' || typeof blog.url !== 'string') {
    throw new Error('Invalid contact.yaml: blog.label and blog.url are required');
  }

  if (!phone || typeof phone.label !== 'string' || typeof phone.value !== 'string') {
    throw new Error('Invalid contact.yaml: phone.label and phone.value are required');
  }

  if (!/^https?:\/\//.test(github.url)) {
    throw new Error('Invalid contact.yaml: github.url must start with http:// or https://');
  }

  if (!/^https?:\/\//.test(blog.url)) {
    throw new Error('Invalid contact.yaml: blog.url must start with http:// or https://');
  }

  if (phone.tel !== undefined && typeof phone.tel !== 'string') {
    throw new Error('Invalid contact.yaml: phone.tel must be a string if provided');
  }
}

function sortByOrderAndTitle<T extends { order?: number; title: string }>(items: T[]): T[] {
  return items.sort((a, b) => {
    const aOrder = a.order ?? Number.MAX_SAFE_INTEGER;
    const bOrder = b.order ?? Number.MAX_SAFE_INTEGER;

    if (aOrder !== bOrder) {
      return aOrder - bOrder;
    }

    return a.title.localeCompare(b.title, 'ko');
  });
}

export async function getProfileHtml(): Promise<string> {
  const profilePath = path.join(contentRoot, 'profile.md');
  const raw = fs.readFileSync(profilePath, 'utf8');
  const { content } = matter(raw);
  return markdownToHtml(content);
}

export function getContactInfo(): ContactInfo {
  const raw = fs.readFileSync(contactPath, 'utf8');
  const parsed = parse(raw);
  assertContactInfo(parsed);
  return parsed;
}

export function getProjectSlugs(): string[] {
  return getSlugs(projectsRoot);
}

export async function getProjectBySlug(slug: string): Promise<Project> {
  const projectPath = path.join(projectsRoot, `${slug}.md`);
  const raw = fs.readFileSync(projectPath, 'utf8');
  const { data, content } = matter(raw);

  assertProjectMeta(data, slug);

  return {
    slug,
    title: data.title,
    summary: data.summary,
    tech: data.tech,
    period: typeof data.period === 'string' ? data.period : undefined,
    role: typeof data.role === 'string' ? data.role : undefined,
    thumbnail: typeof data.thumbnail === 'string' ? data.thumbnail : undefined,
    order: typeof data.order === 'number' ? data.order : undefined,
    contentHtml: await markdownToHtml(content)
  };
}

export async function getAllProjects(): Promise<Project[]> {
  const projects = await Promise.all(getProjectSlugs().map((slug) => getProjectBySlug(slug)));
  return sortByOrderAndTitle(projects);
}

export async function getAllExperiences(): Promise<Experience[]> {
  const entries = await Promise.all(
    getSlugs(experiencesRoot).map(async (slug) => {
      const filePath = path.join(experiencesRoot, `${slug}.md`);
      const raw = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(raw);

      assertTimelineMeta(data, slug, 'experience');

      return {
        slug,
        title: data.title,
        organization: data.organization,
        period: data.period,
        summary: data.summary,
        order: typeof data.order === 'number' ? data.order : undefined,
        contentHtml: await markdownToHtml(content)
      } satisfies Experience;
    })
  );

  return sortByOrderAndTitle(entries);
}

export async function getAllEducation(): Promise<Education[]> {
  const entries = await Promise.all(
    getSlugs(educationRoot).map(async (slug) => {
      const filePath = path.join(educationRoot, `${slug}.md`);
      const raw = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(raw);

      assertTimelineMeta(data, slug, 'education');

      return {
        slug,
        title: data.title,
        organization: data.organization,
        period: data.period,
        summary: data.summary,
        order: typeof data.order === 'number' ? data.order : undefined,
        contentHtml: await markdownToHtml(content)
      } satisfies Education;
    })
  );

  return sortByOrderAndTitle(entries);
}
