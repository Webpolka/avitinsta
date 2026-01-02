// ----- Help Screens -----
interface HelpProps {
  title: string;
  text: string;
}

export function HelpStep({ title, text }: HelpProps) {
  return (
    <div className="flex flex-col w-full max-w-[550px]">
      <h2 className="ag-w2 sm:ag-w4 font-semibold text-center text-secondary mb-10">
        {title}
      </h2>
      <p className="ag-h3 text-secondary text-center">{text}</p>
    </div>
  );
}
