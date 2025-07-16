
import React, { useState, useEffect } from 'react';
import SummaryCards from '../components/SummaryCards';
import BarChartComponent from '../components/BarChart';
import PieChartComponent from '../components/PieChart';
import ExportPDF from '../components/ExportPDF';
import CampaignSidebar from '../components/CampaignSidebar';
import { Typography, Box, CssBaseline, IconButton, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import '../styles/BarChart.css';
import Profile from '../components/Profile';

export default function Dashboard() {
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
  const handleBgToggle = () => setWhiteBg((prev) => !prev);

  const pageBg = whiteBg ? '#fff' : '#222e3c';
  const pageText = whiteBg ? '#222e3c' : '#fff';
  const sidebarBg = whiteBg ? '#111' : '#222e3c';
  const sidebarText = whiteBg ? '#fff' : '#fff';

  // Placeholder for future backend data
  const campaignData = [];

  return (
    <Box className="dashboard-page" sx={{ display: 'flex', minHeight: '100vh', background: pageBg, color: pageText, transition: 'background 0.3s, color 0.3s' }}>
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
          whiteBg={whiteBg}
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
          background: '#fdfdfd',
          boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
          transition: 'left 0.3s',
        }}
      >
        <MenuIcon />
      </IconButton>
      <Box component="main" sx={{ flexGrow: 1, p: 3, color: pageText }}>
        {view === 'dashboard' && (
          <>
            <Typography variant="h4" gutterBottom sx={{ color: pageText }}>
              {selectedCampaign} – Dashboard
            </Typography>
            <SummaryCards data={campaignData} />
            <Divider sx={{ my: 3 }} />
            <Typography variant="h6" gutterBottom sx={{ color: pageText }}>Performance Over Time</Typography>
            <BarChartComponent data={campaignData} />
            <Divider sx={{ my: 3 }} />
          </>
        )}
        {view === 'profile' && <Profile />}
        {view === 'pdf' && <Typography variant="h6">PDF Export (component placeholder)</Typography>}
        {view === 'future' && <Typography variant="h6">Future Graphs (component placeholder)</Typography>}
        {view === 'piecharts' && <Typography variant="h6">PieCharts (component placeholder)</Typography>}
      </Box>
    </Box>
  );
}
