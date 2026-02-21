import { flattenError, ZodError } from "zod";

export type ActionState = {
  status?: "SUCCESS" | "ERROR";
  message: string;
  payload?: FormData;
  fieldErrors: Record<string, string[] | undefined>; // TODO: make fieldErrors required
  timestamp: number;
};

export const EMPTY_ACTION_STATE: ActionState = {
  message: "",
  fieldErrors: {},
  timestamp: Date.now(),
};

export const fromErrorToActionState = (
  error: unknown,
  formData: FormData,
): ActionState => {
  // if validation error with zod, return the first error message and the form data as payload
  if (error instanceof ZodError) {
    return {
      status: "ERROR",
      message: error.issues[0].message,
      fieldErrors: flattenError(error).fieldErrors,
      payload: formData,
      timestamp: Date.now(),
    };
    // if an error with a message property, return that message and the form data as payload
    // e.g., Prisma errors
  } else if (error instanceof Error) {
    return {
      status: "ERROR",
      message: error.message,
      fieldErrors: {},
      payload: formData,
      timestamp: Date.now(),
    };
    // if not an error instance but sth else. crashed return a generic message and the form data as payload
  } else {
    return {
      status: "ERROR",
      message: "An unknown error occurred.",
      fieldErrors: {},
      payload: formData,
      timestamp: Date.now(),
    };
  }
};

export const toActionState = (
  status: ActionState["status"],
  message: string,
): ActionState => {
  return {
    status,
    message,
    fieldErrors: {},
    timestamp: Date.now(),
  };
};
