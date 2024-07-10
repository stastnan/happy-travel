import { Stack } from "@mui/material";

import { AppRoutes } from "@config/routes";
import AppButton from "@features/ui/AppButton";
import Logo from "@features/ui/logo/Logo";
import { useBreakpoints } from "@hooks/useBreakpoints";

import { HEADER_HEIGHT_PX, MOBILE_HEADER_HEIGHT_PX } from "../constants";

function Header() {
  const { md } = useBreakpoints();
  return (
    <Stack
      sx={{
        width: "100%",
        height: {
          xs: `${MOBILE_HEADER_HEIGHT_PX}px`,
          md: `${HEADER_HEIGHT_PX}px`,
        },
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        px: { xs: 2, md: 8, lg: 12.5 },
        py: { xs: 1, md: 0 },
        mb: { xs: 1, md: 0 },
      }}
    >
      <Logo
        isSmallIcon={!md}
        isLanding
        sx={{
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      />
      <Stack
        sx={{
          flexDirection: "row",
          justifyContent: { xs: "flex-end", md: "space-between" },
          alignItems: "center",
          width: "12.125rem",

          gap: 2.5,
        }}
      >
        <AppButton
          variant="outlined"
          href={AppRoutes.login}
          typography="subtitle2"
          sx={{
            height: "3rem",
            minWidth: "5rem",
            textAlign: "center",
            py: 2,
            px: 1,
          }}
        >
          Log in
        </AppButton>
        {md && (
          <AppButton
            href={AppRoutes.signUp}
            typography="subtitle2"
            sx={{
              height: "3rem",
              minWidth: "5.88rem",
              textAlign: "center",
              py: { xs: 2, md: 1, lg: 2 },
              px: 1,
            }}
          >
            Sign up
          </AppButton>
        )}
      </Stack>
    </Stack>
  );
}

export default Header;
