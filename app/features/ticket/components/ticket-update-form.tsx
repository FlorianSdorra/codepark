import { Ticket } from "@/lib/generated/prisma/client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { updateTicket } from "../queries/actions/update-ticket";

type TicketUpdateFormProps = {
  ticket: Ticket;
};

const TicketUpdateForm = ({ ticket }: TicketUpdateFormProps) => {
  return (
    <form
      action={updateTicket.bind(null, ticket.id)}
      className="flex flex-col gap-y-2 w-full"
    >
      <Label htmlFor="title">Title</Label>
      <Input id="title" name="title" type="text" defaultValue={ticket.title} />

      <Label htmlFor="content">Content</Label>
      <Textarea id="content" name="content" defaultValue={ticket.content} />

      <Button type="submit">Update</Button>
    </form>
  );
};

export { TicketUpdateForm };
