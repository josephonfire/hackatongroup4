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
          background: '#151623 !important', // igual ao das boxes
          color: '#e0e0e0',
          borderRight: 'none',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          height: '100vh',
          overflow: 'hidden',
          transform: open ? 'translateX(0)' : 'translateX(0)',
          boxShadow: open ? '2px 0 8px rgba(0,0,0,0.3)' : '1px 0 4px rgba(0,0,0,0.2)',
        },
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        height: 60, 
        px: 2, 
        py: 0, 
        mt: 0,
        transition: 'all 0.3s ease-in-out'
      }}>
        <IconButton 
          onClick={() => setOpen(!open)} 
          sx={{ 
            color: "#b0b3b8", 
            p: 1, 
            mr: open ? 1 : 0,
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              color: '#69bec4',
              transform: 'scale(1.1)',
            }
          }}
        >
          <MenuIcon fontSize="medium" />
        </IconButton>
        <Box sx={{
          overflow: 'hidden',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          opacity: open ? 1 : 0,
          transform: open ? 'translateX(0)' : 'translateX(-20px)',
          width: open ? 'auto' : 0,
        }}>
          <span style={{ 
            fontWeight: 700, 
            fontSize: 20, 
            marginLeft: 4, 
            lineHeight: 1, 
            color: '#e0e0e0', 
            letterSpacing: 1,
            whiteSpace: 'nowrap'
          }}>
            AdCharts
          </span>
        </Box>
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
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&.Mui-selected': {
                background: '#23263a !important',
                color: '#fff',
                boxShadow: '0 2px 12px 0 #0002',
                transform: 'translateX(4px)',
              },
              '&:hover': {
                background: '#2e323c',
                color: '#fff',
                boxShadow: '0 2px 8px 0 #0001',
                transform: 'translateX(2px)',
              },
            }}
          >
            <ListItemIcon sx={{ 
              color: 'inherit', 
              minWidth: 36,
              transition: 'all 0.3s ease-in-out'
            }}>
              {item.icon}
            </ListItemIcon>
            <Box sx={{
              overflow: 'hidden',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              opacity: open ? 1 : 0,
              transform: open ? 'translateX(0)' : 'translateX(-10px)',
              width: open ? 'auto' : 0,
            }}>
              {open && <ListItemText primary={item.text} sx={{ fontWeight: 500, letterSpacing: 0.5 }} />}
            </Box>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
} 