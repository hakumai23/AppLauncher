import Header from "../header";
import Sidebar from "../sidebar";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-dvh flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4 bg-zinc-50 dark:bg-zinc-900">
          {children}
        </main>
      </div>
    </div>
  );
}
