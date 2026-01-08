import { Placeholder } from "@/components/placeholder";
import { Button } from "@/components/ui/button";
import { ticketsPath } from "@/paths";
import Link from "next/link";

const notFound = () => (
  <div className="flex-1 flex">
    <Placeholder
      label="Ticket not found"
      button={
        <Button asChild variant={"outline"}>
          <Link href={ticketsPath()}>Go back to tickets</Link>
        </Button>
      }
    />
  </div>
);

export default notFound;
