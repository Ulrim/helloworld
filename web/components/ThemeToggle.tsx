"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem("theme", next);
    } catch {
      // 프라이빗 모드 등에서 저장이 막혀도 토글 자체는 동작해야 한다
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "라이트 모드로 전환" : "다크 모드로 전환"}
      className="grid size-9 place-items-center rounded-lg border border-border text-fg-muted transition hover:bg-surface-muted hover:text-fg"
    >
      {/* 하이드레이션 불일치를 피하려고 마운트 전에는 아이콘을 비워 둔다 */}
      <span aria-hidden className="text-base leading-none">
        {theme === null ? "" : theme === "dark" ? "☀️" : "🌙"}
      </span>
    </button>
  );
}

/**
 * 다크모드 깜빡임(FOUC) 방지 — <head>에서 동기 실행되어야 하므로
 * 문자열 스크립트로 주입한다.
 */
export const themeInitScript = `
(function(){
  try {
    var stored = localStorage.getItem('theme');
    var dark = stored ? stored === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', dark);
  } catch (e) {}
})();
`;
