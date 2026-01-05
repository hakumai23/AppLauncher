import Button from "./button";
export default function Header() {
  return (
    <header className="w-full h-16 p-4 flex justify-between items-center border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
      <div className="flex items-center gap-3 w-60">
        <img
          src="/logo.png"
          alt="App Logo"
          className="h-8 w-auto object-contain dark:invert-100"
        />
        <h1 className="text-lg font-semibold">App Launcher</h1>
      </div>
      <div>
        <Button title="Log In"></Button>
      </div>
    </header>
  );
}