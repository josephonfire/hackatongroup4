import React, { useState, useEffect, useRef } from "react";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import "../styles/BarChart.css";
import Profile from "../components/Profile";
import "../styles/Dashboard.css";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import AddIcon from '@mui/icons-material/Add';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

export default function Dashboard() {
  const [selectedCampaign, setSelectedCampaign] = useState("");
  const [campaigns, setCampaigns] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [whiteBg, setWhiteBg] = useState(false);
  const [view, setView] = useState("dashboard");
  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [campaignName, setCampaignName] = useState("");
  const [platform, setPlatform] = useState("");
  const [investment, setInvestment] = useState("");
  const dashboardRef = useRef();

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
    setDialogOpen(true);
    setAnchorEl(null);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
    setCampaignName("");
    setPlatform("");
    setInvestment("");
  };
  const handleDialogSave = () => {
    // Aqui você pode adicionar a lógica para salvar a campanha
    setDialogOpen(false);
    setCampaignName("");
    setPlatform("");
    setInvestment("");
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
          zIndex: 100,
          background: "#fdfdfd",
          boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
          transition: "left 0.3s",
        }}
      >
        <MenuIcon />
      </IconButton>
      <Box component="main" sx={{ flexGrow: 1, p: 3, color: pageText }}>
        {/* Banner */}
        <Box className="dashboard-container" style={{ background: 'transparent' }} ref={dashboardRef}>
          {/* Cards */}
          <Box className="dashboard-cards">
            <Box className="dashboard-card" style={{ background: cardBg, color: cardText, boxShadow: cardShadow }}>
              <div className="card-title" style={{
                fontFamily: 'Inter, Roboto, Arial, sans-serif',
                fontWeight: 600,
                fontSize: '1.15rem',
                color: whiteBg ? '#23263a' : '#fff',
                marginBottom: 4,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                textShadow: whiteBg ? 'none' : '0 1px 4px #0006',
                letterSpacing: 0.2
              }}>
                Potential growth
                <span style={{
                  display: 'inline-block',
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: whiteBg ? '#5edc1f' : '#5edc1f',
                  marginLeft: 6
                }} />
              </div>
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
              <div className="card-title" style={{
                fontFamily: 'Inter, Roboto, Arial, sans-serif',
                fontWeight: 600,
                fontSize: '1.15rem',
                color: whiteBg ? '#23263a' : '#fff',
                marginBottom: 4,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                textShadow: whiteBg ? 'none' : '0 1px 4px #0006',
                letterSpacing: 0.2
              }}>
                Revenue current
                <span style={{
                  display: 'inline-block',
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: whiteBg ? '#5edc1f' : '#5edc1f',
                  marginLeft: 6
                }} />
              </div>
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
              <div className="card-title" style={{
                fontFamily: 'Inter, Roboto, Arial, sans-serif',
                fontWeight: 600,
                fontSize: '1.15rem',
                color: whiteBg ? '#23263a' : '#fff',
                marginBottom: 4,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                textShadow: whiteBg ? 'none' : '0 1px 4px #0006',
                letterSpacing: 0.2
              }}>
                Daily Income
                <span style={{
                  display: 'inline-block',
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: whiteBg ? '#5edc1f' : '#5edc1f',
                  marginLeft: 6
                }} />
              </div>
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
              <div className="card-title" style={{
                fontFamily: 'Inter, Roboto, Arial, sans-serif',
                fontWeight: 600,
                fontSize: '1.15rem',
                color: whiteBg ? '#23263a' : '#fff',
                marginBottom: 4,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                textShadow: whiteBg ? 'none' : '0 1px 4px #0006',
                letterSpacing: 0.2
              }}>
                Expense current
                <span style={{
                  display: 'inline-block',
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: whiteBg ? '#5edc1f' : '#5edc1f',
                  marginLeft: 6
                }} />
              </div>
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
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2, gap: 2 }}>
                <Typography variant="h6" sx={{ color: cardText, fontWeight: 600 }}>Open Campaigns</Typography>
                <Button
                  onClick={handleAddCampaign}
                  sx={{
                    borderRadius: 3,
                    background: 'linear-gradient(90deg, #5edc1f 0%, #3bbf1f 100%)',
                    color: '#181a20',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: 16,
                    letterSpacing: 0.5,
                    px: 3,
                    py: 1.2,
                    minHeight: 44,
                    boxShadow: '0 4px 16px 0 rgba(94,220,31,0.15)',
                    textTransform: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.2,
                    transition: 'background 0.2s, box-shadow 0.2s, color 0.2s',
                    '&:hover': {
                      background: 'linear-gradient(90deg, #3bbf1f 0%, #5edc1f 100%)',
                      color: '#fff',
                      boxShadow: '0 6px 20px 0 rgba(94,220,31,0.22)',
                    },
                  }}
                  startIcon={<AddIcon sx={{ color: '#181a20' }} />}
                >
                  Create Campaign
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
                  {campaigns.map((name) => (
                    <MenuItem key={name} onClick={() => { setSelectedCampaign(name); handleMenuClose(); }}>
                      {name}
                    </MenuItem>
                  ))}
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
      {/* Dialog para criar campanha */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Criar Nova Campanha</DialogTitle>
        <DialogContent sx={{ minWidth: 340 }}>
          <TextField
            autoFocus
            margin="dense"
            label="Nome da campanha"
            type="text"
            fullWidth
            variant="outlined"
            value={campaignName}
            onChange={e => setCampaignName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="platform-label">Plataforma</InputLabel>
            <Select
              labelId="platform-label"
              value={platform}
              label="Plataforma"
              onChange={e => setPlatform(e.target.value)}
            >
              <MenuItem value="Instagram">Instagram</MenuItem>
              <MenuItem value="Facebook">Facebook</MenuItem>
              <MenuItem value="TikTok">TikTok</MenuItem>
              <MenuItem value="LinkedIn">LinkedIn</MenuItem>
              <MenuItem value="X">X</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="Valor de investimento"
            type="number"
            fullWidth
            variant="outlined"
            value={investment}
            onChange={e => setInvestment(e.target.value)}
            inputProps={{ min: 0 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">Cancelar</Button>
          <Button onClick={handleDialogSave} color="primary" variant="contained">Salvar</Button>
        </DialogActions>
      </Dialog>
      {/* Floating PDF Export Button - moved outside main content for correct positioning */}
      <ExportPDF
        exportRef={dashboardRef}
        fileName="dashboard.pdf"
        customButton={
          <button className="export-pdf-fab" title="Download PDF">
            <PictureAsPdfIcon style={{ width: 32, height: 32 }} />
          </button>
        }
      />
    </Box>
  );
}
