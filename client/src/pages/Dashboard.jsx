import React, { useState, useEffect, useRef } from "react";
import SummaryCards from "../components/SummaryCards";
import BarChartComponent from "../components/BarChart";
import PieChartComponent from "../components/PieChart";
import ExportPDF from "../components/ExportPDF";
import Profile from "../components/Profile";
import { Box, Typography, Button, CssBaseline, Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, InputLabel, Select, MenuItem, Menu } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ModernLineChart from "../components/ModernLineChart";
import ModernSidebar from '../components/ModernSidebar';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

export default function Dashboard() {
  const [selectedCampaign, setSelectedCampaign] = useState("");
  const [campaigns, setCampaigns] = useState([]);
  const [whiteBg, setWhiteBg] = useState(false);
  const [view, setView] = useState("dashboard");
  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [campaignName, setCampaignName] = useState("");
  const [platform, setPlatform] = useState("");
  const [investment, setInvestment] = useState("");
  const dashboardRef = useRef();
  const [connectedSocials, setConnectedSocials] = useState(["Instagram", "Facebook", "TikTok", "LinkedIn", "X"]); // All connected by default

  // Event button to open the campaign menu
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  // Event button to close the campaign menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  // Event button to add campaign
  const handleAddCampaign = () => {

    alert('Add new campaign!');
    setAnchorEl(null);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
    setCampaignName("");
    setPlatform("");
    setInvestment("");
  };
  const handleDialogSave = () => {
  
    setDialogOpen(false);
    setCampaignName("");
    setPlatform("");
    setInvestment("");
  };

  const pageBg = whiteBg ? '#f5f6fa' : '#33363D';
  const pageText = whiteBg ? '#222e3c' : '#5edc1f';
  const sidebarBg = '#23263a';
  const sidebarText = whiteBg ? '#fff' : '#fff';
  const cardBg = whiteBg ? '#fff' : '#151623';
  const cardText = whiteBg ? '#222e3c' : '#69bec4';
  const cardShadow = whiteBg ? '0 2px 12px #0001' : '0 2px 12px #0008';

  useEffect(() => {
    setCampaigns([]);
    setSelectedCampaign("");
  }, []);

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

  // Example data for the season progress chart
  const seasonData = [
    { day: 'Day 1', Instagram: 1200, Facebook: 900, TikTok: 800, LinkedIn: 400, X: 200 },
    { day: 'Day 2', Instagram: 1500, Facebook: 1100, TikTok: 950, LinkedIn: 500, X: 300 },
    { day: 'Day 3', Instagram: 1800, Facebook: 1300, TikTok: 1200, LinkedIn: 700, X: 400 },
    { day: 'Day 4', Instagram: 2100, Facebook: 1600, TikTok: 1400, LinkedIn: 900, X: 500 },
    { day: 'Day 5', Instagram: 2500, Facebook: 1800, TikTok: 1700, LinkedIn: 1100, X: 600 },
    { day: 'Day 6', Instagram: 3000, Facebook: 2000, TikTok: 2000, LinkedIn: 1300, X: 700 },
    { day: 'Day 7', Instagram: 3500, Facebook: 2200, TikTok: 2300, LinkedIn: 1500, X: 800 },
  ];
  // Descobrir a plataforma mais rentável
  const totals = seasonData.reduce((acc, cur) => {
    Object.keys(cur).forEach(key => {
      if (key !== 'dia') acc[key] = (acc[key] || 0) + cur[key];
    });
    return acc;
  }, {});
  const mostProfitablePlatform = Object.entries(totals).sort((a, b) => b[1] - a[1])[0][0];

  // Filter pieData and seasonData to only include connected socials
  const filteredPieData = pieData.filter(item => connectedSocials.includes(item.name));
  const filteredSeasonData = seasonData.map(day => {
    const filtered = { ...day };
    Object.keys(filtered).forEach(key => {
      if (key !== 'day' && !connectedSocials.includes(key)) delete filtered[key];
    });
    return filtered;
  });

  return (
    <Box
      className="dashboard-page"
      sx={{
        minHeight: '100vh',
        height: '100vh',
        background: 'linear-gradient(135deg, #23263a 0%, #33363D 60%, #69bec4 100%)',
        color: cardText,
        transition: 'background 0.3s, color 0.3s',
        overflow: 'hidden',
        display: 'flex',
      }}
    >
      <CssBaseline />
      <ModernSidebar view={view} setView={setView} />
      <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, md: 4 }, color: pageText, minHeight: '100vh', maxHeight: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 4 }}>
        {view === "dashboard" && (
          <>
            {/* Grid principal */}
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr 1fr' }, gridTemplateRows: { xs: 'auto', md: '1fr 1fr' }, gap: 3, mb: 4, width: '100%' }}>
              {/* Card maior: Receita */}
              <Box sx={{ gridColumn: { md: '1/2' }, gridRow: { md: '1/3' }, background: 'linear-gradient(120deg, #69bec4 0%, #5edc1f 100%)', color: '#23263a', borderRadius: 5, boxShadow: '0 4px 32px 0 #69bec422', p: 4, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 220 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <span style={{ fontSize: 32, fontWeight: 900, letterSpacing: 1 }}>Receita</span>
                </Box>
                <Box sx={{ fontSize: 44, fontWeight: 900, mb: 1, letterSpacing: 1.5 }}>$17.34</Box>
                <Box sx={{ fontWeight: 700, fontSize: 18, color: '#5edc1f', letterSpacing: 1 }}>+11%</Box>
                <Box sx={{ mt: 2, fontSize: 15, color: '#23263a', opacity: 0.7 }}>Total acumulado nesta season</Box>
              </Box>
              {/* Card: Crescimento */}
              <Box sx={{ background: '#151623', color: '#69bec4', borderRadius: 5, boxShadow: '0 4px 32px 0 #69bec422', p: 3, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', minHeight: 100 }}>
                <Box sx={{ fontSize: 18, fontWeight: 700, mb: 1, letterSpacing: 1 }}>Crescimento</Box>
                <Box sx={{ fontSize: 32, fontWeight: 900 }}>$12.34</Box>
                <Box sx={{ fontWeight: 700, fontSize: 16, color: '#5edc1f', letterSpacing: 1 }}>+3.5%</Box>
              </Box>
              {/* Card: Despesas */}
              <Box sx={{ background: '#151623', color: '#69bec4', borderRadius: 5, boxShadow: '0 4px 32px 0 #69bec422', p: 3, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', minHeight: 100 }}>
                <Box sx={{ fontSize: 18, fontWeight: 700, mb: 1, letterSpacing: 1 }}>Despesas</Box>
                <Box sx={{ fontSize: 32, fontWeight: 900 }}>$31.53</Box>
                <Box sx={{ fontWeight: 700, fontSize: 16, color: '#5edc1f', letterSpacing: 1 }}>+3.5%</Box>
              </Box>
              {/* Card: Renda Diária */}
              <Box sx={{ background: '#151623', color: '#d32f2f', borderRadius: 5, boxShadow: '0 4px 32px 0 #69bec422', p: 3, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', minHeight: 100 }}>
                <Box sx={{ fontSize: 18, fontWeight: 700, mb: 1, letterSpacing: 1 }}>Renda Diária</Box>
                <Box sx={{ fontSize: 32, fontWeight: 900 }}>$12.34</Box>
                <Box sx={{ fontWeight: 700, fontSize: 16, color: '#d32f2f', letterSpacing: 1 }}>-2.4%</Box>
              </Box>
            </Box>
            {/* Gráfico principal destacado */}
            <Box sx={{ background: '#151623', borderRadius: 6, boxShadow: '0 4px 32px 0 #69bec422', p: { xs: 2, md: 4 }, mb: 2, color: cardText, width: '100%', maxWidth: '100%', display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'space-between', gap: 4 }}>
              <Box sx={{ flex: 2, minWidth: 0 }}>
                <Typography variant="h6" sx={{ mb: 2, color: cardText, fontWeight: 800, fontSize: 20, letterSpacing: 0.2, textAlign: 'left', textShadow: whiteBg ? 'none' : '0 1px 4px #0006' }}>
                  Progresso da Season por Plataforma
                </Typography>
                <Box sx={{ height: { xs: 180, md: 240 }, width: '100%', maxWidth: '100%', mx: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ModernLineChart data={seasonData} whiteBg={whiteBg} />
                </Box>
              </Box>
              <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                <Typography variant="h6" sx={{ color: cardText, fontWeight: 700, fontSize: 16, mb: 1 }}>Distribuição de Plataformas</Typography>
                <PieChartComponent data={pieData} />
                <Box sx={{ mt: 2, p: 1.5, background: whiteBg ? '#e8f5e9' : '#23263a', borderRadius: 2, color: cardText, fontWeight: 500, fontSize: 14, textAlign: 'center', width: '100%', maxWidth: '100%', mx: 'auto', boxShadow: whiteBg ? '0 1px 4px #5edc1f22' : '0 1px 4px #0006', transition: 'box-shadow 0.2s, background 0.2s' }}>
                  Dica: A plataforma mais rentável nesta season foi <span style={{ color: '#5edc1f', fontWeight: 700 }}>{mostProfitablePlatform}</span>!
                </Box>
              </Box>
            </Box>
            {/* Botão de ação flutuante */}
            {/* Botões flutuantes no canto inferior direito */}
            <Box sx={{ position: 'fixed', bottom: 32, right: 32, zIndex: 1300, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
              <Button
                onClick={handleAddCampaign}
                sx={{
                  borderRadius: '50%',
                  width: 64,
                  height: 64,
                  background: 'linear-gradient(90deg, #69bec4 0%, #5edc1f 100%)',
                  color: '#23263a',
                  boxShadow: '0 8px 32px 0 #69bec4cc',
                  fontWeight: 900,
                  fontSize: 32,
                  minWidth: 0,
                  p: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 2,
                  transition: 'background 0.3s, box-shadow 0.3s, color 0.3s, transform 0.3s',
                  '&:hover': {
                    background: 'linear-gradient(90deg, #5edc1f 0%, #69bec4 100%)',
                    color: '#23263a',
                    boxShadow: '0 12px 40px 0 #69bec4ee',
                    transform: 'scale(1.08)',
                  },
                }}
              >
                <AddIcon sx={{ color: '#23263a', fontSize: 36 }} />
              </Button>
              <ExportPDF
                exportRef={dashboardRef}
                fileName="dashboard.pdf"
                customButton={
                  <button className="export-pdf-fab" title="Download PDF" style={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    background: 'linear-gradient(90deg, #69bec4 0%, #5edc1f 100%)',
                    border: 'none',
                    boxShadow: '0 4px 16px 0 #69bec455',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'background 0.3s, box-shadow 0.3s, transform 0.3s',
                  }}>
                    <PictureAsPdfIcon style={{ width: 32, height: 32, color: '#23263a' }} />
                  </button>
                }
              />
            </Box>
          </>
        )}
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
        <Dialog open={dialogOpen} onClose={handleDialogClose} PaperProps={{ sx: { borderRadius: 4, p: 1 } }}>
          <DialogTitle sx={{ fontWeight: 700, fontSize: 20, color: '#5edc1f', textAlign: 'center', letterSpacing: 0.5 }}>
            Criar Nova Campanha
          </DialogTitle>
          <DialogContent sx={{ minWidth: 340, p: 2 }}>
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
            label="Valor do investimento"
            type="number"
            fullWidth
            variant="outlined"
            value={investment}
            onChange={e => setInvestment(e.target.value)}
            inputProps={{ min: 0 }}
          />
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
          <Button onClick={handleDialogClose} color="secondary" sx={{ fontWeight: 600, px: 3 }}>Cancelar</Button>
          <Button onClick={handleDialogSave} color="primary" variant="contained" sx={{ fontWeight: 700, px: 3, background: 'linear-gradient(90deg, #5edc1f 0%, #3bbf1f 100%)', color: '#181a20', '&:hover': { background: 'linear-gradient(90deg, #3bbf1f 0%, #5edc1f 100%)', color: '#fff' } }}>Salvar</Button>
        </DialogActions>
      </Dialog>
      {/* Floating PDF Export Button - moved outside main content for correct positioning */}
      {/* Floating PDF Export Button - moved outside main content for correct positioning */}
    </Box>
  );
}