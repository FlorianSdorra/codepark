import Link from "next/link";
import { ticketPath } from "@/paths";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Ticket } from "@/app/features/ticket/types";
import { TICKET_ICONS } from "@/app/features/ticket/constants";
import { LucideSquareArrowOutUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type TiketItemProps = {
  ticket: Ticket;
};

const TicketItem = ({ ticket }: TiketItemProps) => {
  const detailButton = (
    <Button variant={"outline"} asChild size={"icon"}>
      <Link href={ticketPath(ticket.id)} className="text-sm font-bold">
        <LucideSquareArrowOutUpRight />
      </Link>
    </Button>
  );

  return (
    <div className="flex w-full max-w-[420px] gap-x-1">
      <Card key={ticket.id} className="w-full">
        <CardHeader>
          <CardTitle className="flex gap-x-2">
            <span>{TICKET_ICONS[ticket.status]}</span>
            <span className="truncate text-xl">{ticket.title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <span className="line-clamp-3 whitespace-break-spaces">
            {ticket.content}
          </span>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
      <div className="flex flex-col gap-y-2">{detailButton}</div>
    </div>
  );
};

export { TicketItem };
