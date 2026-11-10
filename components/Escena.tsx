"use client";
import { useRef, type ComponentProps } from "react";
import { useProgreso } from "@/lib/progreso";

// Una sección que expone su progreso de scroll como --p; el CSS decide qué hace cada pieza con él.
export function Escena({ modo, ...props }: ComponentProps<"section"> & { modo: "salida" | "fijo" }) {
  const ref = useRef<HTMLElement>(null);
  useProgreso(ref, modo);
  return <section ref={ref} {...props} />;
}
