import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { Stack, Typography } from "@mui/material";

import { FontFamilies } from "@config/styles/FontFamilies";
import { FontWeights } from "@config/styles/FontWeights";

import AdvantagesCard from "./AdvantagesCard";

function Advantages() {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{ pb: { xs: 4.125, md: 18 } }}
    >
      <Typography variant="h6" color={(theme) => theme.palette.primary.main}>
        ADVANTAGES
      </Typography>
      <Typography
        sx={{
          fontFamily: FontFamilies.poppins,
          fontWeight: FontWeights.semibold,
          fontSize: { xs: "1.625rem", md: "2.5rem" },
          lineHeight: { xs: "4.375rem", md: "4.375rem" },
          textAlign: "center",
          mb: { xs: 1, md: 0 },
        }}
      >
        Why choose us?
      </Typography>
      <Stack
        sx={{
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 3, lg: 4, xl: 10 },
          justifyContent: "space-between",
        }}
        textAlign="center"
      >
        <AdvantagesCard
          icon={<CameraAltOutlinedIcon />}
          title="Keep memories from the trip"
          text="Keeping your travel photos within your trip-planning app is incredibly practical."
        />
        <AdvantagesCard
          icon={<LocationOnOutlinedIcon />}
          title="Add places you want to visit"
          text="Our user-friendly tools help you plan and organize your packing with ease."
        />
        <AdvantagesCard
          isLongText
          icon={<FolderOpenOutlinedIcon />}
          title="Centralize all your documents"
          text="Simplify Your Life by Bringing Together All Your Essential Documents and Files in a Single, Easily Accessible Location."
        />
      </Stack>
    </Stack>
  );
}

export default Advantages;
