import { ticketsPath, homePath } from "@/paths";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Kanban } from "lucide-react";

const Header = () => {
  return (
    <nav
      className="
            flex justify-between 
            supports-backdrop-blur:bg-background/60
            fixed left-0 right-0 top-0 z-20 bg-background/95 backdrop-blur
            w-full p-5 border-b"
    >
      <Button asChild variant={"ghost"}>
        <Link href={homePath()}>
          <Kanban />
          <h1 className="text-lg font-bold">TicketBounty</h1>{" "}
        </Link>
        {/* as child property lets just the anchor tag appear in the DOM */}
      </Button>
      <Link
        href={ticketsPath()}
        className={buttonVariants({ variant: "default" })}
      >
        Tickets
      </Link>
      {/* same outcome, different approach */}
    </nav>
  );
};

export { Header };
