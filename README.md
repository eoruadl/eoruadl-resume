# Resume Site

Next.js(App Router) 기반 이력서/포트폴리오 사이트입니다. 콘텐츠는 `content/` 아래 Markdown 파일로 관리합니다.

## 실행

```bash
npm install --cache ./.npm-cache
npm run dev
```

## 콘텐츠 수정

- 자기소개: `content/profile.md`
- 연락처: `content/contact.yaml`
- 경력: `content/experiences/*.md`
- 프로젝트: `content/projects/*.md`
- 학력: `content/education/*.md`

연락처 YAML 필수 필드:

- `github.label: string`
- `github.url: string`
- `blog.label: string`
- `blog.url: string`
- `phone.label: string`
- `phone.value: string`

연락처 YAML 선택 필드:

- `phone.tel: string`

프로젝트 Markdown의 frontmatter 필수 필드:

- `title: string`
- `summary: string`
- `tech: string[]`

프로젝트 선택 필드:

- `period: string`
- `role: string`
- `order: number`
- `thumbnail: string`

경력/학력 Markdown의 frontmatter 필수 필드:

- `title: string`
- `organization: string`
- `period: string`
- `summary: string`

경력 선택 필드:

- `order: number`

학력 선택 필드:

- `order: number`
