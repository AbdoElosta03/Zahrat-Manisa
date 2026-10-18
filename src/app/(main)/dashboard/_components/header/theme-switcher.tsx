"use client";

import { Moon, Sparkles, Sun } from "lucide-react";
import { useShallow } from "zustand/react/shallow";

import { Button } from "@/components/ui/button";
import type { ThemeMode } from "@/lib/preferences/theme";
import { usePreferencesStore } from "@/stores/preferences/preferences-provider";

const THEME_CYCLE: ThemeMode[] = ["light", "dark", "manisa"];

export function ThemeSwitcher() {
  const { themeMode, setPreference } = usePreferencesStore(
    useShallow((state) => ({
      themeMode: state.values.theme_mode,
      setPreference: state.setPreference,
    })),
  );

  const cycleTheme = () => {
    const currentIndex = THEME_CYCLE.indexOf(themeMode);
    const safeIndex = currentIndex >= 0 ? currentIndex : 0;
    const nextTheme = THEME_CYCLE[(safeIndex + 1) % THEME_CYCLE.length];

    setPreference("theme_mode", nextTheme);
  };

  return (
    <Button size="icon" onClick={cycleTheme} aria-label={`Current theme: ${themeMode}. Click to cycle themes`}>
      <Sun className="hidden [html[data-theme-mode=light]_&]:block" />
      <Moon className="hidden [html[data-theme-mode=dark]_&]:block" />
      <Sparkles className="hidden [html[data-theme-mode=manisa]_&]:block" />
    </Button>
  );
}
