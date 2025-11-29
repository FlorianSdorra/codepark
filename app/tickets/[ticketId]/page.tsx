import initialTickets from "@/data";
import { Placeholder } from "@/components/placeholder";
import { Button } from "@/components/ui/button";
import { ticketsPath } from "@/paths";
import Link from "next/link";

type TicketPageProps = {
  params: {
    ticketId: string;
  };
};

const TicketPage = async ({ params }: TicketPageProps) => {
  const { ticketId } = await params;

  const ticket = initialTickets.find((ticket) => ticket.id === ticketId);

  if (!ticket) {
    return (
      <div className="flex-1 flex">
        <Placeholder
          label="Ticket not found"
          button={
            <Button asChild variant={"outline"}>
              <Link href={ticketsPath()}>Go back to tickets</Link>
            </Button>
          }
        />
        <Placeholder label="Ticket not found" />
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-lg">Ticket Page for Ticket Nr: {ticket?.title}</h2>
      <p>{ticket?.content}</p>
    </div>
  );
};

export default TicketPage;
