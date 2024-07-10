import { Box, Typography } from "@mui/material";

import { FontWeights } from "@config/styles/FontWeights";
import { useBreakpoints } from "@hooks/useBreakpoints";

import PlanTripButton from "./PlanTripButton";

interface Props {
  part: string;
  title: string;
  text: string;
}

export default function FeaturesText({ part, title, text }: Props) {
  const { md } = useBreakpoints();
  return (
    <Box sx={{ maxWidth: { xs: "100%", md: "650px" } }}>
      <Typography variant="h6" color={(theme) => theme.palette.primary.main}>
        {part}
      </Typography>
      <Typography
        variant="h2"
        sx={{
          fontSize: { xs: "1.5rem", md: "2.187rem" },
          lineHeight: { xs: "2.25rem", md: "3.125rem" },
          mt: 1,
          mb: { xs: 2, md: 3 },
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="h6"
        component="p"
        sx={{
          fontWeight: FontWeights.regular,
          color: (theme) => theme.palette.text.secondary,
          mb: { xs: 2, md: 3 },
          letterSpacing: "0.15px",
        }}
      >
        {text}
      </Typography>
      <PlanTripButton fullWidth={!md} sx={{ minWidth: "16.25rem" }} />
    </Box>
  );
}
