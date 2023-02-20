import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AddBoxIcon from "@mui/icons-material/AddBox";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const Header = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const [authToken, setAuthToken] = useState("");

  useState(() => {
    setAuthToken(localStorage.getItem("authToken"));
  });

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    const confirmed = window.confirm("Are you sure you want to log out");
    if (confirmed) {
      navigate("/login");
      window.location.reload();
    }
  };

  const handleAddNew = () => {
    navigate("/spots/new");
  };

  return (
    <AppBar position="static" color="transparent">
      <Toolbar>
        <Box sx={{ display: "flex", flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Typography
              variant="h6"
              style={{
                fontWeight: "bold",
                color: "#3aa648",
                fontSize: 30,
              }}
            >
              SniffSpot
            </Typography>
          </Link>
        </Box>

        {matches ? (
          <Box>
            {!authToken && (
              <IconButton
                onClick={() => {
                  navigate("/login");
                }}
                size="large"
              >
                <LoginIcon />
              </IconButton>
            )}
            {authToken && (
              <IconButton onClick={handleLogout} size="large">
                <ExitToAppIcon />
              </IconButton>
            )}
          </Box>
        ) : (
          <Box>
            {authToken && (
              <IconButton onClick={handleAddNew} size="large">
                <Typography variant="button" sx={{ mr: 1 }}>
                  Add Spot
                </Typography>
                <AddBoxIcon />
              </IconButton>
            )}
            {authToken && (
              <IconButton onClick={handleLogout} size="large">
                <LogoutIcon />
              </IconButton>
            )}
            {!authToken && (
              <IconButton
                onClick={() => {
                  navigate("/login");
                }}
                size="large"
              >
                <LoginIcon />
              </IconButton>
            )}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
