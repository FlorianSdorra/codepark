"use client";

import { Ticket } from "@/lib/generated/prisma/client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { upsertTicket } from "../queries/actions/upsert-ticket";
import { SubmitButton } from "@/components/form/submit-button";
import { useActionState } from "react";

type TicketUpsertFormProps = {
  ticket?: Ticket;
};

const TicketUpsertForm = ({ ticket }: TicketUpsertFormProps) => {
  const [actionState, action] = useActionState(
    upsertTicket.bind(null, ticket?.id),
    { message: "" }
  );

  return (
    <form action={action} className="flex flex-col gap-y-2 w-full">
      <Label htmlFor="title">Title</Label>
      <Input
        id="title"
        name="title"
        type="text"
        defaultValue={
          (actionState.payload?.get("title") as string) ?? ticket?.title
        }
      />

      <Label htmlFor="content">Content</Label>
      <Textarea
        id="content"
        name="content"
        defaultValue={
          (actionState.payload?.get("content") as string) ?? ticket?.content
        }
      />
      <SubmitButton label={ticket ? "Update Ticket" : "Create Ticket"} />
      {actionState.message}
    </form>
  );
};

export { TicketUpsertForm };
