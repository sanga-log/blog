import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/constants';

function renderBold(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith('**') && part.endsWith('**')
      ? <strong key={i} className="font-bold text-black">{part.slice(2, -2)}</strong>
      : part
  );
}

export const metadata: Metadata = {
  title: 'Resume',
  description: '프론트엔드 개발자 이상아의 이력서입니다.',
  alternates: {
    canonical: `${SITE_URL}/resume`,
  },
  openGraph: {
    title: 'Resume',
    description: '프론트엔드 개발자 이상아의 이력서입니다.',
    url: `${SITE_URL}/resume`,
  },
};

const skills = {
  '프레임워크': ['React', 'Next.js', 'Electron.js', 'Vue3', 'Vue2'],
  '언어 & 도구': ['TypeScript', 'JavaScript', 'Git'],
  '상태관리': ['Pinia', 'Vuex', 'TanStack Query', 'Recoil'],
  '빌드 & 기타': ['Vite', 'Webpack', 'i18n', 'Zod', 'Electron Builder'],
};

const experiences = [
  {
    company: '주식회사 김캐디',
    role: '프론트엔드 개발자',
    period: '2025.06 — 현재',
    description: [
      'B2B 사장님 솔루션(SaaS) 운영 및 고도화: **Electron** 기반 매장 관리 시스템의 유지보수와 신규 기능 개발, 안정적인 구독 서비스 제공으로 국내 890개 매장 운영 지원',
      'B2C 하이브리드 웹앱 개발 및 최적화: 국내 유저가 사용하는 김캐디 메인 서비스의 **웹뷰(WebView)** 영역 개발',
      '글로벌 플랫폼 **kaddie** 신규 런칭: 반응형 웹 기반 글로벌 서비스를 구축하여 창립 이래 최초의 해외 매출 발생 및 글로벌 시장 진출 기여',
      'AI 기술 내재화 및 전사 업무 자동화 주도: AI 코칭 프로젝트의 프론트엔드 전담 개발, GitHub Master 레포 요약 슬랙 봇 제작 등 AI 기술을 실무 프로세스에 도입하여 팀 생산성 향상 주도',
    ],
  },
  {
    company: '주식회사 스마트스코어',
    role: '프론트엔드 개발자',
    period: '2023.04 — 2025.06',
    description: [
      '국내 290만 유저와 370개 제휴 골프장을 지원하는 WebView 기반 하이브리드 앱 및 사내 Backoffice 개발',
      '국내외 공식 웹사이트 구축 및 제휴 골프장 전용 관리자 사이트 개발',
      '코드 리뷰 문화 개선 및 사내 리액트 스터디 리딩으로 기술 공유와 성장 문화 주도',
    ],
  },
];

const projects = [
  {
    name: '스마트스코어 국내외 공식 웹사이트',
    period: '2023.08 — 2025.03',
    tech: ['Vue3', 'TypeScript', 'Vite', 'i18n', 'Zod', 'Unhead'],
    items: [
      'Zod 스키마 기반 폼 유효성 검증 로직 재설계 — safeParse·refine·union으로 타입 안정성 및 조건별 에러 메시지 관리',
      'SEO 최적화 — 사이트맵, robots.txt, Schema.org 구조화 데이터 작성 및 @unhead/vue 동적 메타 관리, Lighthouse SEO 83 → 92점',
      '이미지 WebP 전환 및 preload·fetchpriority 적용 — LCP 6.6s → 0.9s (86%↓), CLS 0.737 → 0 (100%↓)',
      'i18n 활용 6개국 다국어 글로벌 웹사이트 개발 및 JSON 기반 번역 데이터 관리',
      '기기별 맞춤 번역 플러그인 개발 — 윈도우 리사이즈 이벤트로 디바이스 타입 감지, 반응형 환경의 레이아웃 깨짐 문제 해결',
    ],
  },
  {
    name: '모바일 네트워크 광고',
    period: '2024.12 — 2025.02',
    tech: ['Vue2', 'Webpack'],
    items: [
      '사내 최초 모바일 광고 시스템 도입 및 리워드 시스템 적용으로 사용자 참여 유도',
      '공통 믹스인 모듈 개발 — 모바일 OS 및 재생 위치별 Placement ID 상수화, 프로젝트 간 일관된 광고 호출 구조화',
      'idx 기반 광고 자동 매핑 설계 및 콜백 함수 분리 — 다양한 페이지에서 일관된 호출 구현, 유연한 후속 처리 지원',
      'Preload 기법 적용 — load·open 함수 호출 분리로 광고 로딩 시간 60% 단축 및 연속 재생 개선',
    ],
  },
  {
    name: '골프 매거진 코리아',
    period: '2024.06',
    tech: ['React', 'TypeScript', 'Vite', 'Vue2', 'Webpack'],
    items: [
      'KB카드 전용 결제 페이지 개발 — 맞춤형 결제 시스템 구축',
      '기존 Vue2 기반 결제 페이지를 React로 마이그레이션',
      'TypeScript 도입 — API 응답 구조 변경에 따른 데이터 타입 오류 방지 및 런타임 에러 사전 예방',
    ],
  },
  {
    name: '클럽 페이지',
    period: '2024.03 — 2024.06',
    tech: ['Vue3', 'Pinia', 'Highcharts', 'Vite'],
    items: [
      'Highcharts 기반 유저 통계 데이터 시각화 차트 및 사용자별 맞춤형 필터 기능 개발',
      'Intersection Observer API 활용 — Viewport 진입 차트만 호출하도록 최적화, TBT 약 90% 단축',
    ],
  },
  {
    name: '골프 커뮤니티',
    period: '2023.11 — 2023.12',
    tech: ['Vue2', 'Vuex', 'Webpack'],
    items: [
      '게시글·댓글 작성 기능 최초 구현 — Vuex 상태 관리로 댓글 작성·수정 기능 안정적으로 제공',
      'Optimistic Update 적용 — 서버 응답 전 UI 즉시 업데이트로 네트워크 응답 지연에 대한 UX 개선',
      'Android 웹뷰 키패드 하단 공백 이슈 해결 — User-Agent 감지로 Android 환경에서만 bottom 영역 0 처리',
      'Webpack 동적 import + webpackChunkName 코드 스플리팅 — 초기 번들 크기 절감',
    ],
  },
];

