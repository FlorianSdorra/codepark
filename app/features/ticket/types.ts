type TicketStatus = "CLOSED" | "IN_PROGRESS" | "OPEN";

type Ticket = {
  id: string;
  title: string;
  content: string;
  status: TicketStatus;
};

export type { Ticket };
