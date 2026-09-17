import type { MetadataRoute } from "next";
import { CATEGORY_LIST, PUBLISHED, calculatorPath, categoryPath } from "@/lib/registry";
import { SITE } from "@/lib/site";

const STATIC_PATHS = ["/", "/calculators", "/about", "/features", "/faq", "/terms", "/privacy-policy"];

/**
 * 레지스트리를 순회해 자동 생성한다 — 수동 관리 금지.
 * 미공개(published:false) 계산기는 실제 페이지가 없으므로 제외된다.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const url = (path: string) => new URL(path, SITE.url).toString();

  return [
    ...STATIC_PATHS.map((path) => ({
      url: url(path),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : 0.6,
    })),
    ...CATEGORY_LIST.map((category) => ({
      url: url(categoryPath(category.id)),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...PUBLISHED.map((calc) => ({
      url: url(calculatorPath(calc)),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
