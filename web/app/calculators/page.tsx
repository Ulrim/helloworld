import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CalculatorCard } from "@/components/CalculatorCard";
import { JsonLd } from "@/components/JsonLd";
import { CATEGORY_LIST, byCategory } from "@/lib/registry";
import { SITE } from "@/lib/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: `전체 계산기 | 세금·투자·부동산·근로·생활 | ${SITE.brandSuffix}`,
  description:
    "세금, 투자, 부동산, 근로, 건강, 생활 도구까지 제공하는 모든 계산기를 카테고리별로 모아 봅니다.",
  path: "/calculators",
});

const TRAIL = [
  { name: "홈", path: "/" },
  { name: "전체 계산기", path: "/calculators" },
];

export default function CalculatorsIndexPage() {
  return (
    <Container className="py-10 sm:py-14">
      <Breadcrumbs trail={TRAIL} />
      <h1 className="mt-4 text-2xl font-bold sm:text-3xl">전체 계산기</h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-fg-muted">
        분야별로 정리한 계산기 목록입니다. 회원가입 없이 바로 사용할 수 있습니다.
      </p>

      <div className="mt-10 space-y-12">
        {CATEGORY_LIST.map((category) => {
          const items = byCategory(category.id);
          if (items.length === 0) return null;

          return (
            <section key={category.id} aria-labelledby={`cat-${category.id}`}>
              <h2 id={`cat-${category.id}`} className="text-lg font-bold">
                <a href={`/calculators/${category.id}`} className="hover:text-brand">
                  {category.icon} {category.title}
                </a>
              </h2>
              <p className="mt-1 text-sm text-fg-muted">{category.keywordLine}</p>
              <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((calc) => (
                  <li key={calc.slug}>
                    <CalculatorCard calc={calc} />
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      <JsonLd data={breadcrumbJsonLd(TRAIL)} />
    </Container>
  );
}
