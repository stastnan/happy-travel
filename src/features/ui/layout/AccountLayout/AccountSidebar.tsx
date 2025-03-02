import { NavLink } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  Avatar,
  Box,
  ButtonBase,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Stack,
  Typography,
} from "@mui/material";

import { AppRoutes } from "@config/routes";
import { Colors, theme } from "@config/styles";
import { selectUser } from "@features/auth/store/authSlice";
import AppButton from "@features/ui/AppButton";
import Logo from "@features/ui/logo/Logo";
import { useBreakpoints } from "@hooks/useBreakpoints";
import { logout } from "@services/api";
import { useAppSelector } from "@store/index";

import { ACCOUNT_LINKS } from "./data";

interface Props {
  isMinimized?: boolean;
  onClose: () => void;
}

export default function AccountSidebar({ isMinimized, onClose }: Props) {
  const user = useAppSelector(selectUser);
  const firstName = user?.displayName?.split(" ")[0];
  const userInitial = user?.displayName?.[0];
  const { md } = useBreakpoints();

  const onLinkClick = () => {
    if (!md) {
      onClose();
    }
  };

  const onLogout = () => {
    logout();
  };

  return (
    <Stack justifyContent="space-between" sx={{ px: 2, py: 3, height: "100%" }}>
      <Box>
        <Box mb={6}>
          <Logo
            isMinimized={isMinimized}
            sx={{ alignItems: "center", justifyContent: "center" }}
          />
        </Box>
        <Stack
          direction="row"
          alignItems="center"
          gap={3}
          mb={4}
          justifyContent={isMinimized ? "center" : "flex-start"}
        >
          <Avatar sx={{ height: 48, width: 48, background: Colors.disabled }}>
            {userInitial}
          </Avatar>
          {!isMinimized && <Typography variant="body1">{firstName}</Typography>}
        </Stack>
        <List>
          {ACCOUNT_LINKS.map(({ Icon, text, path }) => (
            <ListItem key={text} disablePadding>
              <NavLink
                to={path}
                style={{ width: "100%", textDecoration: "none" }}
                onClick={onLinkClick}
              >
                {({ isActive }) => (
                  <ListItemButton
                    sx={{
                      background: isActive
                        ? Colors.secondaryGreen
                        : "transparent",
                      borderRadius: 2,
                      mb: 1,
                      px: isMinimized ? 1 : 2,
                      justifyContent: isMinimized ? "center" : "flex-start",
                      color: isActive
                        ? theme.palette.primary.main
                        : theme.palette.text.secondary,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: isMinimized ? "inherit" : 56,
                        color: isActive
                          ? theme.palette.primary.main
                          : theme.palette.text.secondary,
                      }}
                    >
                      {<Icon fontSize="large" />}
                    </ListItemIcon>
                    {!isMinimized && (
                      <Typography variant={isActive ? "body2" : "body1"}>
                        {text}
                      </Typography>
                    )}
                  </ListItemButton>
                )}
              </NavLink>
            </ListItem>
          ))}
        </List>
        <AppButton
          fullWidth
          sx={{ mt: 2 }}
          LinkComponent={Link}
          href={AppRoutes.addTrip}
          onClick={onLinkClick}
        >
          <Stack
            component="span"
            direction="row"
            justifyContent="center"
            alignItems="center"
            gap={1}
          >
            {isMinimized ? "" : "Go Travel"}
            <AddIcon />
          </Stack>
        </AppButton>
      </Box>
      <ButtonBase
        onClick={onLogout}
        sx={{ px: 2, py: 1, borderRadius: 2, width: "fit-content", height: 51 }}
      >
        <LogoutIcon sx={{ color: "text.secondary", mr: isMinimized ? 0 : 4 }} />
        {!isMinimized && (
          <Typography component="span" variant="body1">
            Logout
          </Typography>
        )}
      </ButtonBase>
    </Stack>
  );
}
