import Link from "next/link";
import { Container } from "./Container";
import { SITE } from "@/lib/site";
import { CATEGORY_LIST } from "@/lib/registry";

const INFO_LINKS = [
  { href: "/about", label: "소개" },
  { href: "/features", label: "특징" },
  { href: "/faq", label: "자주 묻는 질문" },
];

const LEGAL_LINKS = [
  { href: "/terms", label: "이용약관" },
  { href: "/privacy-policy", label: "개인정보처리방침" },
];

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-surface-muted">
      <Container className="py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <p className="text-base font-bold">{SITE.name}</p>
            <p className="mt-2 text-sm text-fg-muted">{SITE.tagline}</p>
          </div>

          <nav aria-label="계산기 카테고리">
            <p className="text-sm font-semibold">계산기</p>
            <ul className="mt-3 space-y-2">
              {CATEGORY_LIST.slice(0, 5).map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/calculators/${category.id}`}
                    className="text-sm text-fg-muted transition hover:text-fg"
                  >
                    {category.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="서비스 정보">
            <p className="text-sm font-semibold">서비스</p>
            <ul className="mt-3 space-y-2">
              {INFO_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-fg-muted transition hover:text-fg"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="약관">
            <p className="text-sm font-semibold">약관</p>
            <ul className="mt-3 space-y-2">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-fg-muted transition hover:text-fg"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="mt-10 border-t border-border pt-6 text-xs leading-relaxed text-fg-muted">
          계산 결과는 참고용이며 법적 효력이 없습니다. 실제 세액과 수령액은 개별
          상황과 최신 법령에 따라 달라질 수 있으므로 중요한 의사결정 전에는
          관련 기관이나 전문가의 확인을 받으시기 바랍니다.
          <br />
          <span className="mt-2 inline-block">
            © {new Date().getFullYear()} {SITE.name}
          </span>
        </p>
      </Container>
    </footer>
  );
}
