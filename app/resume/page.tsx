import Image from "next/image";
import { Mail, ExternalLink } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { SITE_URL } from "@/lib/constants";

export const metadata = {
  title: "Resume",
  description: "프론트엔드 개발자 이상아의 이력서입니다.",
  alternates: {
    canonical: `${SITE_URL}/resume`,
  },
  openGraph: {
    title: "Resume",
    description: "프론트엔드 개발자 이상아의 이력서입니다.",
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
  return (
    <span className="mt-[0.65em] w-1 h-1 rounded-full bg-black shrink-0 inline-block" />
  );
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
  first = false,
}: {
  name: string;
  period?: string;
  description: string;
  tags: string[];
  items: React.ReactNode[];
  first?: boolean;
}) {
  return (
    <div className={first ? "" : "mt-10 pt-10 border-t border-gray-100"}>
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2">
        <p className="font-black text-base">{name}</p>
        {period && (
          <span className="text-xs font-bold text-gray-400 whitespace-nowrap mt-0.5">
            {period}
          </span>
        )}
      </div>
      <p className="text-sm text-gray-500 mb-3 leading-relaxed">
        {description}
      </p>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {tags.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>
      <ul className="flex flex-col gap-3">
        {items.map((item, i) => (
          <li
            key={i}
            className="text-sm leading-[1.75] text-gray-600 flex items-start gap-2"
          >
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
      <section className="border-b border-black pb-12 mb-14">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <p className="text-xs font-black tracking-widest uppercase text-gray-400 mb-3">
              Frontend Engineer
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-none">
              이상아
            </h1>
          </div>
          <div className="flex gap-5 text-gray-400 sm:mb-3">
            <a
              href="mailto:comt.mix@gmail.com"
              aria-label="이메일"
              className="hover:text-black transition-colors"
            >
              <Mail size={20} />
            </a>
            <a
              href="https://github.com/sanga-log"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="hover:text-black transition-colors"
            >
              <FaGithub size={20} />
            </a>
            <a
              href="https://linkedin.com/in/sanga-log"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="hover:text-black transition-colors"
            >
              <FaLinkedinIn size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section className="mb-14">
        <h2 className="text-xs font-black tracking-widest uppercase mb-8 text-gray-400">
          About
        </h2>

        {/* Hook — 통일 스타일 (정체성 + 가치 한 묶음) */}
        <p className="text-xl sm:text-2xl font-semibold tracking-tight leading-snug mb-8 text-black">
          B2B 영업 7년 <span className="text-gray-300">→</span> 프론트엔드
          개발자.
          <br />
          현장의 문제를 직접 코드로 풉니다.
        </p>

        {/* 본문 */}
        <div className="flex flex-col gap-4">
          <p className="text-sm leading-relaxed text-gray-700">
            300명 조직과 30명 조직을 모두 거치며, 팀 규모에 따라 협업 방식과
            의사결정 속도가 어떻게 달라지는지 직접 경험했습니다.
          </p>
          <p className="text-sm leading-relaxed text-gray-700">
            B2B 제품을 중심으로 B2C 서비스까지 함께 만듭니다. 반복 수작업은
            자동화로 옮기고, 버그는 한 번 패치하기보다 같은 버그가 다시 나오지
            않도록 구조를 바꾸는 쪽을 택합니다.
          </p>
        </div>
      </section>

      {/* ── Experience ── */}
      <section className="mb-14">
        <h2 className="text-xs font-black tracking-widest uppercase mb-8 text-gray-400">
          Experience
        </h2>
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
              <span className="text-xs font-bold text-gray-400 whitespace-nowrap mt-0.5">
                2025.06 — 현재
              </span>
            </div>
            <p className="text-sm text-gray-500 ml-13 mb-6 leading-relaxed">
              전국 6,000여 개 골프 시설을 비교·예약할 수 있는 골프 테크 플랫폼
              (누적 200만+ 다운로드)
            </p>

            {/* 프로젝트 nested */}
            <div className="pl-6 ml-13">
              <Project
                first
                name="AI Coach — AI 기반 골프 스윙 분석 데스크톱 앱"
                period="2025.07 — 현재"
                description="무인 스크린골프 매장에서 고객이 직접 실시간 스윙을 분석·코칭받는 Electron 데스크톱 앱. 프론트엔드 1인 전담으로 초기 설계부터 운영까지 책임."
                tags={[
                  "React",
                  "TypeScript",
                  "Electron",
                  "Recoil",
                  "WebSocket",
                  "ECharts",
                  "AWS",
                  "i18next",
                ]}
                items={[
                  <>
                    &ldquo;무인 매장에서 사용하는 서비스인데, 빌드·배포·운영
                    관측이 수작업에 의존한다&rdquo;고 판단하여 단계적으로
                    자동화를 확장: 빌드 스크립트 분리 →{" "}
                    <code>--publish always</code>로 S3 자동 업로드 →
                    electron-updater Silent 설치 → 사전 등록된 MAC Address 기반
                    서버 API 조회로 매장·룸·경로 설정까지 자동화 —{" "}
                    <B>매장 설치·업데이트 현장 방문 제거</B>
                  </>,
                  <>
                    WebSocket으로 비동기 도착하는 AI 피드백의 순서가 꼬이는
                    문제를, <code>useRef</code> 버퍼링 큐 + ISO timestamp 나노초
                    정렬로 해결. 새로고침 시 재수신 메시지로 TTS가 재생되는
                    부작용은 모듈 스코프 <code>pageLoadTime</code> 윈도우 +{" "}
                    <code>sessionStorage</code> 재생 이력{" "}
                    <B>두 게이트 AND</B>로 차단
                  </>,
                  <>
                    AI 피드백에 사용자 기기 화면 컨텍스트(타석·샷 정보)가 빠져
                    정확도 한계가 있던 문제를, Electron{" "}
                    <code>desktopCapturer</code>로 메인 프로세스에서 화면을
                    캡처해 IPC → FormData 첨부 파이프라인으로 해결.{" "}
                    <B>
                      &ldquo;선택 데이터(스크린샷) 실패가 필수 데이터(영상)
                      전송을 막아선 안 된다&rdquo;
                    </B>
                    는 원칙으로 <code>captureScreenSafe()</code> 래퍼에서 실패
                    시 <code>null</code> 반환으로 격리
                  </>,
                  <>
                    다국어 적용을 정적 텍스트 치환에서 끝내지 않고,{" "}
                    <code>languageTypeCd</code>를 서버에 동행시켜{" "}
                    <B>AI 코칭 응답·TTS 음성까지 다국어 동기화</B>. 코칭 도중
                    언어 변경 시 이전 언어 음성이 TTS 큐에 남아 잘못 재생되던
                    문제를 발견, 언어 변경 직전 <code>stopCurrentTTS()</code>·
                    <code>resetTTSSession()</code> 강제 호출 + 변경 가능 시점을
                    메인 진입 모달로 제한하는 UX 정책으로 해결
                  </>,
                  <>
                    <code>contextIsolation: false</code>로 인한 XSS 위험을
                    인지하고 <code>contextBridge</code> 기반 최소 권한 API 노출
                    구조로 재설계. 6개 렌더러 파일에 복붙되어 있던 타입
                    선언/초기화 블록을 <code>electron.d.ts</code>로 통합하고
                    23곳의 <code>ipcRenderer</code> 호출을 새 API로 일괄 전환 —{" "}
                    <B>중복 setup 코드 73줄 → 22줄 (70%↓)</B>
                  </>,
                ]}
              />

              <Project
                name="Kaddie Web — 글로벌 골프장 예약 B2C 웹 서비스"
                period="2025.09 — 현재"
                description="김캐디의 해외 스크린 골프 및 연습장 예약 웹. 초기 아키텍처 설계부터 핵심 기능 개발·런칭 주도. 회사 최초 해외 매출 달성."
                tags={[
                  "React",
                  "TypeScript",
                  "Recoil",
                  "Stripe",
                  "Docker",
                  "Nginx",
                  "AWS ECR/ECS",
                ]}
                items={[
                  <>
                    매장마다 다른 요일별 운영시간·게임 소요시간·룸 구성을 모두
                    프론트엔드에서 검증해야 하는 부킹 시스템을 설계. 자정 넘김
                    보정, 플레이타임 역산 마감 차단, 분 슬롯→정각 상향 전파 등{" "}
                    <B>복합 조건의 예약 충돌 검증 로직</B>을 구현하여 잘못된
                    예약 생성을 시스템 레벨에서 원천 차단
                  </>,
                  <>
                    Stripe Webhook 비동기 처리로 결제 직후 서버 상태가 즉시
                    반영되지 않는 문제를 인지. 결제 완료 화면에서 N회 재시도 +
                    타임아웃 시 실패 화면 fallback이 있는 폴링으로 eventual
                    consistency를 UX 레이어에서 흡수.{" "}
                    <code>isSubmitting</code>(API 호출 중) /{" "}
                    <code>isProcessing</code>(폴링 중) <B>이중 상태 가드</B>로
                    폴링 중 중복 결제 차단
                  </>,
                  <>
                    JS 부동소수점 누적 오차로 미국 매장 결제에{" "}
                    <B>1센트 단위 오차</B>가 발생하던 이슈를 발견,{" "}
                    <code>(amount/100).toFixed(2)</code> 정규화 후 정수 단위로
                    백엔드 전송하는 컨벤션으로 통일. 매장{" "}
                    <code>currencyConfig</code> 기반 통화 동적 표시까지 포함해
                    다국가 결제 정합성 확보
                  </>,
                  <>
                    비개발자가 Google Sheets만 수정하면 빌드 시 6개 언어 locale
                    JSON으로 자동 동기화되는 prebuild 파이프라인 구축. MD5 해시
                    캐싱으로 변경 키만 부분 갱신, 누락 키는 default 언어
                    fallback. 의존성으로 따라온 Service Account 키 운반 문제는{" "}
                    <B>AWS Secrets Manager로 일원화</B>해 시크릿 채널을 인프라
                    표준으로 통합
                  </>,
                ]}
              />

              <Project
                name="사장님 솔루션 — 스크린골프 매장 B2B SaaS"
                period="2025.07 — 현재"
                description="골프 매장 사장님을 위한 B2B SaaS. PC + 모바일 프론트엔드 개발 담당. 국내 890개 매장 운영 지원."
                tags={[
                  "React",
                  "TypeScript",
                  "Electron",
                  "Recoil",
                  "MUI 5",
                  "Socket.IO",
                  "React Hook Form",
                  "Zod",
                ]}
                items={[
                  <>
                    <code>weekday</code> 필드가 실제 요일이 아닌 카테고리
                    코드(&ldquo;1&rdquo;=평일, &ldquo;2&rdquo;=공휴일,
                    &ldquo;4&rdquo;=포썸)로 쓰이던 레거시 구조 변경을 백엔드
                    개발자에게 제안하고 <code>price_category_cd</code> 필드 추가
                    협의. 기존 데이터 호환성을 위해 &ldquo;새 필드가 있으면
                    사용, 없으면 기존 필드 매핑&rdquo; 폴백 전략을 도입하여{" "}
                    <B>빅뱅 마이그레이션 없이 점진적 전환 기반 마련</B>.
                    상수·그룹핑·라벨·폴백을 단일 파일로 응집시켜 도메인 의미와
                    코드 구조를 일치시킴
                  </>,
                  <>
                    React Router v5 환경에서 페이지 이탈 방지 기능을 구현하며,
                    <B>
                      &ldquo;리렌더링이 필요한 상태&rdquo;와 &ldquo;참조만 필요한
                      상태&rdquo;를 분리
                    </B>
                    하는 원칙으로 <code>useState</code>/<code>useRef</code>{" "}
                    배치. 팝업 표시만 <code>useState</code>로, 이동 경로·block
                    해제 함수는 <code>useRef</code>로 관리
                  </>,
                  <>
                    가격 제출 검증이 최종 단계에 몰려 사용자가 전 과정을 거친
                    뒤에야 에러를 만나는 구조를,{" "}
                    <B>&ldquo;가장 먼저 알 수 있는 시점에서 차단&rdquo;</B>{" "}
                    원칙으로 재설계. 추가·수정·삭제 진입 시 검수중 상태 즉시
                    차단, 폼 저장 시 <code>useRef</code> 스냅샷 비교로 변경 없음
                    사전 감지. 이 과정에서 stale state 참조 버그를 발견하고 함수
                    인자 직접 전달 방식으로 수정
                  </>,
                  <>
                    외부 폼(JotForm)으로 운영하던 매장 양도양수 신청을
                    react-hook-form + zod 기반 자체 React 페이지로 전환.
                    양도인/양수인 역할별 필수 필드 차이를 schema 두 벌로 나누지
                    않고 zod <code>superRefine</code>으로 한 schema 안에서 분기.{" "}
                    <code>trigger</code>로 현재 step 필드만 검증 + 양도인·양수인
                    전화번호 중복 같은 필드 간 검증은 <code>setError</code>로
                    &ldquo;다음&rdquo; 클릭 시점에 즉시 노출하는{" "}
                    <B>다단계 검증 구조</B>로 설계
                  </>,
                ]}
              />

              {/* 전사 업무 자동화 */}
              <Project
                name="전사 업무 자동화"
                description="현장에서 마주친 반복 작업을 자동화로 옮기고, 동료가 그대로 가져다 쓸 수 있게 사내 가이드·블로그로 공유."
                tags={[]}
                items={[
                  <>
                    주간 배포 요약 슬랙 자동화 — GitHub 각 레포 PR을 자동
                    수집·요약해 전사 슬랙 채널에 발행, 비개발자도 배포 내역 즉시
                    파악 가능
                  </>,
                  <>
                    SVG 도면 변환 자동화 — 골프장 매장 도면 room_id 매핑 수동
                    작업(1시간+)을 수 분으로 단축, 디자이너 단독 실행 가능한
                    구조로 전환
                  </>,
                  <>
                    영업팀이 사이트 배너·입력폼 접수 알림을 슬랙에서만 받아
                    검색·관리가 어렵던 구조를, Apps Script로 Google Sheets에
                    자동 적재 —{" "}
                    <B>리드를 날짜별 분류·필터링·담당자 지정으로 관리</B>
                  </>,
                ]}
              />
            </div>
          </div>

          {/* ════ 스마트스코어 ════ */}
          <div>
            {/* 회사 헤더 */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-1">
              <div className="flex items-center gap-3">
                <CompanyIcon
                  src="/smartscore-logo.png"
                  alt="스마트스코어 로고"
                />
                <div>
                  <p className="font-black text-lg">주식회사 스마트스코어</p>
                </div>
              </div>
              <span className="text-xs font-bold text-gray-400 whitespace-nowrap mt-0.5">
                2023.04 — 2025.06
              </span>
            </div>
            <p className="text-sm text-gray-500 ml-13 mb-6 leading-relaxed">
              360만+ 골퍼가 사용하는 국내 1위 골프 O2O 플랫폼
            </p>

            {/* 프로젝트 nested */}
            <div className="pl-6 ml-13">
              <Project
                first
                name="국내외 공식 웹사이트"
                period="2023.08 — 2025.03"
                description="스마트스코어 국내 및 해외 공식 웹사이트 구축. 6개국 다국어 지원."
                tags={["Vue3", "TypeScript", "Vite", "i18n", "Zod", "Unhead"]}
                items={[
                  <>
                    이미지 WebP 전환 + preload·fetchpriority 적용 —{" "}
                    <B>LCP 6.6s → 0.9s (86%↓)</B>, CLS 0.737 → 0
                  </>,
                  <>
                    신규 도메인 이전(<code>smartscore.kr</code> →{" "}
                    <code>smartscore.global/kr/</code>) 시 검색 색인 리셋 위험을
                    인지하고, 사이트맵·robots.txt·Schema.org + Unhead 기반
                    라우터 통합 메타데이터 관리로 SEO 세팅 —{" "}
                    <B>Lighthouse SEO 83 → 92점</B>
                  </>,
                  <>
                    폼 검증을 위해 vee-validate·vuelidate 같은 풀 폼 라이브러리
                    도입 대신, <B>검증 로직만 Zod로 분리</B>하는 선택. 필드별로
                    흩어져 있던 정규표현식을 단일 스키마로 응집하고,{" "}
                    <code>isSubmitted</code> 상태로 첫 진입 에러 숨김 + 제출 후
                    실시간 검증 UX 적용
                  </>,
                ]}
              />

              <Project
                name="클럽 페이지 — 골프장 운영 데이터 대시보드"
                period="2024.03 — 2024.06"
                description="골프장 운영자를 위한 내장객 분석 및 매장 운영 지표 시각화 대시보드."
                tags={["Vue3", "Pinia", "Highcharts", "Vite"]}
                items={[
                  <>
                    8개 차트 동시 호출로 초기 로드가 30초까지 걸리던 문제를,{" "}
                    <B>백엔드와 병목 API 분리·캐싱 협업</B>으로 1차 단축
                  </>,
                  <>
                    차트 동시 렌더링으로 길어지던 메인 스레드 블로킹은
                    Intersection Observer 기반 lazy loading으로 해결 —{" "}
                    <B>TBT 3,180ms → 320ms (90%↓)</B>
                  </>,
                ]}
              />

              <Project
                name="모바일 네트워크 광고 시스템"
                period="2024.12 — 2025.02"
                description="사내 최초 모바일 네트워크 광고 시스템 기획부터 도입. 여러 프로젝트에 재사용 가능한 공통 모듈로 설계."
                tags={["Vue2", "Webpack"]}
                items={[
                  <>
                    광고 호출 시 라이브러리 로딩으로 노출이 지연되고, load·open
                    동시 호출 시 페이지 이탈하면 다른 페이지에서 광고가 뜨는
                    race도 발생하던 구조를, 사용자 흐름에 따라{" "}
                    <B>
                      <code>preload</code> / <code>load</code> /{" "}
                      <code>open</code> 3단계로 분리
                    </B>{" "}
                    + <code>RepeatableLoad</code> 옵션으로 Open/Close 후 자동
                    재 Load — 모든 흐름에서 끊김 없이 즉시 노출
                  </>,
                  <>
                    <B>
                      4가지 광고 타입(InterstitialImage / InterstitialVideo /
                      RewardVideo / BottomModal)
                    </B>
                    을 통합 처리하는 공통 Mixin 모듈 설계 — OS·Placement ID
                    상수화, 각 타입별 콜백 액션 매핑(<code>RewardVideo</code>는
                    영상 시청 완료 여부 <code>status: completed/skipped</code>{" "}
                    분기), <code>idx</code>만으로 광고 호출 가능한 구조로 일원화
                  </>,
                  <>
                    포인트 전환 버튼이 클릭마다 포인트 차감되는 흐름에서,
                    5회/10회 진입 시 5초 전면 비디오 광고 트리거. 광고
                    로딩(4~10초) + 재생(5초) 동안 추가 클릭으로 포인트만 계속
                    차감되던 문제를,{" "}
                    <B>
                      광고 호출 시 카운팅 플래그를 false로 잠그고{" "}
                      <code>OnInterstitialVideoAdClosed</code> 콜백에서 true로
                      복귀
                    </B>
                    하는 가드로 해결
                  </>,
                ]}
              />

            </div>
          </div>
        </div>
      </section>

      {/* ── Activities ── */}
      <section>
        <h2 className="text-xs font-black tracking-widest uppercase mb-8 text-gray-400">
          Activities
        </h2>
        <div className="flex flex-col gap-6">
          <div className="border-l-2 border-black pl-6">
            <p className="font-black text-base">MDN 공식문서 한글 번역 기여</p>
            <p className="text-sm text-gray-500 mt-1">
              MDN Web Docs 한국어 번역 프로젝트 참여
            </p>
            <a
              href="https://github.com/mdn/translated-content/pull/18975"
              target="_blank"
              rel="noreferrer"
              aria-label="MDN 번역 기여 PR #18975 보기 (새 탭)"
              className="inline-flex items-center gap-1.5 mt-2 text-xs font-bold text-gray-400 hover:text-black transition-colors"
            >
              <FaGithub size={12} />
              <span>PR #18975 보기</span>
            </a>
          </div>
          <div className="border-l-2 border-black pl-6">
            <p className="font-black text-base">
              AI 개발 워크플로우 자동화 — 팀 블로그 기고
            </p>
            <p className="text-sm text-gray-500 mt-1">
              SVG 도면 변환 자동화, GitHub PR 요약 슬랙 봇 제작 과정을 김캐디 팀
              블로그에 공유
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2">
              <a
                href="https://blog.kimcaddie.com/start-claude-skill"
                target="_blank"
                rel="noreferrer"
                aria-label="SVG 도면 변환 자동화 글 보기 (새 탭)"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-black transition-colors"
              >
                <ExternalLink size={12} />
                <span>SVG 도면 변환 자동화</span>
              </a>
              <a
                href="https://blog.kimcaddie.com/slack-autobot-skill"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub PR 요약 슬랙 봇 글 보기 (새 탭)"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-black transition-colors"
              >
                <ExternalLink size={12} />
                <span>슬랙 PR 요약 봇</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
