import { describe, expect, it } from "vitest";
import { computeCompound } from "../runtime/compound-interest";

const base = {
  principal: 10_000_000,
  monthly: 0,
  annualRate: 5,
  years: 10,
  compoundsPerYear: 1,
  taxed: false,
};

describe("computeCompound", () => {
  it("연 1회 복리는 교과서 공식과 일치한다", () => {
    const { futureValue } = computeCompound(base);
    expect(futureValue).toBeCloseTo(10_000_000 * Math.pow(1.05, 10), 2);
  });

  it("이자율 0이면 원금이 그대로 남는다", () => {
    const r = computeCompound({ ...base, annualRate: 0, monthly: 100_000 });
    expect(r.futureValue).toBeCloseTo(10_000_000 + 100_000 * 120, 2);
    expect(r.interest).toBeCloseTo(0, 6);
  });

  it("복리 주기가 잦을수록 만기 금액이 커진다", () => {
    const yearly = computeCompound({ ...base, compoundsPerYear: 1 }).futureValue;
    const monthly = computeCompound({ ...base, compoundsPerYear: 12 }).futureValue;
    const daily = computeCompound({ ...base, compoundsPerYear: 365 }).futureValue;
    expect(monthly).toBeGreaterThan(yearly);
    expect(daily).toBeGreaterThan(monthly);
  });

  it("과세 옵션은 이자에만 15.4%를 매긴다", () => {
    const r = computeCompound({ ...base, taxed: true });
    expect(r.tax).toBeCloseTo(r.interest * 0.154, 6);
    expect(r.netFutureValue).toBeCloseTo(r.futureValue - r.tax, 6);
  });

  it("적립식은 총 납입 원금에 월 납입액 합계가 포함된다", () => {
    const r = computeCompound({ ...base, monthly: 500_000, years: 3 });
    expect(r.totalPrincipal).toBe(10_000_000 + 500_000 * 36);
  });
});
