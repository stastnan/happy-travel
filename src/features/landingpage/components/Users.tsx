import { Stack, Typography } from "@mui/material";
import { Box, SxProps, Theme } from "@mui/material";

import { Colors } from "@config/styles";
import { useBreakpoints } from "@hooks/useBreakpoints";

import Avatar1 from "../assets/Avatar1.png";
import Avatar2 from "../assets/Avatar2.png";
import Avatar3 from "../assets/Avatar3.png";
import Avatar4 from "../assets/Avatar4.png";

interface AvatarProps {
  src: string;
  sx?: SxProps<Theme>;
  alt: string;
}

function Avatar({ src, sx, alt }: AvatarProps) {
  return (
    <Box
      component="img"
      src={src}
      alt={alt}
      sx={{
        maxWidth: { xs: "52px", md: "45px", lg: "55px" },
        height: { xs: "50px", md: "45px", lg: "55px" },
        borderRadius: "50%",
        border: `1px solid ${Colors.white}`,
        position: "absolute",
        ...sx,
      }}
    ></Box>
  );
}

export default function Users() {
  const { md } = useBreakpoints();
  return (
    <Stack
      direction="row"
      sx={{
        mt: { xs: 5, md: 0, xl: 5 },
        py: { xs: 2, md: 0.5, lg: 2, xl: 3 },
        px: "auto",
        justifyContent: { xs: "flex-start", md: "flex-start" },
        alignItems: { xs: "flex-start", md: "center" },
        borderTop: `1px solid ${Colors.lightGrey}`,
        borderBottom: `1px solid ${Colors.lightGrey}`,
        gap: { xs: 10, md: 2 },
        maxWidth: { xs: "100%", md: "auto" },
        maxHeight: { xs: "106px", md: "auto" },
      }}
    >
      <Stack
        sx={{
          flexDirection: { xs: "column", md: "row" },
          justifyContent: { xs: "space-between", md: "flex-start" },
          alignItems: { xs: "space-between", md: "" },
          maxWidth: { xs: "100%", md: "auto" },
          gap: { xs: 0, md: 2 },
          width: "100%",
        }}
      >
        <Stack
          sx={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: { xs: "center", md: "center" },
            gap: { xs: 0, md: 7 },
            width: { xs: "100%", md: "90%", lg: "80%" },
            maxHeight: { xs: "50px", md: "auto" },
          }}
        >
          <Typography variant="h2" sx={{ minWidth: { md: "179px" } }}>
            1200+ users
          </Typography>

          <Stack
            sx={{
              position: "relative",
              width: "10.5rem",
              justifyContent: "center",
              height: "3.44rem",
            }}
          >
            <Avatar
              src={Avatar1}
              alt="User's profile picture"
              sx={{ left: "0%" }}
            />
            <Avatar
              src={Avatar2}
              alt="User's profile picture"
              sx={{ left: "22%" }}
            />
            <Avatar
              src={Avatar3}
              alt="User's profile picture"
              sx={{ left: "44%" }}
            />
            <Avatar
              src={Avatar4}
              alt="User's profile picture"
              sx={{ left: "66%" }}
            />
          </Stack>
        </Stack>
        {!md && (
          <Typography
            variant="subtitle1"
            sx={{ color: (theme) => theme.palette.text.secondary }}
          >
            Track their trips in our App.
          </Typography>
        )}
      </Stack>
      {md && (
        <Typography
          variant="subtitle1"
          sx={{
            color: (theme) => theme.palette.text.secondary,
            minWidth: "25%",
          }}
        >
          Track their trips in
          <br /> our App.
        </Typography>
      )}
    </Stack>
  );
}
