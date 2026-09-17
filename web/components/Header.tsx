import Link from "next/link";
import { Container } from "./Container";
import { ThemeToggle } from "./ThemeToggle";
import { SITE } from "@/lib/site";
import { CATEGORY_LIST } from "@/lib/registry";

const PRIMARY_NAV = CATEGORY_LIST.slice(0, 5);

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/85 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center gap-4">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2 text-lg font-bold tracking-tight"
          >
            <span
              aria-hidden
              className="grid size-8 place-items-center rounded-lg bg-brand text-brand-fg"
            >
              ⌘
            </span>
            {SITE.name}
          </Link>

          <nav aria-label="주요 카테고리" className="hidden flex-1 md:block">
            <ul className="flex items-center gap-1">
              {PRIMARY_NAV.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/calculators/${category.id}`}
                    className="rounded-lg px-3 py-2 text-sm font-medium text-fg-muted transition hover:bg-surface-muted hover:text-fg"
                  >
                    {category.title.replace(" 계산기", "")}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <Link
              href="/calculators"
              className="rounded-lg px-3 py-2 text-sm font-medium text-fg-muted transition hover:bg-surface-muted hover:text-fg"
            >
              전체 계산기
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </Container>
    </header>
  );
}
