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
import { C5A_CODE, C5B_CODE } from "./_snippets";

export const metadata: Metadata = {
  title: "모바일 네트워크 광고 시스템 — Portfolio",
  description:
    "사내 최초로 모바일 네트워크 광고를 도입한 프로젝트. 4가지 광고 타입 통합 처리 공통 모듈 설계 — 의사결정·트레이드오프·회고.",
  alternates: { canonical: `${SITE_URL}/portfolio/mobile-ads` },
  openGraph: {
    title: "모바일 네트워크 광고 시스템 — Portfolio",
    description:
      "사내 최초로 모바일 네트워크 광고를 도입한 프로젝트. 4가지 광고 타입 통합 처리 공통 모듈 설계 — 의사결정·트레이드오프·회고.",
    url: `${SITE_URL}/portfolio/mobile-ads`,
  },
};

export default function MobileAdsPortfolioPage() {
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
          스마트스코어 · 2024.12 — 2025.06 · 사내 최초 도입
        </p>
        <h1 className="text-4xl sm:text-5xl font-black leading-tight tracking-tight mb-5">
          모바일 네트워크 광고 시스템
        </h1>
        <p className="text-base leading-relaxed text-gray-700">
          사내 최초로 도입한 모바일 네트워크 광고 시스템에서 4가지 광고
          타입을 통합 처리하는 공통 Mixin을 설계 — 다른 앱에서 import 한
          줄로 도입 가능.
        </p>
      </section>

      <section className="mb-12">
        <SectionLabel>Context</SectionLabel>
        <BulletList
          items={[
            "누적 회원 400만+ 국내 1위 골프 O2O 플랫폼 앱에 광고 수익 모델 도입",
            "사내 최초로 도입한 모바일 네트워크 광고 시스템",
            "다른 앱에서도 그대로 import 가능한 공통 Mixin으로 설계",
          ]}
        />
      </section>

      <section className="mb-12">
        <SectionLabel>Stack & Role</SectionLabel>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {["Vue2", "Webpack"].map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
        <p className="text-sm leading-[1.75] text-gray-700">
          광고 네트워크 SDK 연동 + 공통 Mixin 모듈 설계 + 포인트 차감 가드
          같은 도메인 로직을 구현.
        </p>
      </section>

      <section className="mb-12">
        <SectionLabel>Decisions</SectionLabel>

        <Decision
          number={1}
          title="광고 호출 3단계 분리 — preload / load / open"
          body={
            <>
              광고 호출 시 SDK 라이브러리 로딩으로 노출이 지연되고,{" "}
              <code>load</code>·<code>open</code> 동시 호출 중 페이지 이탈 시
              다른 페이지에서 광고가 뜨는 <B>race condition</B>도 발생. 동기
              호출(<code>load</code>+<code>open</code> 한 함수)은 단순하지만
              페이지 흐름과 맞지 않음. 사용자 흐름에 따라{" "}
              <B>
                <code>preload</code> / <code>load</code> / <code>open</code> 3단계로
                분리
              </B>{" "}
              + <code>RepeatableLoad</code> 옵션으로 Open/Close 후 자동 재
              Load — 모든 흐름에서 끊김 없이 즉시 노출.
            </>
          }
          result={[
            <>
              광고 호출 3단계 분리(<code>preload</code> / <code>load</code> /{" "}
              <code>open</code>)
            </>,
            <>
              <code>RepeatableLoad</code> 옵션으로 Open/Close 후 자동 재 Load
            </>,
            "페이지 이탈 race condition 해결, 끊김 없는 광고 노출",
          ]}
          retrospective={
            <>
              <B>알게 된 것</B> — 외부 SDK는 lifecycle을 본인 페이스로 가져감.
              동기 가정 + 단순 await는 결국 페이지 이탈 race로 돌아옴.
            </>
          }
        />

        <Decision
          number={2}
          title="4가지 광고 타입 통합 Mixin — 사내 공통 모듈"
          body={
            <>
              <B>
                4가지 광고 타입(InterstitialImage / InterstitialVideo /
                RewardVideo / BottomModal)
              </B>
              을 통합 처리하는 공통 Mixin 모듈 설계. 타입별로 컴포넌트를 따로
              만들지 않고 OS·Placement ID 상수화, 각 타입별 콜백 액션 매핑(
              <code>RewardVideo</code>는 영상 시청 완료 여부{" "}
              <code>status: completed/skipped</code> 분기), <code>idx</code>
              만으로 광고 호출 가능한 구조로 일원화. 네이버 광고(NAM)와 제3자
              비디오 광고 SDK 두 종을 동일 인터페이스로 통합한 것도 같은 추상화
              사고. 다른 프로젝트에서도 그대로 import해서 쓸 수 있는 모듈로 설계.
            </>
          }
          diagram={
            <Diagram
              title="광고 시스템 통합 인터페이스"
              caption="다른 팀은 idx 인자만 알면 호출 가능. SDK 라우팅·OS 분기·placementId 매핑은 Mixin이 내부에서 자동 처리."
            >
              <FlowStep>
                <B>다른 팀</B>: <code>idx</code> 하나만 알면 광고 호출
                <FlowAside>
                  <code>this.preloadAd(this.getPlacementId(3))</code>
                </FlowAside>
              </FlowStep>
              <FlowArrow label="공통 Mixin이 SDK·OS·위치 매핑 자동 해결" />
              <FlowStep>
                <B>SDK 라우팅</B> — 네이버 광고 vs 비디오 광고
                <FlowAside>
                  네이버 NAM → adUnitId 동적 생성 (1:1 매핑, placementId 불필요)
                  <br />
                  제3자 SDK → PLACEMENT_ID_LIST[idx][OS] (14 × 2 매핑)
                </FlowAside>
              </FlowStep>
              <FlowArrow />
              <FlowStep emphasis>
                광고 노출
                <FlowAside>
                  4가지 타입 통합 — InterstitialImage / InterstitialVideo /
                  RewardVideo / BottomModal
                </FlowAside>
              </FlowStep>
            </Diagram>
          }
          snippets={[
            {
              filename: "네이버 광고 (NAM) Mixin",
              code: C5A_CODE,
              highlight: (
                <>
                  네이버 광고는 어드민 콘솔에서 NAM adUnitId와 1:1 매핑이라
                  별도 <code>placementId</code> 불필요 → 회사명·위치·OS·NAM ID
                  조합으로 <code>adUnitId</code>를 동적 생성. 다른 팀은{" "}
                  <code>idx</code> 하나만 알면 호출 가능.
                </>
              ),
            },
            {
              filename: "비디오 광고 (제3자 SDK) Mixin",
              code: C5B_CODE,
              highlight: (
                <>
                  비디오 광고는 SDK 제공 업체가 달라{" "}
                  <code>placementId</code>가 필수 → 14개 위치 × 2 OS = 28개
                  항목을 단일 <code>getPlacementId(idx)</code> 함수로 일원화.
                  네이버 광고와 동일한 <code>idx</code> 인터페이스로 두 SDK
                  통합.
                </>
              ),
            },
          ]}
          result={[
            "4가지 광고 타입 통합 처리 Mixin 모듈",
            "OS·Placement ID 상수화 + 콜백 액션 매핑",
            <>
              <code>idx</code>만으로 광고 호출 가능 — 다른 프로젝트 재사용 가능
            </>,
          ]}
          retrospective={
            <>
              <B>알게 된 것</B> — <code>idx</code>만 알면 광고 호출이 끝나는
              인터페이스 덕에 다른 앱에서 import 한 줄로 도입 완료. 모듈을 만든
              다음 사용하는 사람의 인지 부담을 측정한 게 자산화의 핵심.
            </>
          }
        />

        <Decision
          number={3}
          title="포인트 차감 가드 — 광고 로딩 중 중복 클릭"
          body={
            <>
              앱 내 보상 시스템 — 광고 시청·미니게임으로{" "}
              <B>s포인트를 적립</B>하고, 모은 s포인트를{" "}
              <B>실사용 가능한 s캐시로 전환</B>하는 흐름을 직접 구현. 이 전환
              버튼에서 5회/10회 진입 시 5초 전면 비디오 광고가 트리거되는
              구조였음. 광고 로딩(4~10초) + 재생(5초) 동안 사용자가 전환 버튼을
              추가 클릭하면 <B>광고는 이미 진행 중인데 s포인트만 계속 차감되는
              사용자 손해</B> 발생. 단순 <code>disabled</code>로 막으면 UX
              불명확 → 광고 호출 시 카운팅 플래그를 <code>false</code>로 잠그고{" "}
              <code>OnInterstitialVideoAdClosed</code> 콜백에서{" "}
              <code>true</code>로 복귀하는 가드로 해결. 사용자 입장에선 광고
              진행 중 추가 차감 0.
            </>
          }
          result={[
            "광고 로딩·재생 중 포인트 추가 차감 차단",
            <>
              카운팅 플래그 + <code>OnInterstitialVideoAdClosed</code> 콜백 가드
            </>,
            "사용자 인지 가능한 명확한 흐름",
          ]}
          retrospective={
            <>
              <B>다시 한다면</B> 잠금 상태를 명시적 ref가 아니라 store
              (Pinia/Vuex)로 흡수했을 것. 명령형 ref는 컴포넌트 깊이 들어갈수록
              추적이 어려워졌음.
            </>
          }
        />
      </section>

      <section className="mb-14">
        <SectionLabel>Result</SectionLabel>
        <BulletList
          items={[
            "사내 최초로 모바일 네트워크 광고 도입",
            "4가지 광고 타입(InterstitialImage / Video / Reward / BottomModal) 통합 Mixin 공통 모듈",
            "preload / load / open 3단계 분리로 끊김 없는 노출",
            "광고 로딩 중 중복 클릭 가드로 포인트 차감 보호",
            "다른 앱에서 import 한 줄로 도입 가능한 공통 Mixin",
          ]}
        />
      </section>
    </div>
  );
}
