import React, { useState, useEffect } from "react";
import SummaryCards from "../components/SummaryCards";
import BarChartComponent from "../components/BarChart";
import PieChartComponent from "../components/PieChart";
import ExportPDF from "../components/ExportPDF";
import CampaignSidebar from "../components/CampaignSidebar";
import {
  Typography,
  Box,
  CssBaseline,
  IconButton,
  Divider,
  Button,
  Menu,
  MenuItem,
  Fab,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import "../styles/BarChart.css";
import Profile from "../components/Profile";
import "../styles/Dashboard.css";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import AddIcon from '@mui/icons-material/Add';

export default function Dashboard() {
  const [selectedCampaign, setSelectedCampaign] = useState("");
  const [campaigns, setCampaigns] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [whiteBg, setWhiteBg] = useState(false);
  const [view, setView] = useState("dashboard");
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

  const pageBg = whiteBg ? '#f5f6fa' : '#181a20';
  const pageText = whiteBg ? '#222e3c' : '#5edc1f';
  const sidebarBg = '#23263a';
  const sidebarText = whiteBg ? '#fff' : '#fff';
  const cardBg = whiteBg ? '#fff' : '#23263a';
  const cardText = whiteBg ? '#222e3c' : '#5edc1f';
  const cardShadow = whiteBg ? '0 2px 12px #0001' : '0 2px 12px #0008';

  useEffect(() => {
    setCampaigns([]);
    setSelectedCampaign("");
  }, []);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const handleBgToggle = () => setWhiteBg((prev) => !prev);

  // Placeholder for future backend data
  const campaignData = [];

  const pieData = [
    { name: "Instagram", value: 400 },
    { name: "Facebook", value: 300 },
    { name: "TikTok", value: 300 },
    { name: "LinkedIn", value: 200 },
    { name: "X", value: 100 },
  ];

  return (
    <Box
      className="dashboard-page"
      sx={{
        display: 'flex',
        minHeight: '100vh',
        background: pageBg,
        color: cardText,
        transition: 'background 0.3s, color 0.3s'
      }}
    >
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
          position: "fixed",
          top: 24,
          left: sidebarOpen ? 250 : 24,
          zIndex: 1300,
          background: "#fdfdfd",
          boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
          transition: "left 0.3s",
        }}
      >
        <MenuIcon />
      </IconButton>
      <Box component="main" sx={{ flexGrow: 1, p: 3, color: pageText }}>
        {/* Banner */}
        <Box className="dashboard-container" style={{ background: 'transparent' }}>
          {/* Cards */}
          <Box className="dashboard-cards">
            <Box className="dashboard-card" style={{ background: cardBg, color: cardText, boxShadow: cardShadow }}>
              <div className="card-title">Potential growth</div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span className="card-value" style={{ color: '#5edc1f' }}>$12.34</span>
                <span className="card-growth positive">+3.5%</span>
                <span
                  className="card-icon"
                  style={{
                    marginLeft: 16,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    background: 'rgba(94,220,31,0.08)',
                    border: '2px solid #5edc1f',
                    color: '#5edc1f',
                    fontWeight: 'bold',
                    fontSize: 22,
                    lineHeight: '36px',
                    textAlign: 'center',
                    padding: 0,
                  }}
                >
                  ↑
                </span>
              </div>
            </Box>
            <Box className="dashboard-card" style={{ background: cardBg, color: cardText, boxShadow: cardShadow }}>
              <div className="card-title">Revenue current</div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span className="card-value" style={{ color: '#5edc1f' }}>$17.34</span>
                <span className="card-growth positive">+11%</span>
                <span
                  className="card-icon"
                  style={{
                    marginLeft: 16,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    background: 'rgba(94,220,31,0.08)',
                    border: '2px solid #5edc1f',
                    color: '#5edc1f',
                    fontWeight: 'bold',
                    fontSize: 22,
                    lineHeight: '36px',
                    textAlign: 'center',
                    padding: 0,
                  }}
                >
                  ↑
                </span>
              </div>
            </Box>
            <Box className="dashboard-card" style={{ background: cardBg, color: cardText, boxShadow: cardShadow }}>
              <div className="card-title">Daily Income</div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span className="card-value" style={{ color: '#d32f2f' }}>$12.34</span>
                <span className="card-growth negative">-2.4%</span>
                <span
                  className="card-icon"
                  style={{
                    marginLeft: 16,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    background: 'rgba(211,47,47,0.08)',
                    border: '2px solid #d32f2f',
                    color: '#d32f2f',
                    fontWeight: 'bold',
                    fontSize: 22,
                    lineHeight: '36px',
                    textAlign: 'center',
                    padding: 0,
                  }}
                >
                  ↓
                </span>
              </div>
            </Box>
            <Box className="dashboard-card" style={{ background: cardBg, color: cardText, boxShadow: cardShadow }}>
              <div className="card-title">Expense current</div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span className="card-value" style={{ color: '#5edc1f' }}>$31.53</span>
                <span className="card-growth positive">+3.5%</span>
                <span
                  className="card-icon"
                  style={{
                    marginLeft: 16,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    background: 'rgba(94,220,31,0.08)',
                    border: '2px solid #5edc1f',
                    color: '#5edc1f',
                    fontWeight: 'bold',
                    fontSize: 22,
                    lineHeight: '36px',
                    textAlign: 'center',
                    padding: 0,
                  }}
                >
                  ↑
                </span>
              </div>
            </Box>
          </Box>
          {/* Duas divs lado a lado */}
          <Box sx={{ display: 'flex', gap: 3, mt: 3, mb: 6, minHeight: 320 }}>
            {/* Esquerda: 33% */}
            <Box sx={{ flex: '1 1 33%', background: cardBg, borderRadius: 3, boxShadow: cardShadow, p: 3, minWidth: 220, color: cardText }}>
              <Typography variant="h6" sx={{ mb: 2, color: cardText, fontWeight: 600 }}>Distribuição de Plataformas</Typography>
              <PieChartComponent data={pieData} />
            </Box>
            {/* Direita: 66% */}
            <Box sx={{ flex: '2 1 66%', background: cardBg, borderRadius: 3, boxShadow: cardShadow, p: 3, minWidth: 320, color: cardText }}>
              <Typography variant="h6" sx={{ mb: 2, color: cardText, fontWeight: 600 }}>Open Campaigns</Typography>
              {/* My Campaigns Button */}
              <Box sx={{ width: '100%', mb: 2 }}>
                <Button
                  aria-controls={Boolean(anchorEl) ? 'my-campaigns-menu' : undefined}
                  aria-haspopup="true"
                  onClick={handleMenuOpen}
                  sx={{
                    width: '85%',
                    margin: '0 auto',
                    borderRadius: 1.5,
                    background: cardBg,
                    color: cardText,
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
                      background: whiteBg ? '#f5f6fa' : '#23263a',
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
                      background: cardBg,
                      color: cardText,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
                      p: 0,
                    },
                  }}
                >
                  {campaigns.length === 0 && (
                    <MenuItem disabled sx={{ opacity: 0.7 }}>No campaigns</MenuItem>
                  )}
                  {campaigns.map((name) => (
                    <MenuItem key={name} onClick={() => { setSelectedCampaign(name); handleMenuClose(); }}>
                      {name}
                    </MenuItem>
                  ))}
                  <Box sx={{ display: 'flex', justifyContent: 'center', p: 1 }}>
                    <Fab size="small" color="error" aria-label="add" onClick={handleAddCampaign}>
                      <AddIcon />
                    </Fab>
                  </Box>
                </Menu>
              </Box>
              {/* Adicione aqui o conteúdo desejado */}
            </Box>
          </Box>
        </Box>

        {view === "dashboard" && <></>}
        {view === "profile" && <Profile />}
        {view === "pdf" && (
          <Typography variant="h6">
            PDF Export (component placeholder)
          </Typography>
        )}
        {view === "future" && (
          <Typography variant="h6">
            Future Graphs (component placeholder)
          </Typography>
        )}
        {view === "piecharts" && (
          <Typography variant="h6">
            PieCharts (component placeholder)
            </Typography>
        )}
      </Box>
    </Box>
  );
}
