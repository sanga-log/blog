import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SITE_URL } from "@/lib/constants";
import {
  SectionLabel,
  B,
  Tag,
  BulletList,
  Decision,
  Diagram,
  FlowStep,
  FlowArrow,
  FlowAside,
} from "../_components";

export const metadata: Metadata = {
  title: "국내 공식 웹사이트 개편 — Portfolio",
  description:
    "스마트스코어 국내 공식 웹사이트 전면 개편. LCP 6.6s→0.9s 성능 최적화, 도메인 이전 SEO 전략, Zod 기반 폼 검증 설계 — 의사결정·트레이드오프·회고.",
  alternates: { canonical: `${SITE_URL}/portfolio/smartscore-web` },
  openGraph: {
    title: "국내 공식 웹사이트 개편 — Portfolio",
    description:
      "스마트스코어 국내 공식 웹사이트 전면 개편. LCP 6.6s→0.9s 성능 최적화, 도메인 이전 SEO 전략, Zod 기반 폼 검증 설계 — 의사결정·트레이드오프·회고.",
    url: `${SITE_URL}/portfolio/smartscore-web`,
  },
};

export default function SmartsocreWebPortfolioPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <Link
        href="/portfolio"
        className="inline-flex items-center gap-1.5 text-xs font-black tracking-widest uppercase text-gray-400 hover:text-black transition-colors mb-12"
      >
        <ArrowLeft size={14} />
        <span>Portfolio</span>
      </Link>

      <section className="border-b border-black pb-12 mb-12">
        <p className="text-sm font-bold text-gray-700 mb-3">
          스마트스코어 · 2025.02 — 2025.06 · 단독 개발
        </p>
        <h1 className="text-4xl sm:text-5xl font-black leading-tight tracking-tight mb-5">
          국내 공식 웹사이트 개편
        </h1>
        <p className="text-base leading-relaxed text-gray-700">
          국내 1위 골프 O2O 플랫폼 국내 공식 웹사이트 전면 개편.
          성능 최적화, 도메인 이전 SEO 전략, 폼 검증 구조 설계를 단독으로 담당.
        </p>
      </section>

      <section className="mb-12">
        <SectionLabel>Context</SectionLabel>
        <BulletList
          items={[
            "스마트스코어 (국내 골프장 70% 제휴 · 누적 회원 400만+)의 국내 공식 웹사이트 전면 개편",
            "글로벌 홈페이지(2023.08)를 먼저 구축한 뒤, 국내 홈페이지 개편을 단독으로 담당",
            "도메인 이전과 함께 성능·SEO·폼 검증 전 영역 재설계",
          ]}
        />
      </section>

      <section className="mb-12">
        <SectionLabel>Stack & Role</SectionLabel>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {["Vue3", "TypeScript", "Vite", "i18n", "Zod", "Unhead"].map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
        <p className="text-sm leading-[1.75] text-gray-700">
          단독 개발. 신규 도메인 이전·다국어 구조·폼 검증·성능 최적화를 포함한
          전 영역 담당.
        </p>
      </section>

      <section className="mb-12">
        <SectionLabel>Decisions</SectionLabel>

        <Decision
          number={1}
          title="LCP 6.6s → 0.9s — 이미지 포맷 전환 + 로딩 우선순위 조정"
          body={
            <>
              초기 LCP 6.6s, CLS 0.737. 원인을 추적하니 히어로 이미지가 JPEG로
              서빙되고 있었고, <code>fetchpriority</code>나 <code>preload</code>{" "}
              없이 일반 이미지 로딩 순서를 따르고 있었음. 대안으로{" "}
              <B>WebP 전환 + preload + fetchpriority=&quot;high&quot; 조합</B>을
              선택. 이미지 CDN 도입(비용·운영 부담)과 lazy loading만 적용(LCP
              개선 효과 없음)도 검토했지만, 코드 변경만으로 가장 큰 임팩트를 낼
              수 있는 방향으로 결정. CLS는 이미지에 명시적 width/height를 부여해
              레이아웃 이동 차단.
            </>
          }
          diagram={
            <Diagram
              title="히어로 이미지 로딩 최적화"
              caption="JPEG → WebP 전환 + preload + fetchpriority 조합으로 브라우저가 히어로 이미지를 첫 번째 우선순위로 처리하도록 유도."
            >
              <FlowStep>
                <B>Before</B>: JPEG 히어로 이미지, 우선순위 없음
                <FlowAside>LCP 6.6s / CLS 0.737</FlowAside>
              </FlowStep>
              <FlowArrow />
              <FlowStep>WebP 전환 — 파일 크기 감소</FlowStep>
              <FlowArrow />
              <FlowStep>
                <code>{"<link rel='preload'>"}</code> +{" "}
                <code>fetchpriority=&quot;high&quot;</code>
                <FlowAside>
                  브라우저가 히어로 이미지를 첫 번째 자원으로 처리
                </FlowAside>
              </FlowStep>
              <FlowArrow />
              <FlowStep emphasis>
                <B>After</B>: LCP 0.9s / CLS 0
              </FlowStep>
            </Diagram>
          }
          result={[
            <>
              LCP <B>6.6s → 0.9s (86%↓)</B>, CLS <B>0.737 → 0</B>
            </>,
            "이미지 CDN 없이 코드 변경만으로 달성",
            <>
              블로그 글로 정리:{" "}
              <a
                href="https://sangalog.com/blog/performance-optimization-lighthouse"
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                Lighthouse 성능 최적화 (LCP·CLS)
              </a>
            </>,
          ]}
          retrospective={
            <>
              <B>알게 된 것</B> — LCP는 이미지 크기보다 로딩 순서가 먼저.
              fetchpriority 한 줄이 CDN 도입보다 더 큰 임팩트를 냈음. 초기에
              원인 분석 없이 CDN을 먼저 검토했는데, 병목을 측정하고 나서
              접근했다면 더 빨리 해결했을 것.
            </>
          }
        />

        <Decision
          number={2}
          title="도메인 이전 — 검색 색인 리셋 위험을 인지하고 SEO 전략 선제 설계"
          body={
            <>
              도메인 이전 시 기존 색인이 리셋될 위험을 인지. 단순 301
              리다이렉트만 하면 크롤러가 신규 도메인을 다시 처음부터 색인하는
              기간 동안 검색 노출이 급감할 수 있음. 이전과 동시에 SEO 세팅을
              완료하기로 결정 —{" "}
              <B>
                사이트맵·robots.txt 재구성 + Schema.org 구조화 데이터 + Unhead로
                라우터 레벨 메타데이터 통합 관리
              </B>{" "}
              를 묶어서 처리. 크롤러가 새 도메인에서 필요한 신호를 모두 즉시
              발견할 수 있도록 준비.
            </>
          }
          result={[
            <>
              Lighthouse SEO <B>83 → 92점</B>
            </>,
            "도메인 이전과 SEO 세팅을 동시 완료해 색인 공백 최소화",
            <>
              블로그 글로 정리:{" "}
              <a
                href="https://sangalog.com/blog/seo-optimization"
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                SPA SEO 최적화
              </a>
            </>,
          ]}
          retrospective={
            <>
              <B>아쉬운 점</B> — 이전 후 색인 변화를 Search Console로 추적하는
              모니터링 주기를 명확히 잡지 않았음. 이전 직후 2주 동안 주 단위로
              색인 상태를 확인하는 체크리스트를 만들었어야 했음.
            </>
          }
        />

        <Decision
          number={3}
          title="폼 검증 — 풀 라이브러리 대신 Zod만 도입"
          body={
            <>
              글로벌 홈페이지를 처음 만들 때 폼 검증 로직이 필드별로 흩어져
              있어 에러 관리가 어려웠던 경험이 있었음. 이번엔 처음부터{" "}
              <B>검증 로직을 한 곳으로 응집하는 구조</B>를 잡기로 했고,
              vee-validate·vuelidate 같은 풀 폼 라이브러리를 검토했지만 폼
              규모가 작고 상태 관리도 Vue 기본으로 충분해{" "}
              <B>검증 로직만 Zod로 분리</B>하는 쪽을 선택 — 정규표현식을 단일
              스키마로 응집하고, <code>isSubmitted</code> 상태로 첫 진입 에러
              숨김 + 제출 후 실시간 검증 UX를 직접 구현. 트레이드오프는 UX
              패턴을 직접 짜야 한다는 것 — 폼이 복잡해지면 풀 라이브러리
              전환이 더 빠를 수 있음.
            </>
          }
          result={[
            "필드별 정규표현식을 단일 Zod 스키마로 응집",
            "첫 진입 에러 숨김 + 제출 후 실시간 검증 UX 직접 구현",
            <>
              블로그 글로 정리:{" "}
              <a
                href="https://sangalog.com/blog/vue-zod-validation"
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                Vue + Zod 폼 검증
              </a>
            </>,
          ]}
          retrospective={
            <>
              <B>다시 한다면</B> — 폼 복잡도가 올라갈 가능성이 있을 때는 처음
              부터 react-hook-form / vee-validate 같은 라이브러리를 쓰는 게
              나음. 단순 폼에서 Zod만 쓰는 건 좋은 선택이었지만, 멀티스텝이나
              동적 필드가 추가됐다면 직접 짠 UX 패턴의 유지보수 비용이
              라이브러리 학습 비용을 초과했을 것.
            </>
          }
        />
      </section>

      <section className="mb-14">
        <SectionLabel>Result</SectionLabel>
        <BulletList
          items={[
            <>
              LCP <B>6.6s → 0.9s (86%↓)</B>, CLS 0.737 → 0 — 코드 변경만으로
              달성
            </>,
            <>
              Lighthouse SEO <B>83 → 92점</B> — 도메인 이전과 동시 설계로 색인
              공백 최소화
            </>,
            "6개국 다국어 구조 설계 + 폼 검증 Zod 단일 스키마 응집",
            "단독 개발 — 신규 도메인 이전·다국어·성능·SEO 전 영역 전담",
          ]}
        />
      </section>
    </div>
  );
}
