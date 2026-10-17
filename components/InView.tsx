"use client";
import { useEffect } from "react";

// Marca .is-in una sola vez cuando cada [data-inview] entra en pantalla. Sin JS, el CSS muestra el estado final.
export function InView() {
  useEffect(() => {
    document.documentElement.classList.add("io"); // avisa a THEME_SCRIPT que hidrató
    const els = document.querySelectorAll("[data-inview]");
    if (!("IntersectionObserver" in window)) { els.forEach((el) => el.classList.add("is-in")); return; }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.25 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
