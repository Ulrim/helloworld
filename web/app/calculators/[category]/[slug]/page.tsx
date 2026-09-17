import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CalculatorRunner } from "@/components/CalculatorRunner";
import { CalculatorCard } from "@/components/CalculatorCard";
import { SourceNote } from "@/components/SourceNote";
import { JsonLd } from "@/components/JsonLd";
import {
  CATEGORIES,
  PUBLISHED,
  getPublishedCalculator,
  relatedCalculators,
} from "@/lib/registry";
import {
  breadcrumbJsonLd,
  calculatorJsonLd,
  calculatorMetadata,
  faqJsonLd,
} from "@/lib/seo";

interface Props {
  params: Promise<{ category: string; slug: string }>;
}

export function generateStaticParams() {
  return PUBLISHED.map((calc) => ({ category: calc.category, slug: calc.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const calc = getPublishedCalculator(slug);
  return calc ? calculatorMetadata(calc) : {};
}

export default async function CalculatorPage({ params }: Props) {
  const { category, slug } = await params;
  const calc = getPublishedCalculator(slug);

  // 카테고리가 어긋난 URL은 중복 색인을 만들므로 정규 경로만 허용한다
  if (!calc || calc.category !== category) notFound();

  const meta = CATEGORIES[calc.category];
  const related = relatedCalculators(calc);
  const trail = [
    { name: "홈", path: "/" },
    { name: "전체 계산기", path: "/calculators" },
    { name: meta.title, path: `/calculators/${meta.id}` },
    { name: calc.title, path: `/calculators/${calc.category}/${calc.slug}` },
  ];

  return (
    <Container className="py-10 sm:py-14">
      <Breadcrumbs trail={trail} />

      <header className="mt-4">
        <h1 className="text-2xl font-bold sm:text-3xl">{calc.title}</h1>
        <p className="mt-2 text-sm font-medium text-brand">{calc.keywordLine}</p>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-fg-muted">
          {calc.description}
        </p>
      </header>

      <div className="mt-8">
        <CalculatorRunner slug={calc.slug} />
      </div>

      {calc.faq && calc.faq.length > 0 && (
        <section aria-labelledby="faq-heading" className="mt-14">
          <h2 id="faq-heading" className="text-xl font-bold">
            자주 묻는 질문
          </h2>
          <dl className="mt-5 space-y-5">
            {calc.faq.map((item) => (
              <div
                key={item.q}
                className="rounded-xl border border-border bg-surface p-5"
              >
                <dt className="font-semibold">{item.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-fg-muted">{item.a}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      <div className="mt-10">
        <SourceNote sources={[...calc.sources]} />
      </div>

      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="mt-12">
          <h2 id="related-heading" className="text-sm font-semibold">
            함께 보면 좋은 계산기
          </h2>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <li key={item.slug}>
                <CalculatorCard calc={item} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <p className="mt-12 text-sm">
        <Link href={`/calculators/${meta.id}`} className="text-brand hover:underline">
          ← {meta.title} 전체 보기
        </Link>
      </p>

      <JsonLd data={breadcrumbJsonLd(trail)} />
      <JsonLd data={calculatorJsonLd(calc)} />
      {calc.faq && calc.faq.length > 0 && <JsonLd data={faqJsonLd(calc.faq)} />}
    </Container>
  );
}
