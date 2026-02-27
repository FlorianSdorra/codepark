import { useEffect, useRef } from "react";
import { ActionState } from "../utils/to-action-state";

type OnArgs = {
  actionState: ActionState;
};

type UseActionFeedbackOptions = {
  onSuccess?: (onArgs: OnArgs) => void;
  onError?: (onArgs: OnArgs) => void;
};

const useActionFeedback = (
  actionState: ActionState,
  options: UseActionFeedbackOptions,
) => {
  const prevTimestamp = useRef(actionState.timestamp);

  useEffect(() => {
    const isUpdated = prevTimestamp.current !== actionState.timestamp;
    if (!isUpdated) return; // to avoid calling onSuccess/onError on initial render / react compiler will take care of this in future

    if (actionState.status === "SUCCESS") {
      options.onSuccess?.({ actionState });
    }
    if (actionState.status === "ERROR") {
      options.onError?.({ actionState });
    }

    prevTimestamp.current = actionState.timestamp;
  }, [actionState, options]);
};

export { useActionFeedback };
