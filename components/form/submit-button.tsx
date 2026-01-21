import { LucideLoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

type SubmitButtonProps = {
  label: string;
};

const SubmitButton = ({ label }: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit">
      {label}
      {pending && <LucideLoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
    </Button>
  );
};

export { SubmitButton };
