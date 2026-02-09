import { ZodError } from "zod";

export type ActionState = {
  message: string;
  payload?: FormData;
};

export const fromErrorToActionState = (
  error: unknown,
  formData: FormData,
): ActionState => {
  // if validation error with zod, return the first error message and the form data as payload
  if (error instanceof ZodError) {
    return {
      message: error.issues[0].message,
      payload: formData,
    };
    // if an error with a message property, return that message and the form data as payload
    // e.g., Prisma errors
  } else if (error instanceof Error) {
    return {
      message: error.message,
      payload: formData,
    };
    // if not an error instance but sth else. crashed return a generic message and the form data as payload
  } else {
    return {
      message: "An unknown error occurred.",
      payload: formData,
    };
  }
};
