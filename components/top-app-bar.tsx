import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { fireBaseAuth, firebaseOAuthProvider } from "@/app/firebase/firebase";
import { useFirebase } from "@/app/firebase/firebase-hook";
import { signInWithRedirect, signOut } from "firebase/auth";
import Loading from "./loading";
import { useEffect } from "react";

export default function TopAppBar() {
  const firebaseInitialized = useFirebase();
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  useEffect(() => {
    setIsAuthenticated(!!fireBaseAuth?.currentUser ?? false);
  }, [firebaseInitialized]);

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

  const appBar = () => {
    return (
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {process.env.NEXT_PUBLIC_SITE_TITLE}
          </Typography>
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
        </Toolbar>
      </AppBar>
    );
  };

  return <>{appBar()}</>;
}
