import Link from "next/link";
import clsx from "clsx";
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
  isDetail?: boolean;
};

const TicketItem = ({ ticket, isDetail }: TiketItemProps) => {
  const detailButton = (
    <Button variant={"outline"} asChild size={"icon"}>
      <Link href={ticketPath(ticket.id)} className="text-sm font-bold">
        <LucideSquareArrowOutUpRight />
      </Link>
    </Button>
  );

  return (
    <div
      className={clsx("flex w-full gap-x-1 ", {
        "max-w-[580]": isDetail,
        "max-w-[420px]": !isDetail,
      })}
    >
      <Card key={ticket.id} className="w-full">
        <CardHeader>
          <CardTitle className="flex gap-x-2">
            <span>{TICKET_ICONS[ticket.status]}</span>
            <span className="truncate text-xl">{ticket.title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <span
            className={clsx("whitespace-break-spaces", {
              "line-clamp-3": !isDetail,
            })}
          >
            {ticket.content}
            {ticket.content}
            {ticket.content}
            {ticket.content}
            {ticket.content}
            {ticket.content}
            {ticket.content}
            {ticket.content}
            {ticket.content}
            {ticket.content}
            {ticket.content}
            {ticket.content}
            {ticket.content}
            {ticket.content}
            {ticket.content}
            {ticket.content}
            {ticket.content}
            {ticket.content}
            {ticket.content}
            {ticket.content}
          </span>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
      {isDetail ? null : (
        <div className="flex flex-col gap-y-2">{detailButton}</div>
      )}
    </div>
  );
};

export { TicketItem };
