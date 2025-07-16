import React, { useState, useEffect } from 'react';
import Dashboard from './pages/Dashboard';
import CampaignSidebar from './components/CampaignSidebar';
import { Box, CssBaseline } from '@mui/material';

export default function MainLayout() {
  const [selectedCampaign, setSelectedCampaign] = useState('');
  const [campaigns, setCampaigns] = useState([]);
  const [whiteBg, setWhiteBg] = useState(false);
  const [view, setView] = useState('dashboard');

  useEffect(() => {
    setCampaigns(['Campanha 1', 'Campanha 2']);
    setSelectedCampaign('Campanha 1');
  }, []);

  const handleBgToggle = () => {
    setWhiteBg((prev) => !prev);
  };

  const pageBg = whiteBg ? '#fff' : '#222e3c';
  const pageText = whiteBg ? '#222e3c' : '#fff';
  const sidebarBg = whiteBg ? '#111' : '#222e3c';
  const sidebarText = whiteBg ? '#fff' : '#fff';

  return (
    <Box sx={{ minHeight: '100vh', background: pageBg, color: pageText, transition: 'background 0.3s, color 0.3s' }}>
      <CssBaseline />
      {/* Sidebar mobile/overlay sempre disponível */}
      <CampaignSidebar
        campaigns={campaigns}
        selected={selectedCampaign}
        onSelect={setSelectedCampaign}
        onBgToggle={handleBgToggle}
        sidebarBg={sidebarBg}
        sidebarText={sidebarText}
        setView={setView}
        view={view}
        whiteBg={whiteBg}
      />
      <Box component="main" sx={{ p: 3, color: pageText }}>
        {/* ...existing code... */}
        {/* You can add your routes here if needed */}
        <Dashboard selectedCampaign={selectedCampaign} textColor={pageText} />
      </Box>
    </Box>
  );
}
