"use client";

import { useEffect, useState } from "react";
import { Minus, Plus, Type } from "lucide-react";

const FONT_SIZES = [
  { label: "Normal", value: 100 },
  { label: "Grande", value: 112 },
  { label: "Muito grande", value: 125 },
];

const STORAGE_KEY = "nutrisaude_fontsize";

export function FontSizeControl() {
  const [sizeIndex, setSizeIndex] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const idx = FONT_SIZES.findIndex((s) => s.value === Number(saved));
      if (idx >= 0) {
        setSizeIndex(idx);
        document.documentElement.style.fontSize = `${FONT_SIZES[idx].value}%`;
      }
    }
  }, []);

  function changeSize(direction: "up" | "down") {
    const next = direction === "up"
      ? Math.min(sizeIndex + 1, FONT_SIZES.length - 1)
      : Math.max(sizeIndex - 1, 0);

    setSizeIndex(next);
    const size = FONT_SIZES[next];
    document.documentElement.style.fontSize = `${size.value}%`;
    localStorage.setItem(STORAGE_KEY, String(size.value));
  }

  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        disabled={sizeIndex === 0}
        className="flex size-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 disabled:opacity-30 active:bg-slate-100"
        onClick={() => changeSize("down")}
        title="Diminuir fonte"
      >
        <Minus className="size-3.5" />
      </button>
      <div className="flex items-center gap-1 px-1 text-[0.65rem] font-semibold text-slate-400">
        <Type className="size-3" />
        {FONT_SIZES[sizeIndex].label}
      </div>
      <button
        type="button"
        disabled={sizeIndex === FONT_SIZES.length - 1}
        className="flex size-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 disabled:opacity-30 active:bg-slate-100"
        onClick={() => changeSize("up")}
        title="Aumentar fonte"
      >
        <Plus className="size-3.5" />
      </button>
    </div>
  );
}