export default function ResumePage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">

      {/* 헤더 */}
      <section className="border-b border-black pb-12 mb-12">
        <h1 className="text-5xl font-black tracking-tight mb-6">RESUME</h1>
        <div className="flex flex-col gap-1.5">
          <p className="text-2xl font-black">이상아</p>
          <p className="text-base text-gray-500 font-medium">Frontend Developer</p>
          <div className="flex gap-4 mt-3 text-gray-400">
            <a href="mailto:comt.mix@gmail.com" aria-label="이메일" className="hover:text-black transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </a>
            <a href="https://github.com/sanga-log" target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-black transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a href="https://linkedin.com/in/sanga-log" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-black transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* 소개 */}
      <section className="mb-14">
        <h2 className="text-xs font-black tracking-widest uppercase mb-5 text-gray-400">About</h2>
        <p className="text-base leading-relaxed text-gray-700">
          더 나은 사용자 경험(UX)을 위해 고민하고,
          이를 개선하기 위한 기술적 도전에 관심이 많은 프론트엔드 개발자입니다.
        </p>
      </section>

      {/* 경력 */}
      <section className="mb-14">
        <h2 className="text-xs font-black tracking-widest uppercase mb-8 text-gray-400">Experience</h2>
        <div className="flex flex-col gap-10">
          {experiences.map((exp) => (
            <div key={exp.company} className="border-l-2 border-black pl-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-3">
                <div>
                  <p className="font-black text-lg">{exp.company}</p>
                  <p className="text-sm font-medium text-gray-500">{exp.role}</p>
                </div>
                <span className="text-xs font-bold text-gray-400 whitespace-nowrap mt-0.5">
                  {exp.period}
                </span>
              </div>
              <ul className="flex flex-col gap-1.5">
                {exp.description.map((desc, i) => (
                  <li key={i} className="text-sm leading-relaxed text-gray-600 flex items-start gap-2">
                    <span className="mt-[0.65em] w-1 h-1 rounded-full bg-black shrink-0" />
                    <span>{renderBold(desc)}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 프로젝트 */}
      <section className="mb-14">
        <h2 className="text-xs font-black tracking-widest uppercase mb-8 text-gray-400">Projects</h2>
        <div className="flex flex-col gap-10">
          {projects.map((project) => (
            <div key={project.name} className="border-l-2 border-black pl-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-3">
                <p className="font-black text-base">{project.name}</p>
                <span className="text-xs font-bold text-gray-400 whitespace-nowrap mt-0.5">
                  {project.period}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tech.map((t) => (
                  <span key={t} className="text-xs font-bold border border-gray-300 text-gray-500 px-2 py-0.5">
                    {t}
                  </span>
                ))}
              </div>
              <ul className="flex flex-col gap-1.5">
                {project.items.map((item, i) => (
                  <li key={i} className="text-sm leading-relaxed text-gray-600 flex items-start gap-2">
                    <span className="mt-[0.65em] w-1 h-1 rounded-full bg-black shrink-0" />
                    <span>{renderBold(item)}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 스킬 */}
      <section className="mb-14">
        <h2 className="text-xs font-black tracking-widest uppercase mb-8 text-gray-400">Skills</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category}>
              <p className="text-xs font-black tracking-widest uppercase mb-3 text-gray-400">
                {category}
              </p>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span key={skill} className="text-sm font-bold border border-black px-3 py-1">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 활동 */}
      <section>
        <h2 className="text-xs font-black tracking-widest uppercase mb-8 text-gray-400">Activities</h2>
        <div className="border-l-2 border-black pl-6">
          <p className="font-black text-base">MDN 공식문서 한글 번역 기여</p>
          <p className="text-sm text-gray-500 mt-1">MDN Web Docs 한국어 번역 프로젝트 참여</p>
        </div>
      </section>

    </div>
  );
}
