import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { fireBaseAuth, firebaseOAuthProvider } from "@/app/firebase/firebase";
import { useFirebase } from "@/app/firebase/firebase-hook";
import { Button } from "@mui/material";
import { signInWithRedirect, signOut } from "firebase/auth";
import Loading from "./loading";
import { useEffect, useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PuzzleIcon from '@mui/icons-material/Extension';
import Link from "next/link";
import { LocalStorageService } from "@/services/local-storage.service";

const openedMixin = (theme: Theme): CSSObject => ({
  width: process.env.NEXT_PUBLIC_SITE_DRAWER_WIDTH,
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
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: process.env.NEXT_PUBLIC_SITE_DRAWER_WIDTH,
    width: `calc(100% - ${process.env.NEXT_PUBLIC_SITE_DRAWER_WIDTH})`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: process.env.NEXT_PUBLIC_SITE_DRAWER_WIDTH,
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

const navigationItems = [
  {
    name: "Dashboard",
    icon: <DashboardIcon />,
    path: "/",
  },
  {
    name: "Chat Modules",
    icon: <PuzzleIcon />,
    path: "/chat-modules",
  },
];

interface SideDrawerProps {
  Component: any;
  pageProps: any;
}

export default function SideDrawer(props: SideDrawerProps) {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(LocalStorageService.getDrawerExpansionState());
  const firebaseInitialized = useFirebase();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedNavItemPath, setSelectedNavItemPath] = useState(document.location.pathname);

  useEffect(() => {
    setIsAuthenticated(!!fireBaseAuth?.currentUser ?? false);
  }, [firebaseInitialized]);

  const handleDrawerOpen = () => {
    setIsExpanded(true);
    LocalStorageService.setDrawerExpansionState(true);
  };

  const handleDrawerClose = () => {
    setIsExpanded(false);
    LocalStorageService.setDrawerExpansionState(false);
  };

  const handleLogin = async () => {
    try {
      const response = await signInWithRedirect(
        fireBaseAuth,
        firebaseOAuthProvider
      );
      setIsAuthenticated(!!fireBaseAuth.currentUser);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await signOut(fireBaseAuth);
      setIsAuthenticated(!!fireBaseAuth.currentUser);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={isExpanded}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(isExpanded && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              {process.env.NEXT_PUBLIC_SITE_TITLE}
            </Typography>
          </div>
          <div>
            {!firebaseInitialized && (
              <Loading flexPosition="right" height="50px" color="inherit" />
            )}
            {firebaseInitialized && (
              <Button
                color="inherit"
                onClick={isAuthenticated ? handleLogout : handleLogin}
              >
                {isAuthenticated ? "Logout" : "Login"}
              </Button>
            )}
          </div>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={isExpanded}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
        {navigationItems.map((item) => (
            <Link key={item.name} href={item.path} style={{
                color: "inherit",
                textDecoration: "none"
            }}
            onClick={() => setSelectedNavItemPath(item.path)}>
            <ListItem key={item.name} disablePadding>
              <ListItemButton sx={{
                  minHeight: 48,
                  justifyContent: isExpanded ? "initial" : "center",
                  px: 2.5,
                  backgroundColor: selectedNavItemPath === item.path ? (theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.05)" : "rgba(255, 255, 255, 0.05)") : "inherit",
                }}>
                <ListItemIcon sx={{
                    minWidth: 0,
                    mr: isExpanded ? 3 : "auto",
                    justifyContent: "center",
                  }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.name} sx={{ 
                    opacity: isExpanded ? 1 : 0
                }} />
              </ListItemButton>
            </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ width: "100%" }}>
        <DrawerHeader />
        <Box
          component="main"
          sx={{
            display: "flex",
            flexDirection: "column"
          }}
        >
          <props.Component {...props.pageProps} />
        </Box>
      </Box>
    </Box>
  );
}
