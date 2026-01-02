
// ----- Help Screens -----
interface HelpProps {
  title: string;
  text: string;
}

export function HelpStep({ title, text }: HelpProps) {
  return (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <h1 className="text-3xl font-semibold">{title}</h1>
      <p className="text-sm text-gray-500">{text}</p>     
    </div>
  );
}
