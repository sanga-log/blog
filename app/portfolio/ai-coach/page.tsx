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
  title: "AI Coach — Portfolio",
  description:
    "무인 스크린골프 매장에서 고객이 실시간으로 스윙을 분석·코칭받는 Electron 데스크톱 앱. 프로토타입을 이어받아 프론트엔드 1인으로 개발·운영 — 의사결정·트레이드오프·회고.",
  alternates: { canonical: `${SITE_URL}/portfolio/ai-coach` },
  openGraph: {
    title: "AI Coach — Portfolio",
    description:
      "무인 스크린골프 매장에서 고객이 실시간으로 스윙을 분석·코칭받는 Electron 데스크톱 앱. 프로토타입을 이어받아 프론트엔드 1인으로 개발·운영 — 의사결정·트레이드오프·회고.",
    url: `${SITE_URL}/portfolio/ai-coach`,
  },
};

export default function AICoachPortfolioPage() {
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
          김캐디 · 2025.07 — 현재 · 프론트엔드 1인 개발·운영
        </p>
        <h1 className="text-4xl sm:text-5xl font-black leading-tight tracking-tight mb-5">
          AI Coach
        </h1>
        <p className="text-base leading-relaxed text-gray-700">
          무인 스크린골프 매장에서 고객이 직접 실시간으로 스윙을 분석·코칭받는
          Electron 데스크톱 앱. 프로토타입을 이어받아 핵심 기능부터 운영까지
          책임.
        </p>
      </section>

      <section className="mb-12">
        <SectionLabel>Context</SectionLabel>
        <BulletList
          items={[
            "김캐디(무인 매장 170개+ / 누적 200만+ 다운로드)의 AI 코칭 솔루션",
            "시뮬레이터 3사(GTS · Nvisage · K-Golf) 본사 + 회사 직영 0753Golf + GTS 일본 수출 = 5개 테스트 매장 전체 가동 중",
          ]}
        />
      </section>

      <section className="mb-12">
        <SectionLabel>Stack & Role</SectionLabel>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {[
            "React",
            "TypeScript",
            "Electron",
            "Recoil",
            "WebSocket",
            "ECharts",
            "AWS",
            "i18next",
          ].map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
        <p className="text-sm leading-[1.75] text-gray-700">
          프로토타입을 입사 직후 이어받아 프론트엔드 1인으로 개발·운영.
          electron-updater publish 자동 배포와 S3 버킷·자산 업로드까지 직접
          구축.
        </p>
      </section>

      <section className="mb-12">
        <SectionLabel>Decisions</SectionLabel>

        <Decision
          number={1}
          title="운영 사이클의 무인화"
          body={
            <>
              무인 스크린골프 매장 Electron 앱인데 빌드·S3 업로드·환경설정·로그
              확인이 모두 수작업. 매장 추가마다 JSON 수정 → 재빌드 → 재배포 →
              현장 방문 사이클이 반복.{" "}
              <B>
                &ldquo;무인화 매장인데 운영 사이클은 무인화되어 있지 않다&rdquo;
              </B>
              는 도메인 부조화를 직접 매장 방문 테스트 중 체감. JSON
              분리(임시방편)와 운영 매뉴얼 정비(코드 변경 없음)도 검토했지만,
              매장 시공 시 이미 등록되는 <B>MAC Address를 재활용</B>해 전 과정
              자동화하는 쪽을 선택. 초기 인프라 구축 비용과 Silent 설치로 인한
              디버깅 가시성 감소 트레이드오프는 일별 로그 로테이션 + IPC 로그
              통합으로 보완.
            </>
          }
          diagram={
            <Diagram
              title="무인 매장 운영 사이클"
              caption="MAC Address 시공 시 등록 → 빌드·배포·설치·환경설정이 자동으로 연결. 사람 개입 0."
            >
              <FlowStep>
                매장 시공: <B>MAC Address 등록</B>
              </FlowStep>
              <FlowArrow />
              <FlowStep>
                개발: 빌드 → S3 자동 업로드 (<code>--publish always</code>)
              </FlowStep>
              <FlowArrow />
              <FlowStep>
                매장 PC: electron-updater <B>Silent 다운로드</B>
              </FlowStep>
              <FlowArrow />
              <FlowStep>
                매장 PC: <B>MAC API 호출</B>
              </FlowStep>
              <FlowArrow label="MAC Address로 매장·룸 자동 매칭" />
              <FlowStep>
                서버: shopInfo 반환 ·{" "}
                <code>shopId / roomId / shotPath / clipPath / windowName</code>
              </FlowStep>
              <FlowArrow />
              <FlowStep emphasis>
                자동 환경설정 완료 — 사용자 인터랙션 0
              </FlowStep>
              <FlowAside>
                부수: 일별 로그 로테이션 + 렌더러 로그 IPC 통합으로 원격 디버깅
                인프라 보강
              </FlowAside>
            </Diagram>
          }
          result={[
            "신규 매장 추가: JSON 수정·재빌드·재배포 사이클 제거 (MAC Address 자동 매칭)",
            "빌드 → S3 업로드 → 매장 PC 설치를 단일 파이프라인으로 통합 (수동 개입 0)",
            "사용자 인터랙션 0건 (Silent 설치 + 자동 재시작)",
            "업데이트 매장 방문 완전 제거 (신규 시뮬레이터 최초 도입 시만 1회 방문)",
            "5개 테스트 매장 무인 배포·자동 업데이트 가동 중",
          ]}
          retrospective={
            <>
              <B>다시 한다면</B> JSON 임시방편 단계를 건너뛰고 처음부터 MAC
              Address 자동 매칭으로 갔을 것. 임시방편 운영 동안 매장 추가마다
              누적된 매뉴얼 재배포 비용이 결국 더 비쌌음.
            </>
          }
        />

        <Decision
          number={2}
          title="ECharts 모듈화 — main bundle 사이즈 사전 통제"
          body={
            <>
              차트가 lesson note 한 화면에서만 쓰여도 main bundle로 묶여 모든
              페이지 다운로드 비용에 영향. ECharts 전체 진입점(
              <code>import * as echarts</code>)을 그대로 쓰면 풀번들이 묶여
              사용하지 않는 차트 모듈까지 포함됨. 차트 컴포넌트마다 echarts를
              직접 import하는 흩어진 구조도 검토했지만, 차트 추가 시 등록
              누락·동기화 비용이 큼. 대신{" "}
              <B>
                ECharts import 위치를 한 파일(chartCore.ts)로 통일하고 사용
                모듈만 명시 등록
              </B>{" "}
              + <code>BaseChart</code> 추상화로 소비 차트 컴포넌트가 echarts
              API를 직접 다루지 않도록 분리. 트레이드오프는 새 차트 컴포넌트
              추가 시 chartCore에 모듈 등록 누락 위험 — 한 파일 리뷰로 흡수.
            </>
          }
          diagram={
            <Diagram
              title="ECharts 의존성 단일 진입점 구조"
              caption="chartCore.ts 한 파일에서만 echarts/core + 사용 모듈을 등록. 소비 차트 컴포넌트는 BaseChart를 통해 등록된 echarts 인스턴스를 주입받음."
            >
              <FlowStep>
                <B>chartCore.ts</B>
                <FlowAside>
                  echarts/core + LineChart / BarChart / RadarChart /
                  GraphicComponent / ... 명시 등록 (
                  <code>echarts.use([...])</code>)
                </FlowAside>
              </FlowStep>
              <FlowArrow label="export default echarts" />
              <FlowStep>
                <B>BaseChart.tsx</B>
                <FlowAside>
                  echarts-for-react/lib/core + chartCore에서 echarts 인스턴스
                  주입받음
                </FlowAside>
              </FlowStep>
              <FlowArrow />
              <FlowStep emphasis>
                AgeAverageChart · ProComparisonChart · DistanceTrendChart
                <FlowAside>
                  echarts API 직접 모름 — BaseChart 통해서만 사용
                </FlowAside>
              </FlowStep>
            </Diagram>
          }
          result={[
            <>
              main bundle 압축 사이즈 <B>760 KB → 592 KB (22%↓, 168 KB 감소)</B>{" "}
              — raw 기준 2.49 MB → 1.96 MB (-530 KB)
            </>,
            "lesson note 1곳 차트가 모든 페이지 main bundle 비용에 전파되던 걸 사전 차단",
            "신규 차트 추가 시 chartCore.ts 한 파일 등록만으로 모든 사용처 자동 적용",
          ]}
          retrospective={
            <>
              <B>알게 된 것</B> — 사용처가 한 곳뿐인 라이브러리라도 main
              bundle에 묶이면 전 페이지 비용. 도입 시점에 진입점 통제 안 하면
              사후 마이그레이션 비용이 누적되는 영역.
            </>
          }
        />

        <Decision
          number={3}
          title="contextIsolation 권한 분리 — 보안 + DX 동시 개선"
          body={
            <>
              Electron 앱이 원격 호스팅 SPA URL을 <code>loadURL</code>하는 구조.{" "}
              <code>contextIsolation: false</code> +{" "}
              <code>nodeIntegration: true</code> 조합은 SPA 침해 시{" "}
              <code>require(&apos;child_process&apos;)</code>로 매장 PC에서 임의
              명령 실행이 가능한 권한 노출 상태. CSP 헤더 강화(권한 노출
              그대로)와 SPA 패키지 번들링(자동 업데이트 흐름과 충돌) 대신,{" "}
              <B>contextBridge 화이트리스트 + 타입 통합</B>으로 전면 재설계. 6곳
              복붙되어 있던 타입 선언/초기화 블록을 <code>electron.d.ts</code>로
              통합하고 23곳 <code>ipcRenderer</code> 직접 호출을 새 API로 일괄
              전환 — IPC 직렬화 비용은 마이크로초 단위라 사용자 인지 불가.
            </>
          }
          result={[
            <>
              중복 setup 코드 <B>73줄 → 22줄 (70%↓)</B>
            </>,
            <>
              신규 IPC 등록 절차 <B>6곳 → 1곳</B>
            </>,
            <>
              <code>contextIsolation: true</code> + 화이트리스트 API로 권한 노출
              제거
            </>,
          ]}
          retrospective={
            <>
              <B>알게 된 것</B> — contextBridge 화이트리스트는 권한도 줄이고 IPC
              setup 중복도 제거. 보안과 DX가 같은 방향일 때가 있음.
            </>
          }
        />

        <Decision
          number={4}
          title="다국어 동기화 — 정적 텍스트 치환을 넘어"
          body={
            <>
              일본 진출 1호점 대응을 위해 다국어 지원 필요. i18next 정적
              텍스트만 처리(UI는 일본어, AI는 한국어 → 일관성 깨짐)는 글로벌
              매장 운영의 진정한 의미와 맞지 않아, <code>languageTypeCd</code>를
              모든 서버 요청에 동행시켜 <B>AI 응답·Clova TTS까지 동기화</B>하는
              구조 선택. 트레이드오프는 코칭 도중 언어 변경 시 이전 언어 음성이
              TTS 큐에 잔존(실사용 흐름에서 발견) → 변경 직전{" "}
              <code>stopCurrentTTS</code>·<code>resetTTSSession</code> 강제 호출
              + 변경 가능 시점을 메인 진입 모달로 제한하는 UX 정책으로 해결.
            </>
          }
          result={[
            "글로벌 1호점(일본) 배포 완료, 현재 테스트 운영 중",
            "한국어 / 일본어 / 영어 다국어 구조 설계",
            "언어 전환 시나리오 반복 테스트로 TTS 큐 잔존 버그 발견·해결",
          ]}
          retrospective={
            <>
              <B>아쉬운 점</B> — 언어 전환 가능 시점을 메인 진입 모달로만 제한한
              건 임시 정책. TTS 큐를 routing 시점에 자동 reset하는 구조가 더
              깨끗했을 것.
            </>
          }
        />

        <Decision
          number={5}
          title="STOMP 무응답 장애 — sessionStorage 캐싱과 서버 세션 ID 폐기 구조 충돌 식별"
          body={
            <>
              STOMP 재연결은 성공하는데 메시지 응답이 끊기는 무응답 장애.
              재연결 자체는 정상이라 네트워크 문제로 보이지 않았고, 로그를
              추적해 클라이언트가{" "}
              <code>sessionStorage</code>에 캐싱한{" "}
              <B>최초 세션 ID로 구독 경로를 구성</B>하는 반면, 서버는 매
              연결마다 <code>user-name</code> 헤더로 새 세션 ID를 발급하고{" "}
              <B>이전 ID를 즉시 폐기</B>하는 구조임을 식별. 클라이언트가
              폐기된 ID로 구독하니 메시지가 도달할 수 없었던 것. 클라이언트
              캐싱 분기를 제거하고 서버 발급 ID만 사용하도록 변경해 재발을
              구조적으로 차단.
            </>
          }
          result={[
            "STOMP 재연결 후 메시지 무응답 장애 원인 식별 — sessionStorage 캐싱 분기 제거",
            "서버 발급 세션 ID만 사용하는 구조로 전환해 재발 차단",
            "재연결 성공 / 메시지 무응답 분리 진단으로 원인 범위 좁혀 해결",
          ]}
          retrospective={
            <>
              <B>알게 된 것</B> — STOMP 재연결 성공과 메시지 수신은 별개.
              재연결이 됐다고 구독 경로까지 유효하다고 가정한 게 함정이었음.
              서버가 세션 ID를 어떻게 생성·폐기하는지 먼저 확인했다면 더 빠르게
              좁힐 수 있었을 것.
            </>
          }
        />
      </section>

      <section className="mb-14">
        <SectionLabel>Result</SectionLabel>
        <BulletList
          items={[
            <>
              main bundle 압축 사이즈 <B>760 KB → 592 KB (22%↓)</B> — lesson
              note 차트가 모든 페이지 비용으로 전파되던 걸 도입 시점에 사전 차단
            </>,
            <>
              <code>contextBridge</code> 기반 보안 모델 재설계 — 원격에서 매장
              PC를 임의로 제어 가능했던 권한 노출 제거, 신규 IPC 등록 절차{" "}
              <B>6곳 → 1곳</B>
            </>,
            "GTS · Nvisage · K-Golf 본사 + 회사 직영 + GTS 일본 수출 매장 = 5개 테스트 매장 가동 (다실 구조는 1룸 운영)",
            "특허 출원 공동 발명자 등재 (10-2025-0133876)",
          ]}
        />
      </section>
    </div>
  );
}
