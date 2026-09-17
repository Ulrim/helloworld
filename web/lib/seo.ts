import type { Metadata } from "next";
import { SITE } from "./site";
import type { CalculatorMeta, Category } from "./registry/types";

/**
 * 타이틀 공식을 코드로 강제한다.
 *   {이름} | {키워드 다발} | {브랜드}
 * 연도는 SITE.baseYear 한 곳에서 주입되므로 해가 바뀌면 상수 하나만 고치면 된다.
 */
export function buildTitle(name: string, keywordLine: string, year?: number): string {
  const head = year ? `${name} ${year}` : name;
  return `${head} | ${keywordLine} | ${SITE.brandSuffix}`;
}

function canonical(path: string): string {
  return new URL(path, SITE.url).toString();
}

export function pageMetadata(options: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}): Metadata {
  const url = canonical(options.path);
  return {
    title: options.title,
    description: options.description,
    keywords: options.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      locale: SITE.locale,
      title: options.title,
      description: options.description,
      url,
    },
    twitter: {
      card: "summary_large_image",
      title: options.title,
      description: options.description,
    },
  };
}

export function calculatorMetadata(calc: CalculatorMeta): Metadata {
  return pageMetadata({
    title: buildTitle(
      calc.title,
      calc.keywordLine,
      calc.yearSensitive ? SITE.baseYear : undefined,
    ),
    description: calc.description,
    path: `/calculators/${calc.category}/${calc.slug}`,
    keywords: calc.keywords,
  });
}

export function categoryMetadata(category: Category): Metadata {
  return pageMetadata({
    title: `${category.title} 모음 | ${category.keywordLine} | ${SITE.brandSuffix}`,
    description: category.description,
    path: `/calculators/${category.id}`,
    keywords: category.keywordLine.split("·"),
  });
}

/* ------------------------------ JSON-LD ------------------------------ */

export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: canonical(item.path),
    })),
  };
}

export function calculatorJsonLd(calc: CalculatorMeta) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: calc.title,
    description: calc.description,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    url: canonical(`/calculators/${calc.category}/${calc.slug}`),
    offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
  };
}

export function faqJsonLd(faq: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    inLanguage: "ko-KR",
  };
}
