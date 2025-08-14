import React from "react";
import { Box, Container, Grid, Typography, Link, IconButton } from "@mui/material";
import { motion } from "framer-motion";

// React Icons
import { FiGithub, FiTwitter, FiLinkedin, FiMail } from "react-icons/fi";
import { FaDiscord } from "react-icons/fa";
import logo from "../assets/logo.png";
const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: "rgba(255, 255, 255, 0.98)",
                backdropFilter: "blur(12px)",
                borderTop: "1px solid rgba(0, 0, 0, 0.05)",
                boxShadow: "0 -4px 20px rgba(0, 0, 0, 0.05)",
                pt: 6,
                pb: 4,
                mt: 8,
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    {/* Company Info */}
                    <Grid item xs={12} md={4}>
                        <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                            <Box display="flex" alignItems="center" mb={2}>
                                <img
                                    src={logo}
                                    alt="Logo"
                                    style={{
                                        height: "40px",
                                        width: "40px",
                                        borderRadius: "10px",
                                        marginRight: "12px",
                                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                                    }}
                                />
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontFamily: "'Poppins', sans-serif",
                                        fontWeight: 700,
                                        background: "linear-gradient(90deg, #3B82F6 0%, #10B981 100%)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                    }}
                                >
                                    INFOLOCK
                                </Typography>
                            </Box>
                        </motion.div>
                        <Typography variant="body2" color="text.secondary" mb={2}>
                            Secure document storage and management solution for the modern world.
                        </Typography>
                        <Box display="flex" gap={2}>
                            {[
                                { icon: <FiGithub size={20} />, url: "https://github.com" },
                                { icon: <FiTwitter size={20} />, url: "https://twitter.com" },
                                { icon: <FiLinkedin size={20} />, url: "https://linkedin.com" },
                                { icon: <FaDiscord size={20} />, url: "https://discord.com" },
                                { icon: <FiMail size={20} />, url: "mailto:contact@infolock.com" },
                            ].map((social, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ y: -3, scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                >
                                    <IconButton
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        sx={{
                                            color: "#4B5563",
                                            backgroundColor: "rgba(0, 0, 0, 0.02)",
                                            "&:hover": {
                                                backgroundColor: "rgba(59, 130, 246, 0.1)",
                                                color: "#3B82F6",
                                            },
                                        }}
                                    >
                                        {social.icon}
                                    </IconButton>
                                </motion.div>
                            ))}
                        </Box>
                    </Grid>

                    {/* Quick Links */}
                    <Grid item xs={6} md={2}>
                        <Typography variant="subtitle1" fontWeight={600} mb={2}>
                            Quick Links
                        </Typography>
                        <Box display="flex" flexDirection="column" gap={1}>
                            {[
                                { label: "Home", path: "/" },
                                { label: "Features", path: "/features" },
                                { label: "Pricing", path: "/pricing" },
                                { label: "Documentation", path: "/docs" },
                            ].map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.path}
                                    color="text.secondary"
                                    variant="body2"
                                    sx={{
                                        transition: "all 0.2s ease",
                                        "&:hover": {
                                            color: "#3B82F6",
                                            transform: "translateX(2px)",
                                        },
                                    }}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </Box>
                    </Grid>

                    {/* Resources */}
                    <Grid item xs={6} md={2}>
                        <Typography variant="subtitle1" fontWeight={600} mb={2}>
                            Resources
                        </Typography>
                        <Box display="flex" flexDirection="column" gap={1}>
                            {[
                                { label: "Blog", path: "/blog" },
                                { label: "Tutorials", path: "/tutorials" },
                                { label: "Support", path: "/support" },
                                { label: "API Status", path: "/status" },
                            ].map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.path}
                                    color="text.secondary"
                                    variant="body2"
                                    sx={{
                                        transition: "all 0.2s ease",
                                        "&:hover": {
                                            color: "#3B82F6",
                                            transform: "translateX(2px)",
                                        },
                                    }}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </Box>
                    </Grid>

                    {/* Legal */}
                    <Grid item xs={12} md={4}>
                        <Typography variant="subtitle1" fontWeight={600} mb={2}>
                            Stay Updated
                        </Typography>
                        <Typography variant="body2" color="text.secondary" mb={2}>
                            Subscribe to our newsletter for the latest updates and features.
                        </Typography>
                        <Box component="form" display="flex" gap={1} mb={3}>
                            <input
                                type="email"
                                placeholder="Your email"
                                style={{
                                    flex: 1,
                                    padding: "10px 12px",
                                    borderRadius: "8px",
                                    border: "1px solid rgba(0, 0, 0, 0.1)",
                                    outline: "none",
                                    fontFamily: "'Inter', sans-serif",
                                }}
                            />
                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                style={{
                                    backgroundColor: "#3B82F6",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "8px",
                                    padding: "0 16px",
                                    cursor: "pointer",
                                    fontFamily: "'Inter', sans-serif",
                                    fontWeight: 500,
                                }}
                            >
                                Subscribe
                            </motion.button>
                        </Box>
                    </Grid>
                </Grid>

                {/* Copyright */}
                <Box
                    mt={6}
                    pt={3}
                    borderTop="1px solid rgba(0, 0, 0, 0.05)"
                    display="flex"
                    flexDirection={{ xs: "column", sm: "row" }}
                    justifyContent="space-between"
                    alignItems="center"
                    gap={1}
                >
                    <Typography variant="body2" color="text.secondary">
                        © {currentYear} INFOLOCK. All rights reserved.
                    </Typography>
                    <Box display="flex" gap={3}>
                        <Link
                            href="/privacy"
                            color="text.secondary"
                            variant="body2"
                            sx={{ "&:hover": { color: "#3B82F6" } }}
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            href="/terms"
                            color="text.secondary"
                            variant="body2"
                            sx={{ "&:hover": { color: "#3B82F6" } }}
                        >
                            Terms of Service
                        </Link>
                        <Link
                            href="/cookies"
                            color="text.secondary"
                            variant="body2"
                            sx={{ "&:hover": { color: "#3B82F6" } }}
                        >
                            Cookie Policy
                        </Link>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;