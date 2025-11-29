import Link from "next/link";
import { ticketPath } from "@/paths";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { CircleCheck, Pencil, FileText } from "lucide-react";

const TICKET_ICONS = {
  OPEN: <FileText />,
  IN_PROGRESS: <Pencil />,
  DONE: <CircleCheck />,
};

type Ticket = {
  id: string;
  title: string;
  content: string;
  status: "DONE" | "IN_PROGRESS" | "OPEN";
};

type TiketItemProps = {
  ticket: Ticket;
};

const TicketItem = ({ ticket }: TiketItemProps) => {
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
};

export { TicketItem };
