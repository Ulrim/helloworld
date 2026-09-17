"use client";

import { useEffect, useState } from "react";
import { CalcShell } from "./CalcShell";
import { loadRuntime } from "@/lib/registry/runtime";
import type { CalculatorRuntime } from "@/lib/registry/types";

/**
 * 계산 로직을 slug 기준으로 동적 로드한다.
 * 계산기가 수백 개로 늘어도 클라이언트는 지금 보는 하나의 청크만 받는다.
 */
export function CalculatorRunner({ slug }: { slug: string }) {
  const [runtime, setRuntime] = useState<CalculatorRuntime | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let alive = true;
    setRuntime(null);
    setFailed(false);

    loadRuntime(slug)
      .then((loaded) => {
        if (!alive) return;
        if (loaded) setRuntime(loaded);
        else setFailed(true);
      })
      .catch(() => {
        if (alive) setFailed(true);
      });

    return () => {
      alive = false;
    };
  }, [slug]);

  if (failed) {
    return (
      <p className="rounded-xl border border-border bg-surface p-5 text-sm text-fg-muted">
        계산기를 불러오지 못했습니다. 잠시 후 새로고침해 주세요.
      </p>
    );
  }

  if (!runtime) {
    return (
      <div
        role="status"
        aria-label="계산기를 불러오는 중"
        className="grid gap-6 lg:grid-cols-[1fr_20rem]"
      >
        <div className="h-96 animate-pulse rounded-xl border border-border bg-surface-muted" />
        <div className="h-64 animate-pulse rounded-xl border border-border bg-surface-muted" />
      </div>
    );
  }

  return <CalcShell runtime={runtime} />;
}
