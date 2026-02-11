import { flattenError, ZodError } from "zod";

export type ActionState = {
  message: string;
  payload?: FormData;
  fieldErrors?: Record<string, string[] | undefined>; // TODO: make fieldErrors required
};

export const fromErrorToActionState = (
  error: unknown,
  formData: FormData,
): ActionState => {
  // if validation error with zod, return the first error message and the form data as payload
  if (error instanceof ZodError) {
    return {
      message: error.issues[0].message,
      fieldErrors: flattenError(error).fieldErrors,
      payload: formData,
    };
    // if an error with a message property, return that message and the form data as payload
    // e.g., Prisma errors
  } else if (error instanceof Error) {
    return {
      message: error.message,
      fieldErrors: {},
      payload: formData,
    };
    // if not an error instance but sth else. crashed return a generic message and the form data as payload
  } else {
    return {
      message: "An unknown error occurred.",
      fieldErrors: {},
      payload: formData,
    };
  }
};
