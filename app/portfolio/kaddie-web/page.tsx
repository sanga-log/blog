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
import { C3_CODE, C4A_CODE, C4B_CODE } from "./_snippets";

export const metadata: Metadata = {
  title: "Kaddie Web — Portfolio",
  description:
    "김캐디의 해외 스크린 골프 및 연습장 예약 B2C 웹. 초기 아키텍처 설계부터 핵심 기능 개발·런칭 주도 — 의사결정·트레이드오프·회고.",
  alternates: { canonical: `${SITE_URL}/portfolio/kaddie-web` },
  openGraph: {
    title: "Kaddie Web — Portfolio",
    description:
      "김캐디의 해외 스크린 골프 및 연습장 예약 B2C 웹. 초기 아키텍처 설계부터 핵심 기능 개발·런칭 주도 — 의사결정·트레이드오프·회고.",
    url: `${SITE_URL}/portfolio/kaddie-web`,
  },
};

export default function KaddieWebPortfolioPage() {
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
          김캐디 · 2025.09 — 현재 · 프론트엔드 팀 협업
        </p>
        <h1 className="text-4xl sm:text-5xl font-black leading-tight tracking-tight mb-5">
          Kaddie Web
        </h1>
        <p className="text-base leading-relaxed text-gray-700">
          김캐디의 해외 스크린 골프 및 연습장 예약 B2C 웹. 부킹 시스템·결제
          결과 폴링·다국어 prebuild 파이프라인 등 핵심 기능을 구현.
        </p>
      </section>

      <section className="mb-12">
        <SectionLabel>Context</SectionLabel>
        <BulletList
          items={[
            "김캐디(무인 매장 170개+ / 누적 200만+ 다운로드)의 글로벌 진출 전략 첫 B2C 웹 — 해외 스크린골프·연습장 예약",
            "태국·필리핀·미국 3개국 매장에서 운영 — 해외 진출 초기부터 동반 도입",
            "6개 언어 다국어 지원 · 다국가 결제(Stripe)",
          ]}
        />
      </section>

      <section className="mb-12">
        <SectionLabel>Stack & Role</SectionLabel>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {[
            "React",
            "TypeScript",
            "Recoil",
            "Stripe",
            "Docker",
            "Nginx",
            "AWS ECR/ECS",
          ].map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
        <p className="text-sm leading-[1.75] text-gray-700">
          팀과 함께 프론트엔드 전반 개발. 부킹 시스템·회원권 결제 결과
          폴링·다국어 prebuild 파이프라인 등 핵심 기능을 구현.
        </p>
      </section>

      <section className="mb-12">
        <SectionLabel>Decisions</SectionLabel>

        <Decision
          number={1}
          title="복합 조건 예약 충돌 검증 — 시스템 레벨 원천 차단"
          body={
            <>
              <p>
                매장마다 다른 요일별(평일/토/일) 운영시간 + 매장별 게임
                소요시간(60·90분 등) + 룸별 기예약 + 현재 이전 시간 차단 —{" "}
                <B>4중 조건을 동시 통과한 슬롯만 활성화</B>해 매장 운영 룰과
                어긋난 예약을 입력 단계에서 차단하는 부킹 시스템.{" "}
                <B>
                  백엔드 검증만 의존하면 사용자가 폼을 다 채운 뒤에야 충돌을
                  발견하는 UX
                </B>{" "}
                — 검증 책임을 슬롯 선택 시점으로 끌어올려 무효 슬롯을 만지지
                못하게 함.
              </p>
              <p>
                자정을 넘기는 영업 시간(예: 10:00~03:00)은 시작 시각이 종료
                시각보다 크므로 단순 시간 비교가 깨짐 —{" "}
                <B>
                  영업 시작~자정 구간과 자정~영업 종료 구간을 합쳐서 판정
                </B>
                . 분 단위 선택지(10분 간격)가 모두 차단되면 시간 버튼까지
                자동 비활성화해 무효 슬롯 클릭 자체를 차단.
              </p>
              <p>
                <B>고려한 옵션</B>: (a) <B>백엔드만 검증</B> — 사용자가 시간
                선택을 다 한 뒤에야 충돌이 드러나는 UX, 백엔드는 사용자가
                무엇을 누를지 미리 모름. (b) <B>클라만 검증</B> — 동시간대
                다른 사용자가 몇 분 차이로 예약하는 동시성 충돌을
                클라이언트가 알 수 없어 정합성 깨짐. → (c){" "}
                <B>양쪽 검증</B> 선택. 프론트는 “선택 가능한 슬롯만 노출”로
                UX를, 백엔드는 “최종 정합성”으로 동시성 충돌을 책임 — 두
                책임이 다르므로 한 쪽만으로는 불충분.
              </p>
            </>
          }
          diagram={
            <Diagram
              title="슬롯 활성화 검증 — 4중 조건 동시 통과"
              caption="각 분 슬롯이 4중 조건을 모두 통과해야만 활성화. 분 단위 6개(00·10·20·30·40·50)가 모두 차단되면 시간 버튼까지 자동 비활성화."
            >
              <FlowStep>
                사용자: <B>시간 버튼 클릭</B>
              </FlowStep>
              <FlowArrow label="각 분 슬롯마다 4중 조건 검증" />
              <FlowStep>
                <B>① 요일별 운영시간</B>
                <FlowAside>
                  평일/토/일 분기 → 해당 요일 운영시간 내 시각인가
                </FlowAside>
              </FlowStep>
              <FlowArrow />
              <FlowStep>
                <B>② 게임 종료 ≤ 폐점</B>
                <FlowAside>
                  시각 + 게임 소요시간 ≤ 폐점 시각. 자정 넘김 매장은 영업
                  시작~자정 구간과 자정~영업 종료 구간을 합쳐서 판정
                </FlowAside>
              </FlowStep>
              <FlowArrow />
              <FlowStep>
                <B>③ 룸별 기예약 없음</B>
                <FlowAside>
                  기존 예약 시간 범위와 충돌 검증 (시작 시각 포함, 종료 시각 후
                  다음 예약 가능)
                </FlowAside>
              </FlowStep>
              <FlowArrow />
              <FlowStep>
                <B>④ 현재 이전 시간 아님</B>
                <FlowAside>당일이면 현재 시각 이후만</FlowAside>
              </FlowStep>
              <FlowArrow label="4중 모두 통과" />
              <FlowStep emphasis>
                분 슬롯 활성화
                <FlowAside>
                  분 단위 6개 모두 차단 시 → 시간 버튼까지 자동 비활성화
                </FlowAside>
              </FlowStep>
            </Diagram>
          }
          result={[
            "4중 조건(요일별 운영시간·매장별 게임 소요시간·룸별 기예약·현재 이전 시간 차단) 동시 통과한 슬롯만 활성화",
            "자정 넘기는 영업 시간 두 구간 합집합 판정 + 분 단위 차단 시 시간 버튼까지 자동 비활성화",
            "폼 제출 후 에러가 아닌 슬롯 선택 단계에서 즉시 피드백",
          ]}
          retrospective={
            <>
              <B>알게 된 것</B> — 폼 제출 후가 아닌 슬롯 선택 시점에서 피드백을
              받게 되니 사용자가 무효 슬롯에 시간을 쓰지 않게 됨. 다만 검증
              룰을 백엔드/클라이언트가 따로 들고 있는 구조라 정책 변경 시
              어긋날 위험이 남아 있음. <B>다시 한다면</B> 검증 룰을 백엔드와
              합의된 단일 스키마(API 스펙 또는 Zod 공유)로 통합해 정책 변경 시
              동기화 부담 자체를 제거했을 것.
            </>
          }
        />

        <Decision
          number={2}
          title="Stripe 결제 직후 서버 응답 지연 — react-query 폴링으로 응집"
          body={
            <>
              <p>
                결제 직후 서버에서 Stripe 결과를 즉시 알지 못하는 구조.
                백엔드와 협의한 결과 응답이 지연되어도 5초 이내에는 도달하고
                그 이후엔 <B>백엔드도 실패로 본다</B>는 사실을 파악. 이
                정보를 그대로 <B>1초 간격 5회 폴링으로 설계</B>해 폴링이
                끝나는 시점과 백엔드의 실패 판정 시점이 일치하도록 맞춤 —
                실제 성공인데 프론트만 실패로 표시하는 경우가 구조적으로
                차단된다.
              </p>
              <p>
                화면에 결과가 안 잡히면 사용자가 한 번 더 누르는{" "}
                <B>중복 청구</B> 위험은 별도 플래그 두 개로 차단 —{" "}
                <B>주문 제출</B>(<code>isSubmitting</code>, postOrder 호출
                동안)과 <B>결과 확인</B>(<code>isProcessing</code>, 폴링
                동안) 어느 단계에서든 결제 버튼이 잠긴다.{" "}
                <B>useMutation + useQuery refetchInterval</B>로 주문
                생성·폴링·정지 조건을 한 책임에 응집해 수동 가드 코드를
                제거.
              </p>
            </>
          }
          diagram={
            <Diagram
              title="결제 직후 폴링과 결제 버튼 잠금 흐름"
              caption="결제 직후 서버 응답이 곧바로 따라오지 못하는 구간을 1초 간격 폴링으로 메우고, 주문 생성·폴링 두 단계 동안 결제 버튼을 잠가 중복 청구를 차단한다."
            >
              <FlowStep>
                <B>사용자</B>: 결제 버튼 클릭
              </FlowStep>
              <FlowArrow label="submitOrder.mutate(payload)" />
              <FlowStep>
                <code>useMutation</code> → <code>POST /orders/create</code>
                <FlowAside>
                  isPending = true → 버튼 disabled 자동
                </FlowAside>
              </FlowStep>
              <FlowArrow label="응답 OK → orderId 생성" />
              <FlowStep>
                <code>useQuery</code> enabled = !!orderId
                <FlowAside>
                  refetchInterval 1초 — 자동 폴링 시작
                </FlowAside>
              </FlowStep>
              <FlowArrow label="checkOrder 응답 3분기" />
              <FlowStep emphasis>
                refetchInterval 정지 조건
                <FlowAside>
                  COMPLETE / FAILED → false · dataUpdateCount ≥ 5 → false
                </FlowAside>
              </FlowStep>
              <FlowArrow label="useEffect: 종결 상태 또는 타임아웃 감지" />
              <FlowStep>
                <code>navigate(success)</code> / <code>navigate(failed)</code>
              </FlowStep>
            </Diagram>
          }
          snippets={[
            {
              filename: "src/components/payment/MembershipPayment.tsx",
              code: C3_CODE,
              highlight: (
                <>
                  <code>useMutation</code>이 주문 생성과{" "}
                  <code>isPending</code> 신호를, <code>useQuery</code>가 1초
                  간격 폴링과 정지 조건을 각각 한 책임으로 들고 간다.{" "}
                  <code>refetchInterval</code>은 응답 status가{" "}
                  <code>COMPLETE</code>/<code>FAILED</code>거나{" "}
                  <code>dataUpdateCount</code>가 5에 도달하면 false를 반환해
                  자동으로 멈춤 — setTimeout 재귀·수동 카운터·요청/확인 두
                  단계 플래그를 직접 짤 필요가 없다.
                </>
              ),
            },
          ]}
          result={[
            <>
              결제 직후 서버 응답이 따라오지 못하는 구간을{" "}
              <code>useQuery refetchInterval</code> 1초 폴링으로 채움
            </>,
            <>
              <code>isPending</code>(주문 생성)·<code>isFetching</code>(폴링)이
              그대로 버튼 disabled 신호로 직결돼 수동 상태 플래그 제거
            </>,
            <>
              5회 도달 또는 <code>COMPLETE</code>/<code>FAILED</code> 응답 시
              폴링 자동 정지 — setTimeout 재귀 직접 관리 제거
            </>,
          ]}
          retrospective={
            <>
              <B>다시 한다면</B> 처음부터 react-query로 갔을 것. 명령형으로
              시작한 이유는 기존 axios 래퍼 패턴을 따라간 관성 —{" "}
              <code>refetchInterval</code>은 Webhook 폴링의 교과서 케이스라
              명령형 폴링을 한 줄도 짤 필요 없었음.
            </>
          }
        />

        <Decision
          number={3}
          title="다국어 prebuild 파이프라인 — Google Sheets + Secrets Manager"
          body={
            <>
              <p>
                6개 언어 번역이 자주 바뀌는 글로벌 환경에서 매번 개발자가
                코드를 수정해야 하는 비용을 줄이는 게 목표.{" "}
                <B>Google Sheets에서 번역이 추가되거나 수정되면</B>, 다음
                빌드 시 변경된 부분만 감지해{" "}
                <B>6개 언어 번역 파일에 자동으로 반영</B>되는 파이프라인
                구축. 행마다 MD5 해시로 변경 여부를 비교해 수정된 항목만
                부분 갱신하고, 번역이 빠진 항목은 기본 언어로 대체 표시.
                로컬·CI 모두 필요한 Google Sheets 인증 키는{" "}
                <B>AWS Secrets Manager에서 빌드할 때만 가져와 쓰고, 끝나면
                즉시 삭제</B>해 노출 위험을 차단.
              </p>
              <p>
                <B>고려한 옵션</B>: Crowdin·Lokalise 같은{" "}
                <B>번역 CMS</B>는 비용이 발생하지만 우리 번역 규모는 관리자
                1명이 관리할 정도로 작아 비용 대비 효율이 낮음.{" "}
                <B>
                  비용 0 + 기존 Google Sheets 환경 + 단순한 빌드 파이프라인
                </B>
                으로 우리 규모에 맞는 최소 솔루션 선택.
              </p>
            </>
          }
          diagram={
            <Diagram
              title="다국어 prebuild 파이프라인"
              caption="Sheets에서 번역이 추가·수정되면 다음 빌드 시 변경된 부분만 6개 언어 파일에 자동 반영. Google Sheets 인증 키는 빌드할 때만 가져와 쓰고 끝나면 즉시 폐기."
            >
              <FlowStep>
                Google Sheets에서 <B>번역 셀 추가·수정</B>
              </FlowStep>
              <FlowArrow label="다음 빌드 시점에 자동 트리거" />
              <FlowStep>
                Jenkins:{" "}
                <code>aws secretsmanager get-secret-value</code> →{" "}
                <code>credentials.json</code> 주입
              </FlowStep>
              <FlowArrow label="prebuild 훅 (Docker 빌드 직전)" />
              <FlowStep>
                <code>fetch-translations.ts</code>: Sheets API 호출 + row 단위
                MD5 해시 비교
              </FlowStep>
              <FlowArrow />
              <FlowStep emphasis>
                변경된 키만 부분 갱신
                <FlowAside>
                  changedKeys 0개 → 스킵, 변경 → 6개 언어{" "}
                  <code>{`{ko, en, ja, zh-CN, zh-TW, th}.json`}</code> 머지
                </FlowAside>
              </FlowStep>
              <FlowArrow />
              <FlowStep>
                <code>rm credentials.json</code> 즉시 폐기 → Docker 이미지 빌드
                → ECR 푸시
              </FlowStep>
            </Diagram>
          }
          snippets={[
            {
              filename: "scripts/fetch-translations.ts",
              code: C4A_CODE,
              highlight: (
                <>
                  캐싱 키는 row 단위(<code>key + 모든 언어 값 join</code>) MD5
                  — 한 셀만 바뀌어도 해당 row만 갱신, 나머지 row는 기존 번역
                  보존. <code>changedKeys</code>가 비어 있으면 빌드 스킵 →
                  빌드 시간 절약.
                </>
              ),
            },
            {
              filename: "package.json · Jenkinsfile-us",
              code: C4B_CODE,
              highlight: (
                <>
                  빌드 파이프라인 연결점:{" "}
                  <code>npm run build → prebuild → npm run i18n → fetch-translations.ts</code>
                  . 시크릿 관리 진화 — 과거{" "}
                  <code>credentials.json</code> 레포 커밋에서 현재 AWS Secrets
                  Manager 빌드 타임 주입 + 즉시 폐기로 전환.
                </>
              ),
            },
          ]}
          result={[
            "Google Sheets에서 번역 추가·수정 시 다음 빌드에서 변경된 부분만 6개 언어 번역 파일에 자동 반영",
            "MD5 해시 캐싱으로 변경 키만 부분 갱신",
            "AWS Secrets Manager로 credentials 일원화 (빌드 단계 주입·종료 시 삭제)",
          ]}
          retrospective={
            <>
              <B>알게 된 것</B> — 번역 텍스트와 코드를 분리하니 번역
              추가·수정 때마다 코드를 건드릴 일이 사라지고, 남는 부담이 빌드
              직전 UI 검토로 좁혀짐. <B>다시 한다면</B> Sheets 권한 모델과
              번역 검토 체크리스트를 더 일찍 정형화해 운영 부담을 한 번 더
              낮췄을 것.
            </>
          }
        />
      </section>

      <section className="mb-14">
        <SectionLabel>Result</SectionLabel>
        <BulletList
          items={[
            "회사 최초 해외 매출 달성 — 태국·필리핀·미국 매장 운영",
            "복합 조건 예약 충돌 검증을 시스템 레벨에서 원천 차단",

            "6개 언어 다국어 자동 동기화 파이프라인 구축",
            "초기 아키텍처 설계부터 핵심 기능 개발·런칭 주도",
          ]}
        />
      </section>
    </div>
  );
}
