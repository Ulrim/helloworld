import Link from "next/link";
import { Container } from "@/components/Container";
import { CategoryGrid } from "@/components/CategoryGrid";
import { CalculatorCard } from "@/components/CalculatorCard";
import { PUBLISHED } from "@/lib/registry";
import { SITE } from "@/lib/site";
import { SOURCES } from "@/lib/sources";

const TRUST_SOURCES = [
  SOURCES.nts,
  SOURCES.moel,
  SOURCES.bok,
  SOURCES.fss,
  SOURCES.law,
] as const;

export default function HomePage() {
  const popular = PUBLISHED.slice(0, 6);

  return (
    <>
      <section className="border-b border-border bg-surface-muted">
        <Container className="py-16 sm:py-24">
          <p className="text-sm font-medium text-brand">공식 데이터 기반</p>
          <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
            흩어진 계산을
            <br className="hidden sm:block" /> 한 곳에서 끝내세요
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-fg-muted sm:text-lg">
            {SITE.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/calculators"
              className="rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-brand-fg transition hover:opacity-90"
            >
              전체 계산기 보기
            </Link>
            <Link
              href="/about"
              className="rounded-lg border border-border bg-surface px-5 py-3 text-sm font-semibold transition hover:bg-bg"
            >
              서비스 소개
            </Link>
          </div>
        </Container>
      </section>

      <Container className="py-14 sm:py-20">
        <h2 className="text-xl font-bold sm:text-2xl">카테고리</h2>
        <p className="mt-2 text-sm text-fg-muted">
          필요한 분야를 골라 바로 계산해 보세요.
        </p>
        <div className="mt-6">
          <CategoryGrid />
        </div>
      </Container>

      {popular.length > 0 && (
        <Container className="pb-14 sm:pb-20">
          <h2 className="text-xl font-bold sm:text-2xl">많이 찾는 계산기</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {popular.map((calc) => (
              <li key={calc.slug}>
                <CalculatorCard calc={calc} />
              </li>
            ))}
          </ul>
        </Container>
      )}

      <Container className="pb-20">
        <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
          <h2 className="text-lg font-bold">계산 근거는 공공 데이터입니다</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-fg-muted">
            모든 계산식은 관계 기관이 공개한 자료와 법령을 기준으로 작성하며,
            개정 사항이 확인되면 반영합니다. 계산기마다 어떤 자료를 참고했는지
            하단에 표기합니다.
          </p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {TRUST_SOURCES.map((source) => (
              <li
                key={source.id}
                className="rounded-md border border-border bg-surface-muted px-2.5 py-1 text-xs text-fg-muted"
              >
                {source.label}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </>
  );
}
