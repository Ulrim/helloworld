/**
 * 브랜드/사이트 전역 설정.
 * 브랜드명·도메인 변경은 이 파일 한 곳만 수정하면 전체에 반영된다.
 */
export const SITE = {
  /** 브랜드명(한글). 임시 placeholder — 확정 시 이 값만 교체 */
  name: "셈틀",
  /** 브랜드명(영문) */
  nameEn: "Semtle",
  /** 검색 타이틀 접미사에 쓰이는 표기. 한글/영문 혼용 금지 */
  brandSuffix: "셈틀",
  tagline: "세금·투자·부동산·생활 계산기 모음",
  description:
    "세금, 투자, 부동산, 근로, 실생활까지 자주 쓰는 계산을 한 곳에 모았습니다. 회원가입 없이 무료로 사용하세요.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
  locale: "ko_KR",
  /** 계산 기준 연도. 매년 이 값만 올리면 전체 메타데이터에 반영된다 */
  baseYear: 2026,
  contactEmail: "hello@example.com",
} as const;
