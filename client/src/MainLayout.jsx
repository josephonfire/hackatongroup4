import React, { useState, useEffect } from 'react';
import Dashboard from './pages/Dashboard';
import CampaignSidebar from './components/CampaignSidebar';
import { Typography, Box, CssBaseline, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export default function MainLayout() {
  const [selectedCampaign, setSelectedCampaign] = useState('');
  const [campaigns, setCampaigns] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [whiteBg, setWhiteBg] = useState(false);
  const [view, setView] = useState('dashboard');

  useEffect(() => {
    setCampaigns([]);
    setSelectedCampaign('');
  }, []);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const handleBgToggle = () => {
    setWhiteBg((prev) => !prev);
  };

  const pageBg = whiteBg ? '#fff' : '#222e3c';
  const pageText = whiteBg ? '#222e3c' : '#fff';
  const sidebarBg = whiteBg ? '#111' : '#222e3c';
  const sidebarText = whiteBg ? '#fff' : '#fff';

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', background: pageBg, color: pageText, transition: 'background 0.3s, color 0.3s' }}>
      <CssBaseline />
      {sidebarOpen && (
        <CampaignSidebar
          campaigns={campaigns}
          selected={selectedCampaign}
          onSelect={setSelectedCampaign}
          onBgToggle={handleBgToggle}
          sidebarBg={sidebarBg}
          sidebarText={sidebarText}
          setView={setView}
          view={view}
          sx={{
            transition: 'width 0.3s',
            width: sidebarOpen ? 240 : 0,
            overflow: 'hidden',
          }}
        />
      )}
      {/* Sidebar toggle button (floating) */}
      <IconButton
        onClick={handleSidebarToggle}
        sx={{
          position: 'fixed',
          top: 24,
          left: sidebarOpen ? 250 : 24,
          zIndex: 1300,
          background: '#fff',
          boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
          transition: 'left 0.3s',
        }}
      >
        <MenuIcon />
      </IconButton>
      <Box component="main" sx={{ flexGrow: 1, p: 3, color: pageText }}>
        {/* ...existing code... */}
        {/* You can add your routes here if needed */}
        <Dashboard selectedCampaign={selectedCampaign} textColor={pageText} />
      </Box>
    </Box>
  );
}
