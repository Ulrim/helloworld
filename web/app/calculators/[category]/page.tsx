import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CalculatorCard } from "@/components/CalculatorCard";
import { JsonLd } from "@/components/JsonLd";
import { CATEGORIES, CATEGORY_LIST, byCategory, isCategoryId } from "@/lib/registry";
import { breadcrumbJsonLd, categoryMetadata } from "@/lib/seo";

interface Props {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return CATEGORY_LIST.map((category) => ({ category: category.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  if (!isCategoryId(category)) return {};
  return categoryMetadata(CATEGORIES[category]);
}

export default async function CategoryHubPage({ params }: Props) {
  const { category: categoryId } = await params;
  if (!isCategoryId(categoryId)) notFound();

  const category = CATEGORIES[categoryId];
  const items = byCategory(categoryId);
  const ready = items.filter((c) => c.published);
  const upcoming = items.filter((c) => !c.published);

  const trail = [
    { name: "홈", path: "/" },
    { name: "전체 계산기", path: "/calculators" },
    { name: category.title, path: `/calculators/${category.id}` },
  ];

  return (
    <Container className="py-10 sm:py-14">
      <Breadcrumbs trail={trail} />

      <header className="mt-4">
        <span aria-hidden className="text-3xl">
          {category.icon}
        </span>
        <h1 className="mt-3 text-2xl font-bold sm:text-3xl">{category.title} 모음</h1>
        <p className="mt-2 text-sm font-medium text-brand">{category.keywordLine}</p>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-fg-muted">
          {category.description}
        </p>
      </header>

      {ready.length > 0 && (
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ready.map((calc) => (
            <li key={calc.slug}>
              <CalculatorCard calc={calc} />
            </li>
          ))}
        </ul>
      )}

      {upcoming.length > 0 && (
        <section className="mt-12">
          <h2 className="text-sm font-semibold text-fg-muted">준비 중인 계산기</h2>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((calc) => (
              <li key={calc.slug}>
                <CalculatorCard calc={calc} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <nav aria-label="다른 카테고리" className="mt-16 border-t border-border pt-8">
        <h2 className="text-sm font-semibold">다른 카테고리</h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {CATEGORY_LIST.filter((c) => c.id !== category.id).map((other) => (
            <li key={other.id}>
              <a
                href={`/calculators/${other.id}`}
                className="inline-block rounded-lg border border-border bg-surface px-3 py-1.5 text-sm text-fg-muted transition hover:border-brand hover:text-fg"
              >
                {other.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <JsonLd data={breadcrumbJsonLd(trail)} />
    </Container>
  );
}
