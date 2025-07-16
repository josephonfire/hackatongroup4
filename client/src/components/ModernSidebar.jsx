import React from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Divider, Box } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import PieChartIcon from "@mui/icons-material/PieChart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TimelineIcon from "@mui/icons-material/Timeline";
import MenuIcon from "@mui/icons-material/Menu";

export default function ModernSidebar({ view, setView }) {
  const [open, setOpen] = React.useState(true);

  const menuItems = [
    { text: "Profile", icon: <AccountCircleIcon />, view: "profile" },
    { text: "Dashboard", icon: <DashboardIcon />, view: "dashboard" },
    { text: "Future Graphs", icon: <TimelineIcon />, view: "future" },
  ];

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        width: open ? 220 : 64,
        flexShrink: 0,
        height: '100vh',
        overflow: 'hidden',
        '& .MuiDrawer-paper': {
          width: open ? 220 : 64,
          boxSizing: 'border-box',
          background: '#23263a !important', // força a cor
          color: '#e0e0e0',
          borderRight: 'none',
          transition: 'width 0.2s',
          height: '100vh',
          overflow: 'hidden',
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', height: 60, px: 2, py: 0, mt: 0 }}>
        <IconButton onClick={() => setOpen(!open)} sx={{ color: "#b0b3b8", p: 1, mr: open ? 1 : 0 }}>
          <MenuIcon fontSize="medium" />
        </IconButton>
        {open && <span style={{ fontWeight: 700, fontSize: 20, marginLeft: 4, lineHeight: 1, color: '#e0e0e0', letterSpacing: 1 }}>AdCharts</span>}
      </Box>
      <Divider sx={{ background: "#292d36" }} />
      <List sx={{ mt: 2, overflow: 'hidden' }}>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            selected={view === item.view}
            onClick={() => setView(item.view)}
            sx={{
              borderRadius: 2.5,
              margin: '10px 12px',
              px: 2,
              py: 1.2,
              transition: 'background 0.18s, color 0.18s, box-shadow 0.18s',
              '&.Mui-selected': {
                background: '#23263a !important',
                color: '#fff',
                boxShadow: '0 2px 12px 0 #0002',
              },
              '&:hover': {
                background: '#2e323c',
                color: '#fff',
                boxShadow: '0 2px 8px 0 #0001',
              },
            }}
          >
            <ListItemIcon sx={{ color: 'inherit', minWidth: 36 }}>{item.icon}</ListItemIcon>
            {open && <ListItemText primary={item.text} sx={{ fontWeight: 500, letterSpacing: 0.5 }} />}
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
} 