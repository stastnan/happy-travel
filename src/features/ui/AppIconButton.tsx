import { LoadingButton } from "@mui/lab";
import { type SxProps, type Theme } from "@mui/material";

interface Props {
  isSmall?: boolean;
  children: JSX.Element;
  sx?: SxProps<Theme>;
  onClick: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  "aria-label": string;
  disabled?: boolean;
  variant?: "outlined" | "contained";
  isLoading?: boolean;
}

export default function AppIconButton(props: Props) {
  return (
    <LoadingButton
      loading={props.isLoading}
      onClick={props.onClick}
      aria-label={props["aria-label"]}
      disabled={props.disabled}
      variant={props.variant ?? "outlined"}
      sx={{
        borderRadius: 2,
        minWidth: "auto",
        width: props.isSmall ? 34 : { xs: 48, md: 58 },
        height: props.isSmall ? 34 : { xs: 48, md: 58 },
        ...props.sx,
      }}
    >
      {props.children}
    </LoadingButton>
  );
}
