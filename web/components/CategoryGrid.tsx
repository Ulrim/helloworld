import Link from "next/link";
import { CATEGORY_LIST, categoryCounts } from "@/lib/registry";

export function CategoryGrid() {
  const counts = categoryCounts();

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {CATEGORY_LIST.map((category) => (
        <li key={category.id}>
          <Link
            href={`/calculators/${category.id}`}
            className="group flex h-full flex-col rounded-xl border border-border bg-surface p-5 transition hover:border-brand hover:shadow-sm"
          >
            <span aria-hidden className="text-2xl">
              {category.icon}
            </span>
            <span className="mt-3 font-semibold transition group-hover:text-brand">
              {category.title}
            </span>
            <span className="mt-1 text-sm text-fg-muted">{category.keywordLine}</span>
            <span className="mt-4 text-xs text-fg-muted">
              {counts[category.id] > 0 ? `${counts[category.id]}개 계산기` : "준비 중"}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
