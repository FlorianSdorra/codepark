"use server";

import { redirect } from "next/navigation";
import { prisma } from "../../../../../lib/prisma";
import { ticketsPath } from "@/paths";
import { revalidatePath } from "next/cache";

export const createTicket = async (formData: FormData) => {
  const data = {
    title: formData.get("title") as string,
    content: formData.get("content") as string,
  };

  await prisma.ticket.create({
    data: {
      title: data.title,
      content: data.content,
    },
  });
  // TODO: Add flash message for successful deletion

  revalidatePath(ticketsPath());

  redirect(ticketsPath());
};
