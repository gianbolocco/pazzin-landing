"use client";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

function currentIsDark() {
  const t = document.documentElement.dataset.theme;
  return t ? t === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
}

export function ThemeToggle() {
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    setDark(currentIsDark());
    const mq = matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => { if (!document.documentElement.dataset.theme) setDark(mq.matches); };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  function toggle() {
    const next = dark ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("pazzit-theme", next); } catch {}
    setDark(!dark);
  }

  return (
    <button
      type="button"
      className="icon-btn theme-btn"
      onClick={toggle}
      aria-label={dark ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
      data-dark={dark ? "" : undefined}
      style={{ visibility: dark === null ? "hidden" : undefined }}
    >
      <Moon className="i-moon" size={20} strokeWidth={2} aria-hidden />
      <Sun className="i-sun" size={20} strokeWidth={2} aria-hidden />
    </button>
  );
}
