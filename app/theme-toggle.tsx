"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch";

type Theme = "light" | "dark";

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getCurrentTheme(): Theme {
  if (typeof document === "undefined") return "light";
  const root = document.documentElement;
  if (root.classList.contains("dark")) return "dark";
  if (root.classList.contains("light")) return "light";
  return "light";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(theme);
  localStorage.setItem("theme", theme);
  listeners.forEach((listener) => listener());
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getCurrentTheme, () => "light");

  const isDark = theme === "dark";

  return (
    <div className="flex items-center gap-2 mr-4">
      <Sun className="h-4 w-4" />
      <Switch
        checked={isDark}
        onCheckedChange={() => {
          applyTheme(isDark ? "light" : "dark");
        }}
        aria-label={isDark ? "ライトモードに切り替え" : "ダークモードに切り替え"}
      />
      <Moon className="h-4 w-4" />
    </div>
  );
}
