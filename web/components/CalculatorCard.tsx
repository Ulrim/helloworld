import Link from "next/link";
import type { CalculatorMeta } from "@/lib/registry/types";
import { calculatorPath } from "@/lib/registry";

export function CalculatorCard({ calc }: { calc: CalculatorMeta }) {
  if (!calc.published) {
    return (
      <div className="rounded-xl border border-dashed border-border p-5 opacity-60">
        <p className="font-semibold">{calc.title}</p>
        <p className="mt-1 line-clamp-2 text-sm text-fg-muted">{calc.keywordLine}</p>
        <span className="mt-3 inline-block rounded-md bg-surface-muted px-2 py-0.5 text-xs text-fg-muted">
          준비 중
        </span>
      </div>
    );
  }

  return (
    <Link
      href={calculatorPath(calc)}
      className="group rounded-xl border border-border bg-surface p-5 transition hover:border-brand hover:shadow-sm"
    >
      <p className="font-semibold transition group-hover:text-brand">{calc.title}</p>
      <p className="mt-1 line-clamp-2 text-sm text-fg-muted">{calc.keywordLine}</p>
    </Link>
  );
}
