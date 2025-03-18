import dayjs from "dayjs";
import { type Control, Controller } from "react-hook-form";

import type { SxProps, Theme } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, unknown>;
  name: string;
  label: string;
  fullWidth?: boolean;
  requiredErrorText?: string;
  minDate?: Date | null;
  maxDate?: Date | null;
  sx?: SxProps<Theme>;
}

export default function DateSelectInput({
  control,
  name,
  label,
  fullWidth,
  requiredErrorText,
  minDate,
  maxDate,
  sx,
}: Props) {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: requiredErrorText }}
      render={({ field: { ref, ...field }, fieldState }) => (
        <DatePicker
          label={label}
          slotProps={{
            textField: {
              inputRef: ref,
              variant: "standard",
              helperText: fieldState.error?.message,
              error: Boolean(fieldState.error),
            },
            inputAdornment: { position: "start" },
          }}
          {...field}
          onChange={(newValue) => {
            let value;
            try {
              value = dayjs(newValue).toISOString();
            } catch (_) {
              /* empty */
            }
            field.onChange(value ?? newValue);
          }}
          sx={{
            width: fullWidth ? "100%" : "auto",
            "& .MuiSvgIconRoot": { xs: 0.1, md: 0 },
            ...sx,
          }}
          value={field.value ? dayjs(field.value) : null}
          minDate={minDate ? dayjs(minDate) : null}
          maxDate={maxDate ? dayjs(maxDate) : null}
        />
      )}
    />
  );
}
