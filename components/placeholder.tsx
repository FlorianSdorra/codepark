import { LucideMessageSquareWarning } from "lucide-react";
import { cloneElement } from "react";
import { JSX } from "react";

type PlaceholderProps = {
  label: string;
  icon?: JSX.Element;
  button?: JSX.Element | null;
};

const Placeholder = ({
  label,
  icon = <LucideMessageSquareWarning />,
  button = <div className="h-10" />,
}: PlaceholderProps) => {
  return (
    <div className="flex-1 self-center flex flex-col items-center justify-center gap-y-2">
      {cloneElement(icon, {
        className: "w-16 h-16",
      })}

      <h2 className="text-lg text-center">{label}</h2>
      {button}
    </div>
  );
};

export { Placeholder };
