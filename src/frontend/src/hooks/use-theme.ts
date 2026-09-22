import { useApp } from "@/hooks/use-app";

export function useTheme() {
  const { theme, toggleTheme } = useApp();
  return { theme, toggleTheme, isDark: theme === "dark" };
}
