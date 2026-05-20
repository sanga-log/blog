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
  links,
}: {
  name: string;
  period?: string;
  description: string;
  tags: string[];
  items: React.ReactNode[];
  first?: boolean;
  links?: { label: string; href: string }[];
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
      {links && links.length > 0 && (
        <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-xs font-bold text-gray-400 hover:text-black transition-colors"
            >
              <ExternalLink size={11} />
              {l.label}
            </a>
          ))}
        </div>
      )}
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

        {/* About — 설명글 톤, 프로젝트 본문과 위계 맞춤 */}
        <p className="text-[15px] sm:text-[17px] leading-relaxed text-gray-800">
          B2B와 B2C 제품을 함께 만들어왔습니다. 30명·300명 조직을 모두 거치며{" "}
          <strong className="font-bold text-black">
            빠른 패치보다 같은 일을 두 번 하지 않게 만드는 쪽
          </strong>
          을 택해왔습니다. 반복 수작업은 자동화로 옮기고, 버그가 재발하지 않게
          구조부터 바꿉니다.
        </p>
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
              국내 최대 실내 골프 마켓플레이스. 무인 매장 170개+ 운영, 12,000여
              골프 시설 예약 지원 (누적 200만+ 다운로드)
            </p>

            {/* 프로젝트 nested */}
            <div className="pl-6 ml-13">
              <Project
                first
                name="AI Coach — AI 기반 골프 스윙 분석 데스크톱 앱"
                period="2025.07 — 현재"
                description="무인 스크린골프 매장에서 고객이 직접 실시간 스윙을 분석·코칭받는 Electron 데스크톱 앱. 입사 직후 프로토타입을 이어받아 프론트엔드 1인으로 핵심 기능부터 운영까지 책임."
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
                    &ldquo;무인 매장 사업인데 정작 배포·환경 설정은 모두
                    수작업&rdquo;이라는 모순을 인식하고 단계적 자동화: 상용
                    전용이었던 빌드를 개발/상용으로 분리 → S3 자동 업로드 → 매장
                    PC 부팅 시 최신 버전 자동 확인·Silent 설치·자동 실행 →
                    기존엔 매장마다 직접 세팅하던 룸·shop·경로를{" "}
                    <B>매장 시공 시 이미 등록된 MAC Address</B>로 서버에서 자동
                    수신하는 구조로 전환 —{" "}
                    <B>
                      업데이트 시 매장 방문 완전 제거 (신규 시뮬레이터 최초 도입
                      시만 1회 방문)
                    </B>
                  </>,
                  <>
                    차트가 한 화면에서만 쓰여도 main bundle로 묶여 모든 페이지
                    다운로드 비용에 영향 주는 점을 인지하고, 차트 도입 시점에
                    ECharts import 위치를 한 파일로 통일하고 사용 모듈만 명시
                    등록해 사용하지 않는 차트 모듈이 묶이지 않게 함 —{" "}
                    <B>
                      main bundle 압축 사이즈 760 KB에서 592 KB로 22% 줄임
                    </B>
                  </>,
                  <>
                    <code>contextIsolation: false</code>로 인한 XSS 위험 +
                    모놀리식 IPC 구조의 유지보수 부담을 동시 해결:{" "}
                    <code>contextBridge</code> 기반 최소 권한 API 노출 + IPC
                    핸들러를 도메인별 모듈로 분리해 Facade 패턴으로 일괄 등록 +
                    6개 렌더러 파일에 복붙되어 있던 타입 선언/초기화 블록을{" "}
                    <code>electron.d.ts</code>로 통합 + 23곳의{" "}
                    <code>ipcRenderer</code> 호출을 새 API로 일괄 전환 —{" "}
                    <B>
                      원격에서 매장 PC를 임의로 제어 가능했던 보안 위험 제거,
                      신규 IPC 추가 시 등록 위치도 6곳→1곳
                    </B>
                  </>,
                  <>
                    STOMP 재연결은 성공하지만 메시지 응답이 끊기는 무응답 장애를
                    진단. 클라이언트가 대화 연속성을 위해{" "}
                    <code>sessionStorage</code>에 캐싱한 최초 세션 ID로{" "}
                    <code>user-destination</code> 구독 경로를 구성했으나, 서버는
                    연결할 때마다 CONNECTED 프레임의 <code>user-name</code>{" "}
                    헤더로 새 세션 ID를 발급하고{" "}
                    <B>이전 ID를 폐기하는 구조</B>임을 식별. 클라이언트 캐싱
                    분기를 제거하고{" "}
                    <B>
                      서버가 매 연결에 발급한 user-name만 세션 ID로 사용
                    </B>
                    하도록 변경해 재발 차단
                  </>,
                ]}
              />

              <Project
                name="Kaddie Web — 글로벌 골프장 예약 B2C 웹 서비스"
                period="2025.09 — 현재"
                description="김캐디의 해외 스크린 골프 및 연습장 예약 웹. 부킹 시스템·결제 결과 폴링·다국어 prebuild 파이프라인 등 핵심 기능 구현. 회사 최초 해외 매장(미국 Dallas Royal Golf Zone) 진출 시 동반 도입."
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
                    요일별 운영시간·매장별 게임 소요시간·룸별 기예약·현재 이전
                    시간 차단 <B>4중 조건을 동시 통과한 슬롯만 활성화</B>해 매장
                    운영
                    룰과 어긋난 예약을 입력 단계에서 차단.{" "}
                    <B>
                      백엔드 검증만 의존하면 사용자가 폼을 다 채운 뒤에야 충돌을
                      발견하는 UX
                    </B>
                    를 슬롯 선택 시점으로 끌어올려 해결
                  </>,
                  <>
                    결제 직후 서버에서 Stripe 결과를 즉시 알지 못하는 문제를
                    확인하여 백엔드와 확인 → 응답이 지연되어도 5초 이내에는
                    도달한다는 점을 근거로{" "}
                    <B>1초 간격 5회 폴링으로 설계</B>. 주문 제출(
                    <code>isSubmitting</code>)·결과 확인(
                    <code>isProcessing</code>) 두 플래그로 사용자가 대기 중
                    결제 버튼을 다시 눌러 발생하는 중복 청구 차단
                  </>,
                  <>
                    Google Sheets에서 번역이 추가·수정되면 빌드 시 변경된
                    부분만 감지해 6개 언어 번역 파일에 자동 반영되는
                    파이프라인 구축. 번역이 빠진 항목은 기본 언어로
                    대체 표시. Google Sheets 인증 키는{" "}
                    <B>AWS Secrets Manager에서 빌드 시점에만 주입하고 종료
                    직후 폐기</B>
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
                    <code>weekday</code> 필드 하나에 &ldquo;1&rdquo;(평일)·
                    &ldquo;2&rdquo;(공휴일)·&ldquo;4&rdquo;(포썸)이 뒤섞여
                    의미를 알 수 없던 레거시 구조. 백엔드에 제안해{" "}
                    <code>price_category_cd</code> 배열 필드를 신설하고, 의미
                    없는 숫자 코드를 <code>WEEKDAY</code>·<code>HOLIDAY</code>·
                    <code>FOURSOME</code> 같은 의미 있는 상수로 분리. 새 필드가
                    있으면 그대로 쓰고 없으면 기존 <code>weekday</code> 숫자를
                    상수로 매핑하는 폴백을 둬{" "}
                    <B>전체 데이터를 한 번에 갈아엎지 않고 점진적으로 전환</B>.
                    상수·그룹핑·라벨·폴백을 단일 파일에 응집해 도메인 의미와
                    코드 구조를 일치시킴
                  </>,
                  <>
                    가격 제출 검증이 최종 단계에 몰려 사용자가 전 과정을 거친
                    뒤에야 에러를 만나는 구조를,{" "}
                    <B>&ldquo;가장 먼저 알 수 있는 시점에서 차단&rdquo;</B>{" "}
                    원칙으로 전환. 검수중이면 추가·수정·삭제 진입 즉시 차단,
                    현금 기재 같은 제약은 최종 제출 직전이 아니라 사전 검증으로
                    앞당김. 변경 없는 제출은 가격·방·요일 <code>ref</code>{" "}
                    스냅샷 비교로 막아 불필요한 서버 호출 제거, 제출 데이터는
                    <code>state</code>에 의존하지 않고 인자로 전달해 항상
                    최신값으로 계산
                  </>,
                  <>
                    외부 폼(JotForm)으로는 UI·검증을 원하는 대로 바꿀 수 없어,
                    매장 양도양수 신청을 사장님 솔루션 안 자체 페이지로 옮겨
                    react-hook-form + zod로 구현. 양도인/양수인 필드 차이를
                    역할별 스키마 분리 대신 zod <code>superRefine</code> 한 벌로
                    분기해 타입을 단일 출처로 유지. 여러 단계로 나눈 신청
                    폼에서 역할·옵션에 따라 검증 항목을 달리하고,{" "}
                    <B>
                      다음 단계로 넘어갈 때 잘못된 입력을 바로 막고 최종 제출
                      때 zod로 한 번 더 거르는 이중 검증
                    </B>
                    으로 설계
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
              국내 1위 골프 O2O 플랫폼 — 국내 골프장 70% 제휴 · 누적 회원
              400만+
            </p>

            {/* 프로젝트 nested */}
            <div className="pl-6 ml-13">
              <Project
                first
                name="국내외 공식 웹사이트"
                period="2023.08 — 2025.06"
                description="스마트스코어 국내 및 해외 공식 웹사이트 단독 개발. 6개국 다국어 지원."
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
                links={[
                  {
                    label: "Lighthouse 성능 최적화 (LCP·CLS)",
                    href: "https://sangalog.com/blog/performance-optimization-lighthouse",
                  },
                  {
                    label: "SPA SEO 최적화",
                    href: "https://sangalog.com/blog/seo-optimization",
                  },
                  {
                    label: "Vue + Zod 폼 검증",
                    href: "https://sangalog.com/blog/vue-zod-validation",
                  },
                ]}
              />

              <Project
                name="클럽 페이지 — 골프장 운영 데이터 대시보드"
                period="2024.03 — 2025.06"
                description="골프장 운영자를 위한 내장객 분석 및 매장 운영 지표 시각화 대시보드."
                tags={["Vue3", "Pinia", "Highcharts", "Vite"]}
                items={[
                  <>
                    8개 차트 동시 호출로 초기 로드가 30초까지 걸리던 문제를,{" "}
                    <B>백엔드와 병목 API 분리·캐싱 협업</B>으로 1차 단축
                  </>,
                  <>
                    API를 최적화해도 8개를 동시에 그리는 구조 자체가 메인
                    스레드 병목임을 진단하고, Intersection Observer로 화면에
                    보이는 차트만 호출하도록 렌더링 전략 전환 —{" "}
                    <B>TBT 3,180ms → 320ms (90%↓)</B>
                  </>,
                ]}
                links={[
                  {
                    label: "Intersection Observer 차트 최적화",
                    href: "https://sangalog.com/blog/intersection-observer",
                  },
                ]}
              />

              <Project
                name="모바일 네트워크 광고 시스템"
                period="2024.12 — 2025.06"
                description="사내 최초로 모바일 네트워크 광고를 도입한 프로젝트. 여러 프로젝트에서 재사용 가능한 공통 모듈을 설계."
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
                    + <code>RepeatableLoad</code> 옵션으로 Open/Close 후 자동 재
                    Load — 모든 흐름에서 끊김 없이 즉시 노출
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
            <p className="font-black text-base">
              특허 출원 공동 발명자 등재
            </p>
            <p className="text-sm text-gray-500 mt-1">
              AI 골프 레슨 방법 및 컴퓨팅 장치 · 프론트엔드 단독 개발 기여
              (출원번호 10-2025-0133876)
            </p>
          </div>
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
