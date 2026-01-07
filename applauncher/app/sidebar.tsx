import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { ThemeToggle } from "./theme-toggle";
import PagesButton from "./pagesbutton";
export default async function Sidebar() {
  const session = await getServerSession(authOptions);
  const isAdmin = !!session
  return (
    <aside className="w-60 shrink-0 border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-4 pt-4">
      <div className="font-medium">Sidebar</div>
      <PagesButton href="/"></PagesButton>
      {isAdmin &&(<>
      <PagesButton href="/admin" title="管理者用アプリ"></PagesButton><PagesButton href="/admin/edit" title="管理者用編集"></PagesButton></>)}
      <ThemeToggle></ThemeToggle>
    </aside>
  );
}