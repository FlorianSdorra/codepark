import initialTickets from "@/data";

type TicketPageProps = {
  params: {
    ticketId: string;
  };
};

const TicketPage = async ({ params }: TicketPageProps) => {
  const { ticketId } = await params;

  const ticket = initialTickets.find((ticket) => ticket.id === ticketId);

  if (!ticket) {
    return <div>Ticket not found :( </div>;
  }

  return (
    <div>
      <h2 className="text-lg">Ticket Page for Ticket Nr: {ticket?.title}</h2>
      <p>{ticket?.content}</p>
    </div>
  );
};

export default TicketPage;
