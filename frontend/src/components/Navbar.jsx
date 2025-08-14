import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";

// React Icons
import { FiHome, FiLogIn } from "react-icons/fi";
import { RiDashboardLine } from "react-icons/ri";
import { BsFiles, BsPersonLinesFill } from "react-icons/bs";

// Logo
import logo from "../assets/logo.png";

// NavLink component with active state
const NavLink = ({ to, icon, children, onClick }) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <Button
            color="inherit"
            component={Link}
            to={to}
            onClick={onClick}
            startIcon={icon}
            sx={{
                fontFamily: "'Inter', sans-serif",
                textTransform: "none",
                fontWeight: isActive ? 600 : 500,
                fontSize: "0.95rem",
                color: isActive ? "#1E40AF" : "#4B5563",
                mx: 0.5,
                px: 2,
                py: 1,
                borderRadius: "12px",
                transition: "all 0.3s ease",
                backgroundColor: isActive ? "rgba(59, 130, 246, 0.15)" : "transparent",
                "&:hover": {
                    backgroundColor: "rgba(59, 130, 246, 0.1)",
                    transform: "translateY(-2px)",
                    color: "#1E40AF",
                    boxShadow: "0 4px 8px rgba(59, 130, 246, 0.2)",
                },
            }}
        >
            {children}
        </Button>
    );
};

export default function Navbar({ onLoginClick }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar
            position="sticky"
            sx={{
                background: "rgba(255, 255, 255, 0.98)",
                backdropFilter: "blur(12px)",
                border: "none",
                borderRadius: { xs: 0, md: "0 0 24px 24px" },
                marginX: { xs: 0, md: 3 },
                marginTop: { xs: 0, md: 3 },
                maxWidth: { md: "calc(100% - 48px)" },
                boxShadow: `
          0 4px 6px -1px rgba(0, 0, 0, 0.05),
          0 10px 15px -3px rgba(0, 0, 0, 0.05),
          0 20px 25px -5px rgba(0, 0, 0, 0.04),
          0 0 0 1px rgba(0, 0, 0, 0.02)
        `,
                "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "8px",
                    background: "linear-gradient(180deg, rgba(0,0,0,0.03) 0%, transparent 100%)",
                    borderRadius: "0 0 24px 24px",
                    zIndex: -1,
                }
            }}
        >
            <Toolbar
                sx={{
                    maxWidth: { xs: "100%", lg: "1400px" },
                    margin: "auto",
                    width: "100%",
                    px: { xs: 2, md: 4 },
                    py: 1.5,
                }}
            >
                {/* Mobile Menu Button */}
                <Box sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={handleMenuOpen}
                        sx={{
                            color: "#4B5563",
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="mobile-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleMenuClose}
                        MenuListProps={{
                            "aria-labelledby": "mobile-menu-button",
                        }}
                        PaperProps={{
                            sx: {
                                borderRadius: "12px",
                                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                                minWidth: "200px",
                                py: 0,
                                mt: 1,
                            }
                        }}
                    >
                        <MenuItem
                            component={Link}
                            to="/"
                            onClick={handleMenuClose}
                            sx={{
                                py: 1.5,
                                borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
                            }}
                        >
                            <FiHome size={18} style={{ marginRight: "12px" }} />
                            Home
                        </MenuItem>
                        <MenuItem
                            component={Link}
                            to="/dashboard"
                            onClick={handleMenuClose}
                            sx={{
                                py: 1.5,
                                borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
                            }}
                        >
                            <RiDashboardLine size={18} style={{ marginRight: "12px" }} />
                            Dashboard
                        </MenuItem>
                    </Menu>
                </Box>

                {/* Logo with animation */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="logo"
                        component={Link}
                        to="/"
                        sx={{
                            mr: 2,
                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
                            "&:hover": {
                                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.12)",
                            }
                        }}
                    >
                        <img
                            src={logo}
                            alt="Logo"
                            style={{
                                height: "46px",
                                width: "46px",
                                borderRadius: "14px",
                                objectFit: "cover",
                            }}
                        />
                    </IconButton>
                </motion.div>

                {/* Title */}
                <Typography
                    variant="h6"
                    component="div"
                    sx={{
                        flexGrow: 1,
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 700,
                        letterSpacing: "0.5px",
                        background: "linear-gradient(90deg, #3B82F6 0%, #10B981 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        textFillColor: "transparent",
                        fontSize: { xs: "1.1rem", sm: "1.3rem" },
                        textShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
                    }}
                >
                    INFOLOCK
                </Typography>

                {/* Nav Links - Hidden on small screens */}
                <Box sx={{ display: { xs: "none", md: "flex" } }}>
                    <NavLink to="/" icon={<FiHome size={18} />}>
                        Home
                    </NavLink>
                    <NavLink to="/dashboard" icon={<RiDashboardLine size={18} />}>
                        Dashboard
                    </NavLink>
                </Box>

                {/* Login Button */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                    <Button
                        variant="contained"
                        onClick={onLoginClick}
                        startIcon={<FiLogIn size={18} />}
                        sx={{
                            background: "linear-gradient(135deg, #3B82F6 0%, #6366F1 100%)",
                            color: "#FFFFFF",
                            fontFamily: "'Inter', sans-serif",
                            textTransform: "none",
                            fontWeight: 600,
                            borderRadius: "12px",
                            px: 2.5,
                            py: 1.2,
                            ml: 2,
                            boxShadow: `
                0 4px 6px -1px rgba(59, 130, 246, 0.2),
                0 2px 4px -1px rgba(59, 130, 246, 0.12),
                inset 0 1px 0 rgba(255, 255, 255, 0.1)
              `,
                            transition: "all 0.3s ease",
                            "&:hover": {
                                background: "linear-gradient(135deg, #2563EB 0%, #4F46E5 100%)",
                                boxShadow: `
                  0 10px 15px -3px rgba(59, 130, 246, 0.3),
                  0 4px 6px -2px rgba(59, 130, 246, 0.15),
                  inset 0 1px 0 rgba(255, 255, 255, 0.2)
                `,
                                transform: "translateY(-1px)",
                            },
                        }}
                    >
                        Login
                    </Button>
                </motion.div>
            </Toolbar>
        </AppBar>
    );
}