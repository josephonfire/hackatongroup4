import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Avatar,
  Button,
  Grid,
  Card,
  Divider,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";
import MusicNoteIcon from "@mui/icons-material/MusicNote"; // TikTok
import "../styles/Profile.css";
import { Logo } from "./Logotipo";

const SOCIALS = [
  { key: "instagram", name: "Instagram", icon: <InstagramIcon />, color: "#E1306C" },
  { key: "facebook", name: "Facebook", icon: <FacebookIcon />, color: "#1877F3" },
  { key: "tiktok", name: "TikTok", icon: <MusicNoteIcon />, color: "#25F4EE" },
  { key: "linkedin", name: "LinkedIn", icon: <LinkedInIcon />, color: "#0A66C2" },
  { key: "x", name: "X", icon: <XIcon />, color: "#FFF" },
];

export default function Profile({ connectedSocials = [], onChange }) {
  const [connected, setConnected] = useState(connectedSocials);
  const navigate = useNavigate();
  // Mock user info
  const user = {
    name: "Carolina",
    email: "carolina@email.com",
    avatar: "",
  };

  const handleToggle = (key) => {
    let updated;
    if (connected.includes(key)) {
      updated = connected.filter((s) => s !== key);
    } else {
      updated = [...connected, key];
    }
    setConnected(updated);
    if (onChange) onChange(updated);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    navigate('/');
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        background: "#151623",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: { xs: 2, md: 6 },
        px: { xs: 1, md: 0 },
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 1100,
          mb: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Logo
          txt_logo="#fff"
          img_logo="#69bec4"
          style={{ maxWidth: 120, maxHeight: 60 }}
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          maxWidth: 600,
          background: "linear-gradient(120deg, #69bec4 0%, #3a5c7c 100%)",
          borderRadius: 6,
          boxShadow: "0 4px 32px 0 #69bec422",
          p: { xs: 3, md: 5 },
          mb: 4,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          gap: 3,
        }}
      >
        <Avatar
          sx={{
            width: 90,
            height: 90,
            fontSize: 44,
            bgcolor: "#5edc1f",
            color: "#23263a",
            fontWeight: 900,
          }}
        >
          {user.name[0]}
        </Avatar>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "center", md: "flex-start" },
            gap: 1,
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: 900, color: "#23263a", letterSpacing: 1 }}
          >
            {user.name}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ color: "#23263a", opacity: 0.8, fontWeight: 500 }}
          >
            {user.email}
          </Typography>
        </Box>
        <Button
          onClick={handleLogout}
          sx={{
            ml: { md: "auto" },
            mt: { xs: 2, md: 0 },
            background: "linear-gradient(90deg, #d32f2f 0%, #b71c1c 100%)",
            color: "#fff",
            borderRadius: 3,
            fontWeight: 700,
            fontSize: 18,
            px: 4,
            py: 1.5,
            boxShadow: "0 2px 8px #d32f2f33",
            textTransform: "none",
            "&:hover": {
              background: "linear-gradient(90deg, #b71c1c 0%, #d32f2f 100%)",
              color: "#fff",
            },
          }}
        >
          Log out
        </Button>
      </Box>
      <Typography
        variant="h6"
        sx={{
          width: "100%",
          maxWidth: 1100,
          mb: 3,
          fontWeight: 800,
          color: "#fff",
          textAlign: "center",
          letterSpacing: 0.5,
        }}
      >
        Social Networks
      </Typography>
      <Grid
        container
        spacing={4}
        sx={{ width: "100%", maxWidth: 1100, mb: 4, justifyContent: "center" }}
      >
        {SOCIALS.map((social) => (
          <Grid item xs={12} sm={6} md={4} key={social.key}>
            <Card
              sx={{
                background: connected.includes(social.key)
                  ? `linear-gradient(120deg, ${social.color}33 0%, #181a20 100%)`
                  : "#181a20",
                color: "#fff",
                borderRadius: 4,
                boxShadow: connected.includes(social.key)
                  ? `0 4px 24px 0 ${social.color}44`
                  : "0 2px 8px #0006",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                p: 4,
                mb: 2,
                border: connected.includes(social.key)
                  ? `2px solid ${social.color}`
                  : "2px solid #23263a",
                transition: "all 0.2s",
                "&:hover": {
                  boxShadow: `0 8px 32px 0 ${social.color}66`,
                  transform: "translateY(-2px) scale(1.03)",
                },
              }}
            >
              <div style={{ marginBottom: 16 }}>{social.icon}</div>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 700, mb: 1, color: "#fff" }}
              >
                {social.name}
              </Typography>
              <Button
                onClick={() => handleToggle(social.key)}
                sx={{
                  mt: 2,
                  minWidth: 120,
                  fontWeight: 700,
                  borderRadius: 2,
                  border: `2px solid ${social.color}`,
                  background: connected.includes(social.key)
                    ? social.color
                    : "transparent",
                  color: connected.includes(social.key)
                    ? "#23263a"
                    : social.color,
                  boxShadow: "none",
                  textTransform: "none",
                  "&:hover": {
                    background: connected.includes(social.key)
                      ? "#b71c1c"
                      : `${social.color}22`,
                    color: "#fff",
                  },
                }}
              >
                {connected.includes(social.key) ? "Disconnect" : "Connect"}
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Typography
        variant="body2"
        sx={{
          color: "#69bec4",
          opacity: 0.7,
          textAlign: "center",
          mb: 2,
          background: "transparent",
          boxShadow: "none",
          p: 0,
        }}
      >
        © {new Date().getFullYear()} AdCharter. All Rights Reserved.
      </Typography>
    </Box>
  );
}
