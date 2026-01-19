import { getTicket } from "@/app/features/ticket/queries/get-ticket";
import { CardCompact } from "@/components/card-compact";
import { TicketUpdateForm } from "@/app/features/ticket/components/ticket-update-form";
import { notFound } from "next/navigation";

type TicketPageProps = {
  params: {
    ticketId: string;
  };
};

const TicketEditPage = async ({ params }: TicketPageProps) => {
  const { ticketId } = await params;

  const ticket = await getTicket(ticketId);

  if (!ticket) {
    return notFound();
  }

  return (
    <div className="flex-1 flex flex-col justify-center items-center ">
      <CardCompact
        className="w-full max-w-[420px] animate-fade-from-top"
        title={`Edit Ticket ${ticketId}`}
        description="Here you can edit the ticket details."
        content={<TicketUpdateForm ticket={ticket} />}
      />
    </div>
  );
};

export default TicketEditPage;
