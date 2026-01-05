type ButtonProps = {
  onClick?: () => void;
  title?: string;
};
export default function Button({ onClick, title }: ButtonProps) {
  return (
    <button onClick={onClick} className="w-24 h-10 bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 p-2 font-semibold rounded-xl">{title}</button>
  );
}