# sanga-log

프론트엔드 개발자 이상아의 기술 블로그입니다.
프론트엔드 개발 경험, 기술 아티클, 회고를 기록하고 있습니다.

> https://sangalog.com

## About

글을 읽는 데 집중할 수 있도록 흑백 에디토리얼 스타일로 디자인했습니다.
블로그 외에도 이력서와 연락처 페이지를 함께 운영하고 있어, 하나의 사이트에서 저에 대해 알아볼 수 있습니다.

## Features

- **MDX 기반 블로그** — gray-matter와 next-mdx-remote를 활용해 마크다운으로 포스트를 작성하고 관리합니다.
- **카테고리 필터링** — 카테고리별로 포스트를 모아볼 수 있습니다.
- **조회수 집계** — Upstash Redis를 통해 게시물별 조회수를 실시간으로 집계합니다.
- **SEO 최적화** — sitemap, robots.txt, Open Graph, JSON-LD, RSS 피드까지 갖추고 있습니다.
- **반응형 레이아웃** — 모바일 환경에서도 쾌적하게 읽을 수 있습니다.

## Tech Stack

| Category | Stack |
|----------|-------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Content | MDX (gray-matter + next-mdx-remote) |
| Database | Upstash Redis |
| Deploy | Vercel |

## Getting Started

```bash
npm install
npm run dev
```

http://localhost:3000 에서 확인할 수 있습니다.

## License

MIT
