import { Stack, Typography } from "@mui/material";

import { theme } from "@config/styles";
import { FontWeights } from "@config/styles/FontWeights";

import IconBox from "./IconBox";

interface Props {
  icon: React.ReactNode;
  title: string;
  text: string;
  isLongText?: boolean;
}

function AdvantagesCard({ icon, title, text, isLongText }: Props) {
  return (
    <Stack
      flex={1}
      justifyContent="flex-start"
      alignItems="center"
      sx={{ p: { xs: 3, md: 4 }, maxWidth: { xs: "100%", md: "446px" } }}
    >
      <IconBox icon={icon} />

      <Typography
        variant="h4"
        sx={{
          mb: { xs: 1, md: 2 },
          fontSize: "1.5rem",
          lineHeight: "1.875rem",
          [theme.breakpoints.down("md")]: {
            fontSize: "1.5rem",
            lineHeight: "2.25rem",
          },
          letterSpacing: "0.15px",
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="h6"
        sx={{
          color: (theme) => theme.palette.text.secondary,
          fontWeight: FontWeights.regular,
          fontSize: { xs: "1.125rem", md: isLongText ? "1.125rem" : "1.25rem" },
          lineHeight: "1.875rem",
          letterSpacing: "0.15px",
        }}
      >
        {text}
      </Typography>
    </Stack>
  );
}

export default AdvantagesCard;
