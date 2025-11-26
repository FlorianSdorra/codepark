import Link from "next/link";
import initialTickets from "@/data";

const TicketsPage = () => {
  return (
    <div>
      <h2 className="text-6xl">Ticket Page</h2>
      {initialTickets.map((ticket) => {
        return (
          <div key={ticket.id}>
            <h2>{ticket.title}</h2>
            <Link href={`/tickets/${ticket.id}`} className="text-sm underline">
              VIEW
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default TicketsPage;
