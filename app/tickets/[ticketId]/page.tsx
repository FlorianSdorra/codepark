type TicketPageProps = {
  params: {
    ticketId: string;
  };
};

const TicketPage = ({ params }: TicketPageProps) => {
  return (
    <h2 className="text-lg">Ticket Page for Ticket Nr: {params.ticketId}</h2>
  );
};

export default TicketPage;
