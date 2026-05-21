// Mobile Ads 디테일 페이지의 코드 스니펫 모음.
// 사내 코드 접근 불가 상태로 자료 정리본 기반 + 추가 NDA 마스킹 적용.
// 회사명/Placement ID/NAM ID는 placeholder로 치환.

export const C5A_CODE = `// 네이버 광고 (NAM) — 동적 adUnitId 생성 (위치명을 idx로 상수화)
const ADUNIT_NAMES = {
  1: "ScoreEnter", 2: "ScoreEnter_Round", 3: "Main_Round",
  4: "Main_Search", 5: "Selfcheck", 6: "Spoint", 7: "Attendance_Check",
};

get adUnitId() {
  // 형식: <COMPANY>_<위치명>_Webnative_<OS>-<NAM_ID>
  // 어드민에서 NAM adUnitId와 1:1 매핑되어 리포트 집계 정확 (별도 placementId 불필요)
  return \`<COMPANY>_\${this.adUnitName}_Webnative_\${this.osType}-<NAM_ID>\`;
}

// 호출 측 — 다른 팀이 idx 하나만 알면 광고 노출 가능
this.adUnitName = ADUNIT_NAMES[idx];
this.requestAd(this.adUnitId);`;

export const C5B_CODE = `// 비디오 광고 (제3자 SDK) — 위치·OS별 placementId 상수화
export const PLACEMENT_ID_LIST = {
  1: { IOS: "<PL_IOS_1>", Android: "<PL_AOS_1>" }, // 모달 이미지 배너 A
  2: { IOS: "<PL_IOS_2>", Android: "<PL_AOS_2>" }, // 모달 이미지 배너 B
  3: { IOS: "<PL_IOS_3>", Android: "<PL_AOS_3>" }, // 출석체크 리워드 비디오
  4: { IOS: "<PL_IOS_4>", Android: "<PL_AOS_4>" }, // 포인트 적립 리워드 비디오
  // ... 총 14개 위치 × 2 OS = 28개 항목 (전면 비디오 8개 포함)
};

// 공통 Mixin — idx만으로 위치·OS 매핑 자동 해결
getPlacementId(idx) {
  const osType = this.$native.getOsType() === "android" ? "Android" : "IOS";
  return PLACEMENT_ID_LIST[idx]?.[osType] || null;
}

// 호출 측 — 두 SDK가 동일 인터페이스로 통합 (idx 인자만)
this.preloadAd(this.getPlacementId(3)); // 출석체크 리워드 비디오`;
