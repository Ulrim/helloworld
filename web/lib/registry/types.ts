import type { SourceId } from "@/lib/sources";

export type CategoryId =
  | "finance"
  | "tax"
  | "real-estate"
  | "employment"
  | "auto"
  | "life"
  | "health"
  | "education"
  | "utilities";

export interface Category {
  id: CategoryId;
  /** 허브 h1 */
  title: string;
  /** SEO 타이틀의 키워드 다발 (중간점 구분) */
  keywordLine: string;
  /** 허브 리드 문단 */
  description: string;
  /** 카드 아이콘 (이모지 대신 inline SVG path를 쓰고 싶으면 여기 교체) */
  icon: string;
  order: number;
}

/* ------------------------------------------------------------------ *
 * 입력 필드 스키마 — 계산기는 이 데이터로 폼이 자동 생성된다
 * ------------------------------------------------------------------ */

interface FieldBase {
  id: string;
  label: string;
  help?: string;
}

export interface NumberField extends FieldBase {
  type: "number";
  defaultValue: number;
  unit?: string;
  min?: number;
  max?: number;
  step?: number;
  /** 천단위 콤마 표시 여부 (금액 입력에 사용) */
  comma?: boolean;
}

export interface SelectField extends FieldBase {
  type: "select";
  defaultValue: string;
  options: { value: string; label: string }[];
}

export interface ToggleField extends FieldBase {
  type: "toggle";
  defaultValue: boolean;
}

export type Field = NumberField | SelectField | ToggleField;

export type FieldValues = Record<string, number | string | boolean>;

/* ------------------------------------------------------------------ *
 * 결과 스키마 — 모든 계산기가 동일한 결과 카드 레이아웃을 공유한다
 * ------------------------------------------------------------------ */

export interface ResultRow {
  label: string;
  value: string;
  help?: string;
}

export interface CalcResult {
  /** 결과 카드 상단의 대표 수치 */
  primary: { label: string; value: string; sub?: string };
  rows: ResultRow[];
  /** 결과 하단 보조 설명 */
  note?: string;
}

/* ------------------------------------------------------------------ *
 * 계산기 정의
 * ------------------------------------------------------------------ */

/** 서버에서 쓰는 직렬화 가능한 메타데이터 (허브 목록·sitemap·generateMetadata) */
export interface CalculatorMeta {
  slug: string;
  category: CategoryId;
  /** h1 및 타이틀 첫 토막 — 예: "복리 계산기" */
  title: string;
  /** 타이틀 둘째 토막(키워드 다발) — 예: "원금·이자율·기간별 미래가치" */
  keywordLine: string;
  /** meta description */
  description: string;
  keywords: string[];
  sources: SourceId[];
  faq?: { q: string; a: string }[];
  /** 관련 계산기 slug */
  related?: string[];
  /** 타이틀에 기준연도를 노출할지 (세법/요율처럼 매년 바뀌는 계산기만 true) */
  yearSensitive?: boolean;
  /** 아직 계산 로직이 없는 항목은 false — 허브에서 "준비 중"으로 표시 */
  published: boolean;
}

/** 클라이언트에서 쓰는 실행 정의 (폼 + 계산 로직) */
export interface CalculatorRuntime {
  slug: string;
  fields: Field[];
  compute: (values: FieldValues) => CalcResult;
}
