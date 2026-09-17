import { SOURCES, type SourceId } from "@/lib/sources";

/**
 * 돈·세금·건강 주제는 근거 출처 표기가 검색 신뢰도의 핵심이라
 * 모든 계산기 하단에 고정으로 노출한다.
 */
export function SourceNote({ sources }: { sources: SourceId[] }) {
  if (sources.length === 0) return null;

  return (
    <section
      aria-labelledby="sources-heading"
      className="rounded-xl border border-border bg-surface-muted p-5"
    >
      <h2 id="sources-heading" className="text-sm font-semibold">
        계산 근거
      </h2>
      <ul className="mt-3 flex flex-wrap gap-2">
        {sources.map((id) => {
          const source = SOURCES[id];
          return (
            <li key={id}>
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-md border border-border bg-surface px-2.5 py-1 text-xs text-fg-muted transition hover:text-fg"
              >
                {source.label} ↗
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
