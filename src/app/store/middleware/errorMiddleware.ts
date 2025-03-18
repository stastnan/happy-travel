import { enqueueSnackbar } from "notistack";

import { Middleware } from "@reduxjs/toolkit";
import { isRejectedWithValue } from "@reduxjs/toolkit";

export const rtkQueryErrorLogger: Middleware =
  () => (next) => (action: unknown) => {
    if (isRejectedWithValue(action)) {
      enqueueSnackbar(action.error?.message ?? "Something went wrong!", {
        variant: "error",
      });
    }

    return next(action);
  };
