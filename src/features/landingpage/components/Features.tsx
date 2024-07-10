import { Box, Stack, Typography } from "@mui/material";

import { APP_NAME } from "@config/constants";
import { Colors } from "@config/styles";
import { FontFamilies } from "@config/styles/FontFamilies";
import { FontWeights } from "@config/styles/FontWeights";
import { useBreakpoints } from "@hooks/useBreakpoints";

import DesktopDashboard from "../assets/DesktopDashboard.jpg";
import DesktopExpenses from "../assets/DesktopExpenses.jpg";
import MobileDashboard from "../assets/MobileDashboard.jpg";
import MobileExpenses from "../assets/MobileExpenses.jpg";
import FeaturesText from "./FeaturesText";

const imgStyles = {
  borderRadius: 2.5,
  height: "100%",
  overflow: "hidden",
  maxWidth: "810px",
  objectFit: "contain",
  mr: 5,
  WebkitBoxShadow: `-11px 11px 25px 0px ${Colors.lightGrey}`,
  MozBoxShadow: `-11px 11px 25px 0px ${Colors.lightGrey}`,
  boxShadow: `-11px 11px 25px 0px ${Colors.lightGrey}`,
};

interface Props {
  contentRef: React.RefObject<HTMLDivElement> | null | undefined;
}

export default function Features({ contentRef }: Props) {
  const { sm } = useBreakpoints();
  return (
    <Stack
      sx={{
        mt: { xs: 8.5, md: 9.5 },
        pb: { xs: 6, md: 20.125 },
      }}
      ref={contentRef}
      alignItems="center"
    >
      <Typography
        variant="h6"
        color={(theme) => theme.palette.primary.main}
        sx={{ lineHeight: "2.187rem" }}
      >
        FEATURES
      </Typography>
      <Typography
        sx={{
          fontFamily: FontFamilies.poppins,
          fontWeight: FontWeights.semibold,
          fontSize: { xs: "1.625rem", md: "2.5rem" },
          lineHeight: { xs: "2.25rem", md: "4.375rem" },
          textAlign: "center",
        }}
      >
        {APP_NAME} best solution for travel
      </Typography>

      <Stack
        flex={1}
        sx={{
          flexDirection: { xs: "column", md: "row" },
          justifyContent: { md: "space-between" },
          alignItems: { xs: "center", md: "center" },
          pb: { xs: 4, md: 9 },
          width: "100%",
          borderBottom: `1px solid ${Colors.lightGrey}`,
          mt: { xs: 4, md: 8 },
        }}
      >
        <Box
          component="img"
          src={sm ? DesktopDashboard : MobileDashboard}
          alt="App's trip planning screen"
          sx={{
            ...imgStyles,
            mb: { xs: 3, md: 0 },
            mr: { xs: 0, md: 3 },
            width: "100%",
            minWidth: { xs: "100%", md: "40%" },
            maxWidth: { md: "50%" },
          }}
        />

        <FeaturesText
          part="DASHBOARD"
          title="Organize All Your Trips in a Single Application"
          text="With our intuitive application, you can effortlessly organize all
            your trips in one convenient location. From itinerary details and
            booking confirmations to travel notes and essential documents,
            everything you need for a smooth and stress-free journey is just a
            tap away. Enjoy a clutter-free travel experience and stay in control
            of your adventures with ease."
        />
      </Stack>

      <Stack
        flex={1}
        sx={{
          flexDirection: { xs: "column-reverse", md: "row" },
          justifyContent: { md: "space-between" },
          alignItems: { xs: "center", md: "center" },
          pb: { xs: 0, md: 9 },
          width: "100%",
          mt: { xs: 4, md: 8 },
        }}
      >
        <FeaturesText
          part="EXPENSES"
          title="Expense Tracking for Your Travels"
          text="Keep a Close Watch on Your Travel Costs with our User-Friendly Expense Tracking Solution. Set budget goals, receive real-time updates, and make informed decisions to ensure you get the most out of your travel experiences without any financial surprises. Travel with confidence, knowing that your expenses are well-managed and under control"
        />

        <Box
          component="img"
          src={sm ? DesktopExpenses : MobileExpenses}
          alt="App's expenses screen"
          sx={{
            ...imgStyles,
            mr: 0,
            ml: { xs: 0, md: 3 },
            width: "100%",
            mb: { xs: 3, md: 0 },
            minWidth: { xs: "100%", md: "40%" },
          }}
        />
      </Stack>
    </Stack>
  );
}
