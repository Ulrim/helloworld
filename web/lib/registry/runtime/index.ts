import type { CalculatorRuntime } from "../types";

/**
 * slug -> 계산 로직 모듈 로더.
 *
 * 동적 import 로 두면 계산기를 아무리 늘려도 클라이언트 번들에는
 * 지금 보고 있는 계산기 하나의 청크만 실린다.
 * 계산기를 추가할 때 meta.ts 항목과 함께 여기 한 줄을 더한다.
 */
const loaders: Record<string, () => Promise<{ default: CalculatorRuntime }>> = {
  "compound-interest": () => import("./compound-interest"),
};

export function hasRuntime(slug: string): boolean {
  return slug in loaders;
}

export async function loadRuntime(slug: string): Promise<CalculatorRuntime | null> {
  const loader = loaders[slug];
  if (!loader) return null;
  const mod = await loader();
  return mod.default;
}
