"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * 입력값을 브라우저에 보존한다. 계산기별로 키를 분리해 서로 덮어쓰지 않는다.
 *
 * 프라이빗 모드나 저장소 차단 환경에서는 읽기/쓰기가 예외를 던질 수 있으므로
 * 전부 try/catch 로 감싸고, 실패해도 컴포넌트는 초기값으로 정상 동작한다.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  const [hydrated, setHydrated] = useState(false);

  // SSR 결과와 어긋나지 않도록 마운트 후에 한 번만 복원한다
  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw !== null) setValue(JSON.parse(raw) as T);
    } catch {
      // 저장소를 못 읽으면 초기값을 그대로 쓴다
    }
    setHydrated(true);
  }, [key]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // 용량 초과나 차단 시 조용히 무시 — 계산 자체는 계속 동작해야 한다
    }
  }, [key, value, hydrated]);

  const reset = useCallback(() => {
    setValue(initialValue);
    try {
      localStorage.removeItem(key);
    } catch {
      // 삭제 실패는 무시
    }
  }, [key, initialValue]);

  return { value, setValue, reset, hydrated } as const;
}
