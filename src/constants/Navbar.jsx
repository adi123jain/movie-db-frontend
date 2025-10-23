import React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Container,
  Avatar,
  Button,
  Chip,
  Fab,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import SlideshowRoundedIcon from "@mui/icons-material/SlideshowRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import DashboardCustomizeRoundedIcon from "@mui/icons-material/DashboardCustomizeRounded";

import { Link, useNavigate } from "react-router-dom";

const settings = ["Logout"];

function Navbar({ children }) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const fullName = localStorage.getItem("userName") || "User";

  const getInitials = (name) => {
    if (!name) return "";
    const parts = name.trim().split(" ");
    return parts.length === 1
      ? parts[0][0].toUpperCase()
      : `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  };

  const initials = getInitials(fullName);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleUserMenuClick = (setting) => {
    if (setting === "Logout") {
      localStorage.clear();
      navigate("/login");
      window.location.reload();
    }
    handleCloseUserMenu();
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          background: "linear-gradient(135deg, #f8f9fa 0%, #e0e0e0 100%)",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              color: "#333",
              fontWeight: "bold",
            }}
          >
            <MovieFilterIcon
              fontSize="medium"
              sx={{
                display: { xs: "none", md: "flex" },
                mr: 1,
                color: "#5c6bc0",
              }}
            />
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                mr: 2,
                display: "flex",
                fontFamily: "Poppins, sans-serif",
                fontWeight: 700,
                letterSpacing: ".2rem",
                color: "#333",
                textDecoration: "none",
              }}
            >
              Movie DB
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorElNav}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
              >
                <MenuItem onClick={() => navigate("/")}>
                  <HomeRoundedIcon sx={{ mr: 1 }} /> Home
                </MenuItem>
                <MenuItem onClick={() => navigate("/createMovies")}>
                  <AddCircleRoundedIcon sx={{ mr: 1 }} /> Create
                </MenuItem>
                <MenuItem onClick={() => navigate("/viewMovies")}>
                  <SlideshowRoundedIcon sx={{ mr: 1 }} /> View
                </MenuItem>
              </Menu>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Tooltip title="Create Movie" arrow placement="top">
                <Button
                  color="inherit"
                  component={Link}
                  to="/createMovies"
                  sx={{
                    color: "#5c6bc0",
                    "&:hover": { color: "#3949ab", transform: "scale(1.05)" },
                    transition: "0.3s",
                  }}
                >
                  <AddCircleRoundedIcon fontSize="medium" />
                </Button>
              </Tooltip>

              <Tooltip title="View All Movies" arrow placement="top">
                <Button
                  color="inherit"
                  component={Link}
                  to="/viewMovies"
                  sx={{
                    color: "#26a69a",
                    "&:hover": { color: "#00897b", transform: "scale(1.05)" },
                    transition: "0.3s",
                  }}
                >
                  <SlideshowRoundedIcon fontSize="medium" />
                </Button>
              </Tooltip>
            </Box>

            <Chip
              label={fullName}
              avatar={
                <Avatar
                  sx={{ bgcolor: "#5c6bc0", color: "#fff", fontWeight: "bold" }}
                >
                  {initials}
                </Avatar>
              }
              onClick={handleOpenUserMenu}
              sx={{
                backgroundColor: "#ede7f6",
                color: "#333",
                fontWeight: "bold",
                border: "1px solid #b39ddb",
                cursor: "pointer",
                "&:hover": { boxShadow: "0 0 8px rgba(92,107,192,0.5)" },
              }}
            />

            <Menu
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={() => handleUserMenuClick("Logout")}>
                <LogoutRoundedIcon sx={{ mr: 1, color: "#d32f2f" }} /> Logout
              </MenuItem>
            </Menu>
          </Toolbar>
        </Container>
      </AppBar>

      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}

        <Tooltip title="Dashboard" arrow placement="top">
          <Fab
            color="primary"
            aria-label="dashboard"
            onClick={() => navigate("/")}
            sx={{
              position: "fixed",
              bottom: 60,
              right: 20,
              background: "linear-gradient(135deg, #3949ab 0%, #5c6bc0 100%)",
              boxShadow: "0 6px 15px rgba(0,0,0,0.2)",
              "&:hover": { transform: "scale(1.1)" },
              transition: "0.3s",
              animation: "float 2s infinite ease-in-out",
              "@keyframes float": {
                "0%, 100%": { transform: "translateY(0)" },
                "50%": { transform: "translateY(-8px)" },
              },
            }}
          >
            <DashboardCustomizeRoundedIcon />
          </Fab>
        </Tooltip>

        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            width: "100%",
            padding: "15px",
            textAlign: "center",
            fontFamily: "Poppins, sans-serif",
            background: "linear-gradient(135deg, #f8f9fa 0%, #e0e0e0 100%)",
            boxShadow: "0 -2px 10px rgba(0,0,0,0.1)",
            color: "#555",
            fontSize: "0.9rem",
            fontWeight: 500,
          }}
        >
          © 2025 Movie DB. All Rights Reserved.
        </Box>
      </Box>
    </>
  );
}

export default Navbar;
