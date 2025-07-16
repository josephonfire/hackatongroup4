import React from 'react';
import { Drawer, List, ListItem, ListItemText, Toolbar, Typography, Button } from '@mui/material';

const drawerWidth = 240;

export default function CampaignSidebar({ campaigns, selected, onSelect, onBgToggle, sidebarBg, sidebarText, setView, view }) {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          background: sidebarBg || '#222e3c',
          color: sidebarText || '#fff',
          transition: 'background 0.3s, color 0.3s',
        },
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Campaigns
        </Typography>
      </Toolbar>
      <Button
        variant="contained"
        onClick={onBgToggle}
        sx={{
          background: sidebarText === '#fff' ? '#fff' : '#222e3c',
          color: sidebarText === '#fff' ? '#222e3c' : '#fff',
          mb: 2,
          transition: 'background 0.3s, color 0.3s',
        }}
      >
        Toggle Page Color
      </Button>
      <List>
        {campaigns.map((name) => (
          <ListItem
            button
            key={name}
            selected={selected === name}
            onClick={() => onSelect(name)}
          >
            <ListItemText primary={name} />
          </ListItem>
        ))}
        <ListItem button onClick={() => setView('dashboard')} selected={view === 'dashboard'}>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button onClick={() => setView('pdf')} selected={view === 'pdf'}>
          <ListItemText primary="Export PDF" />
        </ListItem>
        <ListItem button onClick={() => setView('future')} selected={view === 'future'}>
          <ListItemText primary="Future Graphs" />
        </ListItem>
        <ListItem button onClick={() => setView('piecharts')} selected={view === 'piecharts'}>
          <ListItemText primary="PieCharts" />
        </ListItem>
      </List>
    </Drawer>
  );
}
