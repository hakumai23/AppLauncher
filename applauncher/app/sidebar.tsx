import { ThemeToggle } from "./theme-toggle";
export default function Sidebar() {
  return (
    <aside className="w-60 shrink-0 border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-4 pt-4">
      <div className="font-medium">Sidebar</div>
      <ThemeToggle></ThemeToggle>
    </aside>
  );
}