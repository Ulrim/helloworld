import { CALCULATORS } from "./meta";
import { CATEGORIES, CATEGORY_LIST, isCategoryId } from "./categories";
import type { CalculatorMeta, CategoryId } from "./types";

export { CALCULATORS, CATEGORIES, CATEGORY_LIST, isCategoryId };
export type * from "./types";

/** 공개된(계산 로직이 구현된) 계산기만 */
export const PUBLISHED = CALCULATORS.filter((c) => c.published);

export function getCalculator(slug: string): CalculatorMeta | undefined {
  return CALCULATORS.find((c) => c.slug === slug);
}

export function getPublishedCalculator(slug: string): CalculatorMeta | undefined {
  return PUBLISHED.find((c) => c.slug === slug);
}

export function byCategory(category: CategoryId): CalculatorMeta[] {
  return CALCULATORS.filter((c) => c.category === category);
}

export function publishedByCategory(category: CategoryId): CalculatorMeta[] {
  return PUBLISHED.filter((c) => c.category === category);
}

export function categoryCounts(): Record<CategoryId, number> {
  const counts = Object.fromEntries(
    CATEGORY_LIST.map((c) => [c.id, 0]),
  ) as Record<CategoryId, number>;
  for (const calc of PUBLISHED) counts[calc.category] += 1;
  return counts;
}

/** 계산기 상세의 정규 경로 */
export function calculatorPath(calc: Pick<CalculatorMeta, "category" | "slug">): string {
  return `/calculators/${calc.category}/${calc.slug}`;
}

export function categoryPath(category: CategoryId): string {
  return `/calculators/${category}`;
}

/** related slug 배열 -> 메타 배열 (미공개 항목은 제외) */
export function relatedCalculators(calc: CalculatorMeta): CalculatorMeta[] {
  if (!calc.related?.length) return [];
  return calc.related
    .map((slug) => getPublishedCalculator(slug))
    .filter((c): c is CalculatorMeta => Boolean(c));
}
