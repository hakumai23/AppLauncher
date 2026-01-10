type CardProps = {
  src?: string;
  title?: string;
  description?: string;
  onClick?: () => void;
};
export default function Card({
  src = "/logo.png",
  title = "Title",
  description = "This is a description of the card. It provides additional information.",
  onClick = () => {},
}: CardProps) {
  if (!src || src == "") src = "/logo.png";
  return (
    <div
      className="relative flex flex-col flex-wrap gap-6 items-center justify-center w-70 h-90 m-2 mr-6 p-6 border rounded-xl border-zinc-200 dark:border-zinc-800 dark:bg-zinc-800/75 bg-zinc-200/30 transition duration-200 ease-out hover:-translate-y-1 hover:shadow-xl hover:scale-[1.02] hover:z-10 cursor-pointer"
      onClick={onClick}
    >
      <img src={src} alt={title} className="w-24 h-24 mb-16" />
      <span className="text-2xl font-semibold">{title}</span>
      <p className="text-[15px] text-center mt-2">{description}</p>
    </div>
  );
}
