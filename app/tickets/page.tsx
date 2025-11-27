import Link from "next/link";
import initialTickets from "@/data";
import { ticketPath } from "@/paths";

const TICKET_ICONS = {
  OPEN: "O",
  DONE: "X",
};

const TicketsPage = () => {
  return (
    <div>
      {initialTickets.map((ticket) => {
        return (
          <div key={ticket.id}>
            <div>{TICKET_ICONS[ticket.status]}</div>
            <h2 className="text-6xl">Ticket Page</h2>
            <h2>{ticket.title}</h2>
            <Link href={ticketPath(ticket.id)} className="text-sm underline">
              VIEW
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default TicketsPage;
