import { LoadingButton } from "@mui/lab";
import {
  type SxProps,
  type Theme,
  Typography,
  TypographyProps,
} from "@mui/material";

import { theme } from "@config/styles";

interface Props {
  type?: "button" | "submit" | "reset";
  variant?: "text" | "contained" | "outlined";
  fullWidth?: boolean;
  children: React.ReactNode;
  loading?: boolean;
  sx?: SxProps<Theme>;
  LinkComponent?: React.ElementType;
  href?: string;
  endIcon?: React.ReactNode;
  startIcon?: React.ReactNode;
  onClick?: () => void;
  typography?: TypographyProps["variant"];
  isLanding?: boolean;
  disabled?: boolean;
  isSmall?: boolean;
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
}

export default function AppButton({
  type = "button",
  variant = "contained",
  fullWidth,
  children,
  sx,
  loading,
  LinkComponent,
  href,
  endIcon,
  startIcon,
  typography,
  onClick,
  isLanding,
  disabled,
  isSmall,
  color,
}: Props) {
  return (
    <LoadingButton
      LinkComponent={LinkComponent}
      href={href}
      loading={loading}
      fullWidth={fullWidth}
      type={type}
      variant={variant}
      endIcon={endIcon}
      startIcon={startIcon}
      onClick={onClick}
      disabled={disabled}
      color={color}
      sx={{
        borderRadius: 2,
        height: {
          xs: variant === "text" || isSmall ? 42 : 48,
          md: variant === "text" || isSmall ? 48 : 56,
        },
        width: fullWidth ? "100%" : "fit-content",
        textTransform: "none",
        ...sx,
      }}
    >
      <Typography
        component="span"
        variant={typography || "body2"}
        sx={{
          ...(isLanding && {
            [theme.breakpoints.down("md")]: {
              fontSize: "1.125rem",
              lineHeight: "1.688rem",
            },
          }),
        }}
      >
        {children}
      </Typography>
    </LoadingButton>
  );
}
