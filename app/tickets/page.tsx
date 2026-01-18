import { Suspense } from "react";
import { Heading } from "@/components/heading";
import { TicketList } from "../features/ticket/components/ticket-list";
import { Spinner } from "@/components/spinner";
import { CardCompact } from "@/components/card-compact";
import TicketCreateForm from "../features/ticket/components/ticket-create-form";

const TicketsPage = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="Tickets" description="All your tickets at one place" />
      <CardCompact
        title="Create Ticket"
        description="A new Ticket will be created"
        content={<TicketCreateForm />}
      />
      <Suspense fallback={<Spinner />}>
        <TicketList />
      </Suspense>
    </div>
  );
};

export default TicketsPage;
