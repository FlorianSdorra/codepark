import Link from "next/link";
import initialTickets from "@/data";
import { ticketPath } from "@/paths";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { CircleCheck, Pencil, FileText } from "lucide-react";
import { Heading } from "@/components/heading";

const TICKET_ICONS = {
  OPEN: <FileText />,
  IN_PROGRESS: <Pencil />,
  DONE: <CircleCheck />,
};

const TicketsPage = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="Tickets" description="All your tickets at one place" />
      <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-from-top">
        {initialTickets.map((ticket) => {
          return (
            <Card key={ticket.id} className="w-full max-w-[420px]">
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
              <CardFooter>
                <Link
                  href={ticketPath(ticket.id)}
                  className="text-sm font-bold underline"
                >
                  View
                </Link>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default TicketsPage;
