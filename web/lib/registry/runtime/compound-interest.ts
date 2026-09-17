import type { CalculatorRuntime, FieldValues } from "../types";
import { num, won, wonKorean } from "@/lib/format";

/** 이자소득세(소득세 14% + 지방소득세 1.4%) */
const INTEREST_TAX_RATE = 0.154;

export interface CompoundInput {
  principal: number;
  monthly: number;
  annualRate: number;
  years: number;
  /** 연 복리 횟수 */
  compoundsPerYear: number;
  taxed: boolean;
}

export interface CompoundOutput {
  /** 세전 만기 금액 */
  futureValue: number;
  /** 총 납입 원금 (초기 원금 + 적립 총액) */
  totalPrincipal: number;
  /** 세전 이자 */
  interest: number;
  tax: number;
  /** 세후 만기 금액 */
  netFutureValue: number;
}

/**
 * 복리 계산.
 *
 * 초기 원금은 연 `compoundsPerYear`회 복리로 굴리고, 매월 적립분은
 * 월말 납입으로 보아 남은 기간만큼 같은 실효 수익률로 굴린다.
 * 순수 함수 — UI에 의존하지 않으므로 단위 테스트 대상.
 */
export function computeCompound(input: CompoundInput): CompoundOutput {
  const { principal, monthly, annualRate, years, compoundsPerYear, taxed } = input;

  const r = annualRate / 100;
  const n = Math.max(1, compoundsPerYear);
  const periods = n * years;

  // 초기 원금의 미래가치
  const lumpSum = principal * Math.pow(1 + r / n, periods);

  // 월 적립분의 미래가치 — 월 실효이율로 환산해 연금 미래가치 공식 적용
  const months = Math.round(years * 12);
  const monthlyRate = Math.pow(1 + r / n, n / 12) - 1;
  const annuity =
    monthlyRate === 0
      ? monthly * months
      : monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);

  const futureValue = lumpSum + annuity;
  const totalPrincipal = principal + monthly * months;
  const interest = futureValue - totalPrincipal;
  const tax = taxed ? Math.max(0, interest) * INTEREST_TAX_RATE : 0;

  return {
    futureValue,
    totalPrincipal,
    interest,
    tax,
    netFutureValue: futureValue - tax,
  };
}

const runtime: CalculatorRuntime = {
  slug: "compound-interest",
  fields: [
    {
      id: "principal",
      type: "number",
      label: "초기 원금",
      unit: "원",
      defaultValue: 10_000_000,
      min: 0,
      step: 1_000_000,
      comma: true,
    },
    {
      id: "monthly",
      type: "number",
      label: "매월 적립액",
      unit: "원",
      defaultValue: 0,
      min: 0,
      step: 100_000,
      comma: true,
      help: "매달 추가로 넣는 금액입니다. 거치식이면 0으로 두세요.",
    },
    {
      id: "annualRate",
      type: "number",
      label: "연 이자율",
      unit: "%",
      defaultValue: 5,
      min: 0,
      max: 100,
      step: 0.1,
    },
    {
      id: "years",
      type: "number",
      label: "기간",
      unit: "년",
      defaultValue: 10,
      min: 1,
      max: 60,
      step: 1,
    },
    {
      id: "compoundsPerYear",
      type: "select",
      label: "복리 주기",
      defaultValue: "12",
      options: [
        { value: "1", label: "연 1회" },
        { value: "4", label: "분기 (연 4회)" },
        { value: "12", label: "월 (연 12회)" },
        { value: "365", label: "일 (연 365회)" },
      ],
    },
    {
      id: "taxed",
      type: "toggle",
      label: "이자소득세 15.4% 적용",
      defaultValue: true,
      help: "일반 예적금 기준입니다. 비과세·세금우대 상품이면 끄세요.",
    },
  ],
  compute(values: FieldValues) {
    const result = computeCompound({
      principal: Number(values.principal) || 0,
      monthly: Number(values.monthly) || 0,
      annualRate: Number(values.annualRate) || 0,
      years: Number(values.years) || 0,
      compoundsPerYear: Number(values.compoundsPerYear) || 12,
      taxed: Boolean(values.taxed),
    });

    const taxed = Boolean(values.taxed);
    const finalAmount = taxed ? result.netFutureValue : result.futureValue;
    const growth =
      result.totalPrincipal > 0
        ? ((finalAmount - result.totalPrincipal) / result.totalPrincipal) * 100
        : 0;

    return {
      primary: {
        label: taxed ? "세후 만기 금액" : "만기 금액",
        value: won(finalAmount),
        sub: wonKorean(finalAmount),
      },
      rows: [
        { label: "총 납입 원금", value: won(result.totalPrincipal) },
        { label: "세전 이자", value: won(result.interest) },
        ...(taxed
          ? [{ label: "이자소득세 (15.4%)", value: `- ${won(result.tax)}` }]
          : []),
        { label: "원금 대비 수익률", value: `${num(growth, 1)}%` },
      ],
      note: "세전 기준 단순 계산입니다. 실제 상품의 이자 지급 방식과 우대금리, 중도해지 조건에 따라 결과가 달라질 수 있습니다.",
    };
  },
};

export default runtime;
