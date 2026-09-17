"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocalStorage } from "@/lib/hooks/useLocalStorage";
import { num } from "@/lib/format";
import type {
  CalcResult,
  CalculatorRuntime,
  Field,
  FieldValues,
} from "@/lib/registry/types";

/**
 * 모든 계산기가 공유하는 껍데기.
 * 계산기는 fields(폼 스키마) + compute(순수 함수)만 제공하면
 * 입력 UI, 상태 저장, 결과 카드가 전부 여기서 나온다.
 */
export function CalcShell({ runtime }: { runtime: CalculatorRuntime }) {
  const defaults = useMemo<FieldValues>(
    () =>
      Object.fromEntries(runtime.fields.map((f) => [f.id, f.defaultValue])) as FieldValues,
    [runtime],
  );

  const { value: values, setValue, reset } = useLocalStorage<FieldValues>(
    `calc:${runtime.slug}`,
    defaults,
  );

  // 저장된 값에 없는 신규 필드는 기본값으로 메운다 (필드 추가 후 호환)
  const merged = useMemo<FieldValues>(() => ({ ...defaults, ...values }), [defaults, values]);

  const result = useMemo<CalcResult | { error: string }>(() => {
    try {
      return runtime.compute(merged);
    } catch {
      return { error: "입력값을 확인해 주세요." };
    }
  }, [runtime, merged]);

  function update(id: string, next: number | string | boolean) {
    setValue({ ...merged, [id]: next });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_20rem] lg:items-start">
      <form
        className="rounded-xl border border-border bg-surface p-5 sm:p-6"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="space-y-5">
          {runtime.fields.map((field) => (
            <FieldInput
              key={field.id}
              field={field}
              value={merged[field.id]}
              onChange={(next) => update(field.id, next)}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={reset}
          className="mt-6 rounded-lg border border-border px-3 py-2 text-sm text-fg-muted transition hover:bg-surface-muted hover:text-fg"
        >
          입력값 초기화
        </button>
      </form>

      <ResultCard result={result} />
    </div>
  );
}

function FieldInput({
  field,
  value,
  onChange,
}: {
  field: Field;
  value: number | string | boolean;
  onChange: (next: number | string | boolean) => void;
}) {
  const describedBy = field.help ? `${field.id}-help` : undefined;

  if (field.type === "toggle") {
    return (
      <div className="flex items-start gap-3">
        <input
          id={field.id}
          type="checkbox"
          checked={Boolean(value)}
          onChange={(e) => onChange(e.target.checked)}
          aria-describedby={describedBy}
          className="mt-0.5 size-4 accent-[var(--brand)]"
        />
        <div>
          <label htmlFor={field.id} className="text-sm font-medium">
            {field.label}
          </label>
          {field.help && (
            <p id={describedBy} className="mt-1 text-xs text-fg-muted">
              {field.help}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <label htmlFor={field.id} className="block text-sm font-medium">
        {field.label}
      </label>

      <div className="mt-2 flex items-center gap-2">
        {field.type === "select" ? (
          <select
            id={field.id}
            value={String(value)}
            onChange={(e) => onChange(e.target.value)}
            aria-describedby={describedBy}
            className="w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm"
          >
            {field.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <>
            {field.comma ? (
              <CommaInput
                id={field.id}
                value={Number(value)}
                onChange={onChange}
                describedBy={describedBy}
              />
            ) : (
              <input
                id={field.id}
                type="number"
                inputMode="decimal"
                value={Number.isFinite(Number(value)) ? String(value) : ""}
                min={field.min}
                max={field.max}
                step={field.step}
                onChange={(e) => onChange(e.target.value === "" ? 0 : Number(e.target.value))}
                aria-describedby={describedBy}
                className="tnum w-full rounded-lg border border-border bg-bg px-3 py-2 text-right text-sm"
              />
            )}
            {field.unit && (
              <span className="shrink-0 text-sm text-fg-muted">{field.unit}</span>
            )}
          </>
        )}
      </div>

      {field.help && (
        <p id={describedBy} className="mt-1.5 text-xs text-fg-muted">
          {field.help}
        </p>
      )}
    </div>
  );
}

/** 금액 입력 — 천단위 콤마를 보여 준다.
 *  type="number"는 콤마를 렌더할 수 없어 text + inputMode로 처리한다. */
function CommaInput({
  id,
  value,
  onChange,
  describedBy,
}: {
  id: string;
  value: number;
  onChange: (next: number) => void;
  describedBy?: string;
}) {
  const [text, setText] = useState(() => num(value));

  // 초기화 버튼 등 외부에서 값이 바뀌면 표시를 맞춘다
  useEffect(() => {
    setText((current) => (parseDigits(current) === value ? current : num(value)));
  }, [value]);

  return (
    <input
      id={id}
      type="text"
      inputMode="numeric"
      value={text}
      onChange={(e) => {
        const digits = e.target.value.replace(/[^\d]/g, "");
        setText(digits === "" ? "" : num(Number(digits)));
        onChange(digits === "" ? 0 : Number(digits));
      }}
      aria-describedby={describedBy}
      className="tnum w-full rounded-lg border border-border bg-bg px-3 py-2 text-right text-sm"
    />
  );
}

function parseDigits(text: string): number {
  const digits = text.replace(/[^\d]/g, "");
  return digits === "" ? 0 : Number(digits);
}

function ResultCard({ result }: { result: CalcResult | { error: string } }) {
  if ("error" in result) {
    return (
      <output className="block rounded-xl border border-border bg-surface p-5 text-sm text-fg-muted">
        {result.error}
      </output>
    );
  }

  return (
    <output className="block rounded-xl border border-border bg-surface p-5 lg:sticky lg:top-24">
      <p className="text-sm text-fg-muted">{result.primary.label}</p>
      <p className="tnum mt-1 text-2xl font-bold text-brand sm:text-3xl">
        {result.primary.value}
      </p>
      {result.primary.sub && (
        <p className="mt-1 text-sm text-fg-muted">{result.primary.sub}</p>
      )}

      <dl className="mt-5 space-y-3 border-t border-border pt-5">
        {result.rows.map((row) => (
          <div key={row.label} className="flex items-baseline justify-between gap-4">
            <dt className="text-sm text-fg-muted">{row.label}</dt>
            <dd className="tnum text-sm font-medium">{row.value}</dd>
          </div>
        ))}
      </dl>

      {result.note && (
        <p className="mt-5 border-t border-border pt-4 text-xs leading-relaxed text-fg-muted">
          {result.note}
        </p>
      )}
    </output>
  );
}
