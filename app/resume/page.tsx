import Image from 'next/image';
import { Mail } from 'lucide-react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { SITE_URL } from '@/lib/constants';

export const metadata = {
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

function B({ children }: { children: React.ReactNode }) {
  return <strong className="font-bold text-black">{children}</strong>;
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs font-bold border border-gray-300 text-gray-500 px-2 py-0.5">
      {children}
    </span>
  );
}

function Dot() {
  return <span className="mt-[0.65em] w-1 h-1 rounded-full bg-black shrink-0 inline-block" />;
}

function CompanyIcon({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={40}
      height={40}
      className="rounded-lg shrink-0"
    />
  );
}

function Project({
  name,
  period,
  description,
  tags,
  items,
}: {
  name: string;
  period?: string;
  description: string;
  tags: string[];
  items: React.ReactNode[];
}) {
  return (
    <div className="mt-8 pt-8 border-t border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2">
        <p className="font-black text-sm">{name}</p>
        {period && (
          <span className="text-xs font-bold text-gray-400 whitespace-nowrap mt-0.5">{period}</span>
        )}
      </div>
      <p className="text-sm text-gray-500 mb-3 leading-relaxed">{description}</p>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {tags.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>
      <ul className="flex flex-col gap-1.5">
        {items.map((item, i) => (
          <li key={i} className="text-sm leading-relaxed text-gray-600 flex items-start gap-2">
            <Dot />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ResumePage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">

      {/* ── 헤더 ── */}
      <section className="border-b border-black pb-12 mb-12">
        <h1 className="text-5xl font-black tracking-tight mb-6">이상아</h1>
        <div className="flex items-center gap-5">
          {/* <Image
            src="/profile.jpg"
            alt="이상아 프로필"
            width={64}
            height={64}
            className="rounded-full object-cover w-16 h-16 shrink-0"
          /> */}
          <div className="flex flex-col gap-1.5">
            <p className="text-2xl font-black">Frontend Engineer</p>
            <div className="flex gap-4 mt-3 text-gray-400">
              <a href="mailto:comt.mix@gmail.com" aria-label="이메일" className="hover:text-black transition-colors">
                <Mail size={18} />
              </a>
              <a href="https://github.com/sanga-log" target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-black transition-colors">
                <FaGithub size={18} />
              </a>
              <a href="https://linkedin.com/in/sanga-log" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-black transition-colors">
                <FaLinkedinIn size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section className="mb-14">
        <h2 className="text-xs font-black tracking-widest uppercase mb-5 text-gray-400">About</h2>
        <p className="text-base leading-relaxed text-gray-700">
          사용자의 불편함에 빠르게 반응하는 것을 중요하게 생각합니다.
          같은 문제가 반복되지 않도록 구조를 고민하고,
          손이 많이 가는 일은 자동화로 풀어내 팀이 더 중요한 일에 집중할 수 있도록 돕고 있습니다.
        </p>
      </section>

      {/* ── Experience ── */}
      <section className="mb-14">
        <h2 className="text-xs font-black tracking-widest uppercase mb-8 text-gray-400">Experience</h2>
        <div className="flex flex-col gap-16">

          {/* ════ 김캐디 ════ */}
          <div>
            {/* 회사 헤더 */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-1">
              <div className="flex items-center gap-3">
                <CompanyIcon src="/kimcaddie-logo.png" alt="김캐디 로고" />
                <div>
                  <p className="font-black text-lg">주식회사 김캐디</p>
                </div>
              </div>
              <span className="text-xs font-bold text-gray-400 whitespace-nowrap mt-0.5">2025.06 — 현재</span>
            </div>
            <p className="text-sm text-gray-500 ml-[52px] mb-2 leading-relaxed">
              전국 6,000여 개 골프 시설을 비교·예약할 수 있는 골프 테크 플랫폼 (누적 200만+ 다운로드)
            </p>

            {/* 프로젝트 nested */}
            <div className="pl-6 ml-[52px]">

              <Project
                name="AI Coach — AI 기반 골프 스윙 분석 데스크톱 앱"
                period="2025.07 — 현재"
                description="스크린골프 매장에서 실시간 스윙을 분석·코칭하는 Electron 데스크톱 앱. 프론트엔드 전담(1인)으로 초기 설계부터 운영까지 담당."
                tags={['React', 'TypeScript', 'Electron', 'Recoil', 'WebSocket(STOMP)', 'ECharts', 'AWS S3', 'i18next']}
                items={[
                  <>&ldquo;무인 매장 사업인데, 정작 배포는 전혀 무인화가 안 됐다&rdquo;는 문제를 직접 발견하고 단계적으로 자동화를 확장: 빌드 스크립트 분리 → <code>--publish always</code>로 S3 자동 업로드 → electron-updater Silent 설치로 매장 방문 제거 → MAC Address 기반 서버 API 조회로 매장·룸·영상 경로 설정까지 자동화. <B>새 매장 추가 95% 단축</B>(1시간 → 3분)</>,
                  <>STOMP 장시간 연결 에러 원인을 &ldquo;클라이언트가 오래된 세션을 재사용&rdquo;으로 진단하고 <B>서버 세션을 source of truth</B>로 재설계. 나노초 단위 타임스탬프 커스텀 파서로 비동기 메시지 정렬 문제까지 해결 — 장시간 사용 에러 0건 달성</>,
                  <>스윙 영상 3개 업로드 중 AI 피드백이 비동기로 도착해 순서가 꼬이는 문제를 <B>메시지 버퍼링 큐 아키텍처</B>로 해결. 새로고침 시 기존 메시지가 재수신되며 순서가 뒤섞이는 문제도 <code>pageLoadTime</code> 기반 초기 로드 감지 + <code>sessionStorage</code> 재생 이력 추적으로 동시 해결</>,
                  <>무인 매장 특성상 터미널 접근이 불가능한 환경에서 원격 디버깅 수단이 없다는 문제를 인식, electron-log 기반 <B>프로덕션 로깅 인프라</B>를 구축. 실행 파일 옆 로그 파일 자동 생성으로 현장 방문 없이 문제 재현·원인 파악 가능한 구조 확립</>,
                  <>619줄짜리 모놀리식 <code>electron.js</code>를 <code>ipc/</code>·<code>utils/</code>·<code>constants.js</code>로 분리하고 <B>Facade 패턴</B>으로 IPC 핸들러를 일괄 등록. 윈도우 크기·URL·패딩 등 매직 넘버를 <code>constants.js</code>로 중앙화하여 변경 포인트를 단일화</>,
                ]}
              />

              <Project
                name="Kaddie Web — 글로벌 골프장 예약 B2C 웹 서비스"
                period="2025.09 — 현재"
                description="김캐디의 해외 골프장 예약 웹. 초기 아키텍처 설계부터 전 기능 개발·런칭까지 전담 (187 commits, 전체의 47.5%). 회사 최초 해외 매출 달성."
                tags={['React', 'TypeScript', 'Recoil', 'Stripe', 'Docker', 'Nginx', 'AWS ECR/ECS']}
                items={[
                  <>매장마다 다른 요일별 운영시간·게임 소요시간·룸 구성을 모두 프론트엔드에서 검증해야 하는 부킹 시스템을 설계. 자정 넘김 보정, 플레이타임 역산 마감 차단, 분 슬롯→정각 상향 전파 등 <B>복합 조건의 예약 충돌 검증 로직</B>을 구현하여 잘못된 예약 생성을 시스템 레벨에서 원천 차단</>,
                  <>Stripe Webhook 비동기 처리 + 자체 DB 반영 지연으로 결제 직후 상세 내역을 즉시 표시할 수 없는 문제를 인식. 결제 완료 화면에서 서버 상태를 <B>폴링(5초 → 1초 최적화)</B>하며 Stripe↔서버 간 eventual consistency를 UX로 자연스럽게 흡수하고, debounce로 결제 버튼 중복 클릭에 의한 이중 과금을 원천 차단</>,
                  <>Google Sheets 기반 <B>번역 자동 빌드 파이프라인</B> + AWS Secrets Manager 기반 시크릿 관리 도입으로 다국어·환경 설정 자동화</>,
                ]}
              />

              <Project
                name="김캐디 앱 — AI 코칭 모바일 웹뷰"
                period="2025.07 — 현재"
                description="앱에서 AI 코칭 결과를 확인하고 참여할 수 있는 Next.js 기반 모바일 웹뷰. AI 코칭 도메인 프론트엔드 전담."
                tags={['Next.js', 'React', 'TypeScript', 'React Query', 'Recoil', 'STOMP(WebSocket)', 'HLS.js', 'MediaRecorder API']}
                items={[
                  <>키오스크(하드웨어)와 모바일 웹을 실시간 동기화하는 양방향 통신 설계. 스윙 영상 업로드 중 AI 응답이 동시 도착해 UI가 불안정해지는 문제를 <B>메시지 버퍼링 큐 아키텍처</B>로 해결</>,
                  <>외부 STT 라이브러리의 Web Worker 호환성 문제를 진단하고 네이티브 <B>MediaRecorder API</B>로 전환 — 269줄의 불필요한 의존성 제거, 상태머신 패턴의 <code>useSTT</code>로 중복 호출 버그 근본 해결</>,
                  <>Android/iOS 네이티브 브릿지 인터페이스(<code>AiBridge</code>) 설계, 백엔드·네이티브·키오스크 팀과 WebSocket 프로토콜 및 API 스펙 협의·통합</>,
                ]}
              />

              <Project
                name="사장님 솔루션 — 스크린골프 매장 B2B SaaS"
                period="2025.07 — 현재"
                description="골프 매장 사장님을 위한 B2B SaaS. PC + 모바일 프론트엔드 개발 담당. 국내 890개 매장 운영 지원."
                tags={['React', 'TypeScript', 'Electron', 'Recoil', 'MUI 5', 'Socket.IO', 'React Hook Form']}
                items={[
                  <>모바일 화면 전체를 새로운 <B>디자인 시스템 10종</B>(Badge, BottomSheet, Button, Card 등)으로 주도적 구축·적용하여 UI 전면 개편</>,
                ]}
              />

              {/* 전사 업무 자동화 */}
              <Project
                name="전사 업무 자동화"
                description="반복되는 비효율을 발견하면 자동화로 해결. AI 기반 워크플로우를 팀 전체에 전파."
                tags={[]}
                items={[
                  <>주간 배포 요약 슬랙 자동화 — GitHub 각 레포 PR을 자동 수집·요약해 전사 슬랙 채널에 발행, 비개발자도 배포 내역 즉시 파악 가능</>,
                  <>SVG 도면 변환 자동화 — 골프장 매장 도면 room_id 매핑 수동 작업(1시간+)을 수 분으로 단축, 디자이너 단독 실행 가능한 구조로 전환</>,
                  <>영업 지원용 Google Sheets 자동 적재 (Apps Script)</>,
                ]}
              />

            </div>
          </div>

          {/* ════ 스마트스코어 ════ */}
          <div>
            {/* 회사 헤더 */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-1">
              <div className="flex items-center gap-3">
                <CompanyIcon src="/smartscore-logo.png" alt="스마트스코어 로고" />
                <div>
                  <p className="font-black text-lg">주식회사 스마트스코어</p>
                </div>
              </div>
              <span className="text-xs font-bold text-gray-400 whitespace-nowrap mt-0.5">2023.04 — 2025.06</span>
            </div>
            <p className="text-sm text-gray-500 ml-[52px] mb-2 leading-relaxed">
              360만+ 골퍼가 사용하는 국내 1위 골프 O2O 플랫폼
            </p>

            {/* 프로젝트 nested */}
            <div className="pl-6 ml-[52px]">

              <Project
                name="국내외 공식 웹사이트"
                period="2023.08 — 2025.03"
                description="스마트스코어 국내 및 해외 공식 웹사이트 구축. 6개국 다국어 지원."
                tags={['Vue3', 'TypeScript', 'Vite', 'i18n', 'Zod', 'Unhead']}
                items={[
                  <>이미지 WebP 전환 + preload·fetchpriority 적용 — <B>LCP 6.6s → 0.9s (86%↓)</B>, CLS 0.737 → 0 (100%↓)</>,
                  <>Zod 스키마 기반 유효성 검증 재설계, SEO 최적화(사이트맵·robots.txt·Schema.org) — <B>Lighthouse SEO 83 → 92점</B></>,
                  <>기기별 맞춤 번역 플러그인 자체 개발 — 윈도우 리사이즈 이벤트로 디바이스 타입 감지, 반응형 레이아웃 깨짐 문제 해결</>,
                ]}
              />

              <Project
                name="클럽 페이지 — 골프장 운영 데이터 대시보드"
                period="2024.03 — 2024.06"
                description="골프장 운영자를 위한 내장객 분석 및 매장 운영 지표 시각화 대시보드."
                tags={['Vue3', 'Pinia', 'Highcharts', 'Vite']}
                items={[
                  <>Highcharts 기반 유저 통계 시각화 차트 및 사용자별 맞춤형 필터 개발</>,
                  <>Intersection Observer API — Viewport 진입 차트만 호출하도록 최적화, <B>TBT 약 90% 단축</B></>,
                ]}
              />

              <Project
                name="모바일 네트워크 광고 시스템"
                period="2024.12 — 2025.02"
                description="사내 최초 모바일 네트워크 광고 시스템 기획부터 도입. 여러 프로젝트에 재사용 가능한 공통 모듈로 설계."
                tags={['Vue2', 'Webpack']}
                items={[
                  <>Preload 기법으로 load·open 함수 호출 분리 — <B>광고 로딩 시간 60% 단축</B>, 연속 재생 UX 구현</>,
                  <>공통 Mixin 모듈 설계 — OS·Placement ID 상수화, 프로젝트 간 일관된 광고 호출 구조화</>,
                ]}
              />

              <Project
                name="골프 매거진 코리아 — KB카드 전용 결제 페이지"
                period="2024.06"
                description="KB카드 전용 결제 기능 추가 및 기존 Vue2 결제 페이지 React 마이그레이션."
                tags={['React', 'TypeScript', 'Vite', 'Vue2', 'Webpack']}
                items={[
                  <>사내 스터디에서 학습한 React를 실무 최초 적용 — Vue2 기반 결제 페이지를 <B>React + TypeScript로 마이그레이션</B>, API 응답 타입 안정성 확보로 런타임 에러 사전 예방</>,
                ]}
              />

              <Project
                name="골프 커뮤니티 — 게시글 및 댓글 시스템"
                period="2023.11 — 2023.12"
                description="앱 내 사용자 참여 활성화를 위한 게시글·댓글 시스템 최초 구현."
                tags={['Vue2', 'Vuex', 'Webpack']}
                items={[
                  <><B>Optimistic Update</B> 적용 — 서버 응답 전 UI 즉시 반영으로 네트워크 지연 UX 개선</>,
                  <>Webpack 동적 import + webpackChunkName <B>코드 스플리팅</B> — 초기 번들 크기 절감</>,
                  <>Android 웹뷰 키패드 하단 공백 이슈 해결 — User-Agent 감지로 Android 환경에서만 bottom 영역 0 처리</>,
                ]}
              />

            </div>
          </div>

        </div>
      </section>

      {/* ── Skills ── */}
      <section className="mb-14">
        <h2 className="text-xs font-black tracking-widest uppercase mb-8 text-gray-400">Skills</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p className="text-xs font-black tracking-widest uppercase mb-3 text-gray-400">프레임워크</p>
            <div className="flex flex-wrap gap-2">
              {['React', 'Next.js', 'Electron.js', 'Vue3', 'Vue2'].map((s) => (
                <span key={s} className="text-sm font-bold border border-black px-3 py-1">{s}</span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-black tracking-widest uppercase mb-3 text-gray-400">언어 & 도구</p>
            <div className="flex flex-wrap gap-2">
              {['TypeScript', 'JavaScript', 'Git'].map((s) => (
                <span key={s} className="text-sm font-bold border border-black px-3 py-1">{s}</span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-black tracking-widest uppercase mb-3 text-gray-400">상태관리</p>
            <div className="flex flex-wrap gap-2">
              {['Recoil', 'TanStack Query', 'Vuex', 'Pinia'].map((s) => (
                <span key={s} className="text-sm font-bold border border-black px-3 py-1">{s}</span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-black tracking-widest uppercase mb-3 text-gray-400">빌드 & 기타</p>
            <div className="flex flex-wrap gap-2">
              {['Vite', 'Webpack', 'Docker', 'AWS', 'i18n', 'Zod', 'Stripe', 'Electron Builder'].map((s) => (
                <span key={s} className="text-sm font-bold border border-black px-3 py-1">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Activities ── */}
      <section>
        <h2 className="text-xs font-black tracking-widest uppercase mb-8 text-gray-400">Activities</h2>
        <div className="flex flex-col gap-6">
          <div className="border-l-2 border-black pl-6">
            <p className="font-black text-base">MDN 공식문서 한글 번역 기여</p>
            <p className="text-sm text-gray-500 mt-1">MDN Web Docs 한국어 번역 프로젝트 참여</p>
          </div>
          <div className="border-l-2 border-black pl-6">
            <p className="font-black text-base">AI 개발 워크플로우 자동화 — 팀 블로그 기고</p>
            <p className="text-sm text-gray-500 mt-1">SVG 도면 변환 자동화, GitHub PR 요약 슬랙 봇 제작 과정을 김캐디 팀 블로그에 공유</p>
          </div>
        </div>
      </section>

    </div>
  );
}
