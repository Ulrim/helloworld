const KRW = new Intl.NumberFormat("ko-KR");

/** 1234567 -> "1,234,567" */
export function num(value: number, digits = 0): string {
  if (!Number.isFinite(value)) return "-";
  return new Intl.NumberFormat("ko-KR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}

/** 1234567 -> "1,234,567원" */
export function won(value: number): string {
  if (!Number.isFinite(value)) return "-";
  return `${KRW.format(Math.round(value))}원`;
}

/** 0.0325 -> "3.25%" (입력은 비율이 아니라 퍼센트 값 3.25 기준) */
export function percent(value: number, digits = 2): string {
  if (!Number.isFinite(value)) return "-";
  return `${num(value, digits)}%`;
}

/** 큰 금액을 억/만 단위 한글로 — 결과 카드 보조 표기용 */
export function wonKorean(value: number): string {
  if (!Number.isFinite(value)) return "-";
  const abs = Math.abs(Math.round(value));
  if (abs < 10_000) return `${KRW.format(Math.round(value))}원`;
  const sign = value < 0 ? "-" : "";
  const eok = Math.floor(abs / 100_000_000);
  const man = Math.floor((abs % 100_000_000) / 10_000);
  const parts: string[] = [];
  if (eok > 0) parts.push(`${KRW.format(eok)}억`);
  if (man > 0) parts.push(`${KRW.format(man)}만`);
  return `${sign}${parts.join(" ")}원`;
}
