import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  type CSSObject,
  Drawer,
  IconButton,
  type Theme,
  Toolbar,
  styled,
} from "@mui/material";

import { AppRoutes } from "@config/routes";
import ErrorBoundary from "@config/routes/components/ErrorBoundary";
import { theme } from "@config/styles";
import AppIconButton from "@features/ui/AppIconButton";
import HideOnScroll from "@features/ui/HideOnSctoll";
import { useBreakpoints } from "@hooks/useBreakpoints";

import AccountSidebar from "./AccountSidebar";

const DESKTOP_DRAWER_WIDTH = 288;
const DESKTOP_MINIMIZED_DRAWER_WIDTH = 94;

const openedMixin = (theme: Theme): CSSObject => ({
  width: DESKTOP_DRAWER_WIDTH,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: DESKTOP_DRAWER_WIDTH,
  [theme.breakpoints.up("sm")]: {
    width: DESKTOP_MINIMIZED_DRAWER_WIDTH,
  },
});

const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: DESKTOP_DRAWER_WIDTH,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const TOOLBAR_STYLES = { mt: 2, mb: 1 };

export default function AccountLayout() {
  const location = useLocation();

  const isPrimaryNavBackgroundColor = location.pathname === AppRoutes.dashboard;

  const { md, xl } = useBreakpoints();

  const [isOpen, setIsOpen] = useState(xl);

  const handleDrawerToggle = () => {
    setIsOpen(!isOpen);
  };

  const closeDrawer = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Box
      sx={{
        display: "flex",
        bgcolor: "grey.100",
        minHeight: "100vh",
      }}
    >
      {/* Desktop drawer */}
      {md && (
        <>
          <StyledDrawer variant="permanent" open={isOpen}>
            <AccountSidebar isMinimized={!isOpen} onClose={closeDrawer} />
          </StyledDrawer>
          <AppIconButton
            isSmall
            onClick={handleDrawerToggle}
            aria-label="sidebar toggle button"
            sx={{
              background: "white",
              zIndex: theme.zIndex.drawer + 1,
              borderRadius: 1,
              position: "fixed",
              top: 27,
              left: `calc(${
                isOpen ? DESKTOP_DRAWER_WIDTH : DESKTOP_MINIMIZED_DRAWER_WIDTH
              }px - 17px)`,
              transition: theme.transitions.create("left", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
              ":hover": {
                background: "white",
              },
            }}
          >
            {isOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </AppIconButton>
        </>
      )}
      {/* Mobile drawer */}
      {!md && (
        <>
          <HideOnScroll>
            <AppBar
              position="fixed"
              sx={{
                boxShadow: "none",
                bgcolor: {
                  xs: isPrimaryNavBackgroundColor ? "primary.main" : "grey.100",
                  md: "grey.100",
                },
              }}
            >
              <Toolbar sx={TOOLBAR_STYLES}>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                >
                  <MenuIcon
                    sx={{
                      color: {
                        xs: isPrimaryNavBackgroundColor
                          ? "white"
                          : "primary.main",
                        md: "primary.main",
                      },
                      fontSize: 40,
                    }}
                  />
                </IconButton>
              </Toolbar>
            </AppBar>
          </HideOnScroll>
          <Drawer
            variant="temporary"
            open={isOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: DESKTOP_DRAWER_WIDTH,
              },
            }}
          >
            <AccountSidebar onClose={closeDrawer} />
          </Drawer>
        </>
      )}
      <Box
        component="main"
        sx={{
          width: "100%",
          px: {
            xs: 2,
            md: 7,
          },
          pt: {
            xs: 0,
            md: 4,
          },
          pb: 4,
          bgcolor: "grey.100",
        }}
      >
        <Toolbar sx={{ display: { md: "none" }, ...TOOLBAR_STYLES }} />
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </Box>
    </Box>
  );
}
