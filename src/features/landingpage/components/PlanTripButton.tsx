import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { SxProps, Theme } from "@mui/material";

import { AppRoutes } from "@config/routes";
import AppButton from "@features/ui/AppButton";

interface Props {
  fullWidth?: boolean;
  sx?: SxProps<Theme>;
}

function PlanTripButton({ fullWidth, sx }: Props) {
  return (
    <AppButton
      isLanding
      onClick={() => {}}
      aria-label="play-your-trip"
      endIcon={<ArrowForwardIcon />}
      fullWidth={fullWidth}
      sx={{
        ...sx,
        height: { xs: "3.5rem", md: "56px", lg: "56px" },
      }}
      href={AppRoutes.signUp}
    >
      Plan your trip
    </AppButton>
  );
}

export default PlanTripButton;
