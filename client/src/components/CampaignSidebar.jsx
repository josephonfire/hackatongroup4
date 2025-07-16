import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, Toolbar, Typography, IconButton, Menu, MenuItem, Fab, Box, Button } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import AddIcon from '@mui/icons-material/Add';

const drawerWidth = 240;
const sidebarBg = '#23263a';

export default function CampaignSidebar({ campaigns, selected, onSelect, onBgToggle, sidebarBg, sidebarText, setView, view, whiteBg }) {
  const [anchorEl, setAnchorEl] = useState(null);

  // Botão evento para abrir o menu de campanhas
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  // Botão evento para fechar o menu de campanhas
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  // Botão evento para adicionar campanha
  const handleAddCampaign = () => {
    // lógica para adicionar campanha
    alert('Adicionar nova campanha!');
    setAnchorEl(null);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          background: sidebarBg,
          color: sidebarText || '#fff',
          transition: 'background 0.3s, color 0.3s',
        },
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          py: 2,
        }}
      >
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            fontWeight: 'bold',
            letterSpacing: 2,
            color: sidebarText || '#fff',
            textShadow: '0 2px 8px rgba(0,0,0,0.12)',
          }}
        >
          AdCharts
        </Typography>
        <IconButton
          onClick={onBgToggle}
          sx={{
            color: sidebarText === '#fff' ? '#fff' : '#222e3c',
            background: 'rgba(0,0,0,0.08)',
            ml: 1,
            '&:hover': {
              background: 'rgba(0,0,0,0.15)',
            },
          }}
          aria-label="toggle dark mode"
        >
          {whiteBg ? <Brightness4Icon /> : <Brightness7Icon />}
        </IconButton>
      </Toolbar>
      <List>
        {campaigns.map((name) => (
          <Box key={name} sx={{ width: '100%', mb: 1 }}>
            <Button
              fullWidth
            onClick={() => onSelect(name)}
              sx={{
                width: '85%',
                margin: '0 auto',
                borderRadius: 1.5,
                background: selected === name ? (sidebarBg ? '#2d3950' : '#1a2233') : (sidebarBg || '#222e3c'),
                color: '#fff',
                border: selected === name ? '2px solid #fff' : '1.5px solid #fff2',
                fontWeight: 500,
                fontSize: 15,
                letterSpacing: 0.5,
                justifyContent: 'flex-start',
                px: 1.5,
                py: 0.7,
                minHeight: 36,
                boxShadow: 'none',
                textTransform: 'none',
                '&:hover': {
                  background: sidebarBg ? '#2d3950' : '#1a2233',
                  borderColor: '#fff4',
                },
                display: 'flex',
                alignItems: 'center',
                transition: 'background 0.2s, border 0.2s',
              }}
            >
              <span style={{ flexGrow: 1, textAlign: 'left' }}>{name}</span>
            </Button>
          </Box>
        ))}
        <Box sx={{ width: '100%', mb: 1 }}>
          <Button
            fullWidth
            onClick={() => setView('dashboard')}
            sx={{
              width: '85%',
              margin: '0 auto',
              borderRadius: 1.5,
              background: view === 'dashboard' ? (sidebarBg ? '#2d3950' : '#1a2233') : (sidebarBg || '#222e3c'),
              color: '#fff',
              border: view === 'dashboard' ? '2px solid #fff' : '1.5px solid #fff2',
              fontWeight: 500,
              fontSize: 15,
              letterSpacing: 0.5,
              justifyContent: 'flex-start',
              px: 1.5,
              py: 0.7,
              minHeight: 36,
              boxShadow: 'none',
              textTransform: 'none',
              '&:hover': {
                background: sidebarBg ? '#2d3950' : '#1a2233',
                borderColor: '#fff4',
              },
              display: 'flex',
              alignItems: 'center',
              transition: 'background 0.2s, border 0.2s',
            }}
          >
            <span style={{ flexGrow: 1, textAlign: 'left' }}>Dashboard</span>
          </Button>
        </Box>
        <ListItem disablePadding sx={{ display: 'block', mt: 1 }}>
          <Button
            aria-controls={Boolean(anchorEl) ? 'my-campaigns-menu' : undefined}
            aria-haspopup="true"
            onClick={handleMenuOpen}
            sx={{
              width: '85%',
              margin: '0 auto',
              borderRadius: 1.5,
              background: sidebarBg || '#222e3c',
              color: '#fff',
              border: '1.5px solid #fff2',
              fontWeight: 500,
              fontSize: 15,
              letterSpacing: 0.5,
              justifyContent: 'flex-start',
              px: 1.5,
              py: 0.7,
              minHeight: 36,
              boxShadow: 'none',
              textTransform: 'none',
              '&:hover': {
                background: sidebarBg ? '#2d3950' : '#1a2233',
                borderColor: '#fff4',
              },
              display: 'flex',
              alignItems: 'center',
              transition: 'background 0.2s, border 0.2s',
            }}
          >
            <span style={{ flexGrow: 1, textAlign: 'left' }}>My Campaigns</span>
          </Button>
          <Menu
            id="my-campaigns-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            MenuListProps={{
              sx: { minWidth: 180, p: 0 },
            }}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            PaperProps={{
              sx: {
                borderRadius: 3,
                mt: 1,
                background: sidebarBg, // <-- só sidebarBg
                color: sidebarText || '#fff',
                boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
                p: 0,
              },
            }}
          >
            {campaigns.length === 0 && (
              <MenuItem disabled sx={{ opacity: 0.7 }}>No campaigns</MenuItem>
            )}
            {campaigns.map((name) => (
              <MenuItem key={name} onClick={() => { onSelect(name); handleMenuClose(); }}>
                {name}
              </MenuItem>
            ))}
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 1 }}>
              <Fab size="small" color="error" aria-label="add" onClick={handleAddCampaign}>
                <AddIcon />
              </Fab>
            </Box>
          </Menu>
        </ListItem>
        <Box sx={{ width: '100%', mb: 1 }}>
          <Button
            fullWidth
            onClick={() => setView('pdf')}
            sx={{
              width: '85%',
              margin: '0 auto',
              borderRadius: 1.5,
              background: view === 'pdf' ? (sidebarBg ? '#2d3950' : '#1a2233') : (sidebarBg || '#222e3c'),
              color: '#fff',
              border: view === 'pdf' ? '2px solid #fff' : '1.5px solid #fff2',
              fontWeight: 500,
              fontSize: 15,
              letterSpacing: 0.5,
              justifyContent: 'flex-start',
              px: 1.5,
              py: 0.7,
              minHeight: 36,
              boxShadow: 'none',
              textTransform: 'none',
              '&:hover': {
                background: sidebarBg ? '#2d3950' : '#1a2233',
                borderColor: '#fff4',
              },
              display: 'flex',
              alignItems: 'center',
              transition: 'background 0.2s, border 0.2s',
            }}
          >
            <span style={{ flexGrow: 1, textAlign: 'left' }}>Export PDF</span>
          </Button>
        </Box>
        <Box sx={{ width: '100%', mb: 1 }}>
          <Button
            fullWidth
            onClick={() => setView('future')}
            sx={{
              width: '85%',
              margin: '0 auto',
              borderRadius: 1.5,
              background: view === 'future' ? (sidebarBg ? '#2d3950' : '#1a2233') : (sidebarBg || '#222e3c'),
              color: '#fff',
              border: view === 'future' ? '2px solid #fff' : '1.5px solid #fff2',
              fontWeight: 500,
              fontSize: 15,
              letterSpacing: 0.5,
              justifyContent: 'flex-start',
              px: 1.5,
              py: 0.7,
              minHeight: 36,
              boxShadow: 'none',
              textTransform: 'none',
              '&:hover': {
                background: sidebarBg ? '#2d3950' : '#1a2233',
                borderColor: '#fff4',
              },
              display: 'flex',
              alignItems: 'center',
              transition: 'background 0.2s, border 0.2s',
            }}
          >
            <span style={{ flexGrow: 1, textAlign: 'left' }}>Future Graphs</span>
          </Button>
        </Box>
        <Box sx={{ width: '100%', mb: 1 }}>
          <Button
            fullWidth
            onClick={() => setView('piecharts')}
            sx={{
              width: '85%',
              margin: '0 auto',
              borderRadius: 1.5,
              background: view === 'piecharts' ? (sidebarBg ? '#2d3950' : '#1a2233') : (sidebarBg || '#222e3c'),
              color: '#fff',
              border: view === 'piecharts' ? '2px solid #fff' : '1.5px solid #fff2',
              fontWeight: 500,
              fontSize: 15,
              letterSpacing: 0.5,
              justifyContent: 'flex-start',
              px: 1.5,
              py: 0.7,
              minHeight: 36,
              boxShadow: 'none',
              textTransform: 'none',
              '&:hover': {
                background: sidebarBg ? '#2d3950' : '#1a2233',
                borderColor: '#fff4',
              },
              display: 'flex',
              alignItems: 'center',
              transition: 'background 0.2s, border 0.2s',
            }}
          >
            <span style={{ flexGrow: 1, textAlign: 'left' }}>PieCharts</span>
          </Button>
        </Box>
        <Box sx={{ width: '100%', mb: 1 }}>
          <Button
            fullWidth
            onClick={() => setView('profile')}
            sx={{
              width: '85%',
              margin: '0 auto',
              borderRadius: 1.5,
              background: view === 'profile' ? (sidebarBg ? '#2d3950' : '#1a2233') : (sidebarBg || '#222e3c'),
              color: '#fff',
              border: view === 'profile' ? '2px solid #fff' : '1.5px solid #fff2',
              fontWeight: 500,
              fontSize: 15,
              letterSpacing: 0.5,
              justifyContent: 'flex-start',
              px: 1.5,
              py: 0.7,
              minHeight: 36,
              boxShadow: 'none',
              textTransform: 'none',
              '&:hover': {
                background: sidebarBg ? '#2d3950' : '#1a2233',
                borderColor: '#fff4',
              },
              display: 'flex',
              alignItems: 'center',
              transition: 'background 0.2s, border 0.2s',
            }}
          >
            <span style={{ flexGrow: 1, textAlign: 'left' }}>Profile</span>
          </Button>
        </Box>
      </List>
    </Drawer>
  );
}
