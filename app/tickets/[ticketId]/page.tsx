import initialTickets from "@/data";
import { Placeholder } from "@/components/placeholder";
import { Button } from "@/components/ui/button";
import { ticketsPath } from "@/paths";
import Link from "next/link";
import { TicketItem } from "@/app/features/ticket/components/ticket-item";

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
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center animate-fade-from-top">
      <TicketItem ticket={ticket} isDetail={true} />
    </div>
  );
};

export default TicketPage;
