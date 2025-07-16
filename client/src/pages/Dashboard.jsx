import React, { useState, useEffect, useRef } from "react";
import SummaryCards from "../components/SummaryCards";
import BarChartComponent from "../components/BarChart";
import PieChartComponent from "../components/PieChart";
import ExportPDF from "../components/ExportPDF";
import Profile from "../components/Profile";
import { Box, Typography, Button, CssBaseline, Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, InputLabel, Select, MenuItem, Menu, ToggleButtonGroup, ToggleButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ModernLineChart from "../components/ModernLineChart";
import ModernSidebar from '../components/ModernSidebar';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { motion } from "framer-motion";

export default function Dashboard() {
  const [selectedCampaign, setSelectedCampaign] = useState("");
  const [whiteBg, setWhiteBg] = useState(false);
  const [view, setView] = useState("dashboard");
  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [campaignName, setCampaignName] = useState("");
  const [platform, setPlatform] = useState("");
  const [investment, setInvestment] = useState("");
  const dashboardRef = useRef();
  const [connectedSocials, setConnectedSocials] = useState(["Instagram", "Facebook", "TikTok", "LinkedIn", "X"]); // All connected by default
  const [pieData, setPieData] = useState([]);
  const [seasonData7Days, setSeasonData7Days] = useState([]);
  const [seasonData30Days, setSeasonData30Days] = useState([]);
  const [selectedTimeframe, setSelectedTimeframe] = useState("7days");
  const [summary, setSummary] = useState({});
  const [platforms, setPlatforms] = useState([]);
  const [dashboardCampaigns, setDashboardCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    setSelectedCampaign("");
    setLoading(true);
    setError(null);
    fetch('http://localhost:3031/api/dashboard-data')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch dashboard data');
        }
        return res.json();
      })
      .then(data => {
        console.log('DADOS DO BACKEND:', data);
        setPieData(data.pieData || []);
        setSeasonData7Days(data.seasonData7Days || []);
        setSeasonData30Days(data.seasonData30Days || []);
        setSummary(data.summary || {});
        setPlatforms(data.platforms || []);
        setDashboardCampaigns(data.campaigns || []);
        setLoading(false);
      })
      .catch(err => {
        // Trate o erro, se necessário
        console.error('Erro ao buscar dados do dashboard:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Proteção extra para selectedTimeframe
  const safeTimeframe = ["7days", "30days"].includes(selectedTimeframe) ? selectedTimeframe : "7days";
  const currentSeasonData = safeTimeframe === "7days" ? seasonData7Days : seasonData30Days;

  // Normalizar nomes das plataformas para evitar erro de filtro
  const normalize = (str) => (str || "").toLowerCase().replace(/[^a-z0-9]/gi, '');
  const normalizedSocials = (connectedSocials || []).map(normalize);

  const filteredPieData = pieData || [];
  const filteredSeasonData = currentSeasonData || [];

  // Log para depuração
  console.log('DADOS PARA O GRÁFICO:', filteredSeasonData);

  // Descobrir a plataforma mais rentável
  const totals = filteredSeasonData.reduce((acc, cur) => {
    Object.keys(cur).forEach(key => {
      if (key !== 'day') acc[key] = (acc[key] || 0) + cur[key];
    });
    return acc;
  }, {});

  const mostProfitablePlatform =
    Object.entries(totals).length > 0
      ? Object.entries(totals).sort((a, b) => b[1] - a[1])[0][0]
      : "";

  // Get color for the most profitable platform
  const getPlatformColor = (platform) => {
    const colors = {
      Instagram: '#e1306c',
      Facebook: '#1877f2',
      TikTok: '#FFD600',
      LinkedIn: '#0077b5',
      X: '#5edc1f',
    };
    return colors[platform] || '#69bec4';
  };

  // Calculate total revenue for the selected timeframe
  const getTotalRevenueForTimeframe = () => {
    return filteredSeasonData.reduce((total, day) => {
      Object.keys(day).forEach(key => {
        if (key !== 'day') total += day[key];
      });
      return total;
    }, 0);
  };

  // Get timeframe display text
  const getTimeframeText = () => {
    return selectedTimeframe === "7days" ? "this week" : "this month";
  };

  // Loading component
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h6" sx={{ color: '#69bec4' }}>Loading dashboard data...</Typography>
      </Box>
    );
  }

  // Error component
  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h6" sx={{ color: '#d32f2f' }}>Error: {error}</Typography>
      </Box>
    );
  }

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
      <ModernSidebar view={view} setView={setView} dashboardRef={dashboardRef} />
      <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, md: 4 }, color: pageText, minHeight: '100vh', maxHeight: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 4 }}>
        {view === "dashboard" && (
          <motion.div
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -200 }}
            transition={{ duration: 0.7, ease: "anticipate" }}
            style={{ height: "100%" }}
          >
            {/* Grid principal */}
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr 1fr' }, gridTemplateRows: { xs: 'auto', md: '1fr 1fr' }, gap: 3, mb: 4, width: '100%' }}>
              {/* Card maior: Receita */}
              <Box sx={{ gridColumn: { md: '1/2' }, gridRow: { md: '1/3' }, background: 'linear-gradient(120deg, #69bec4 0%, #3a5c7c 100%)', color: '#23263a', borderRadius: 5, boxShadow: '0 4px 32px 0 #69bec422', p: 4, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 220 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <span style={{ fontSize: 32, fontWeight: 900, letterSpacing: 1 }}>Total Revenue</span>
                </Box>
                <Box sx={{ fontSize: 44, fontWeight: 900, mb: 1, letterSpacing: 1.5 }}>${summary.totalRevenue?.toLocaleString() || '0'}</Box>
                <Box sx={{ fontWeight: 700, fontSize: 18, color: '#5edc1f', letterSpacing: 1 }}>ROI: {summary.roi?.toFixed(2)}x</Box>
                <Box sx={{ mt: 2, fontSize: 15, color: '#23263a', opacity: 0.7 }}>Best Platform: {summary.bestPlatform}</Box>
              </Box>
              {/* Card: Crescimento */}
              <Box sx={{ background: '#151623', color: '#69bec4', borderRadius: 5, boxShadow: '0 4px 32px 0 #69bec422', p: 3, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', minHeight: 100 }}>
                <Box sx={{ fontSize: 18, fontWeight: 700, mb: 1, letterSpacing: 1 }}>Total Clicks</Box>
                <Box sx={{ fontSize: 32, fontWeight: 900 }}>{summary.totalClicks?.toLocaleString() || '0'}</Box>
                <Box sx={{ fontWeight: 700, fontSize: 16, color: '#5edc1f', letterSpacing: 1 }}>{summary.totalConversions} conversions</Box>
              </Box>
              {/* Card: Despesas */}
              <Box sx={{ background: '#151623', color: '#69bec4', borderRadius: 5, boxShadow: '0 4px 32px 0 #69bec422', p: 3, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', minHeight: 100 }}>
                <Box sx={{ fontSize: 18, fontWeight: 700, mb: 1, letterSpacing: 1 }}>Total Cost</Box>
                <Box sx={{ fontSize: 32, fontWeight: 900 }}>${summary.totalCost?.toLocaleString() || '0'}</Box>
                <Box sx={{ fontWeight: 700, fontSize: 16, color: '#5edc1f', letterSpacing: 1 }}>Ad Spend</Box>
              </Box>
              {/* Card: Renda Diária */}
              <Box sx={{ background: '#151623', color: '#d32f2f', borderRadius: 5, boxShadow: '0 4px 32px 0 #69bec422', p: 3, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', minHeight: 100 }}>
                <Box sx={{ fontSize: 18, fontWeight: 700, mb: 1, letterSpacing: 1 }}>Impressions</Box>
                <Box sx={{ fontSize: 32, fontWeight: 900 }}>{summary.totalImpressions?.toLocaleString() || '0'}</Box>
                <Box sx={{ fontWeight: 700, fontSize: 16, color: '#d32f2f', letterSpacing: 1 }}>Total Reach</Box>
              </Box>
            </Box>
            {/* Gráfico principal destacado */}
            <Box sx={{ background: '#151623', borderRadius: 6, boxShadow: '0 4px 32px 0 #69bec422', p: { xs: 2, md: 4 }, mb: 2, color: cardText, width: '100%', maxWidth: '100%', display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'space-between', gap: 4 }}>
              <Box sx={{ flex: 2, minWidth: 0 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" sx={{ color: cardText, fontWeight: 800, fontSize: 20, letterSpacing: 0.2, textAlign: 'left', textShadow: whiteBg ? 'none' : '0 1px 4px #0006' }}>
                    Season Progress by Platform
                  </Typography>
                  <ToggleButtonGroup
                    value={selectedTimeframe}
                    exclusive
                    onChange={(event, newValue) => {
                      if (newValue !== null) {
                        setSelectedTimeframe(newValue);
                      }
                    }}
                    sx={{
                      '& .MuiToggleButton-root': {
                        color: '#69bec4',
                        borderColor: '#69bec4',
                        fontWeight: 600,
                        fontSize: 12,
                        px: 2,
                        py: 0.5,
                        background: '#151623',
                        '&.Mui-selected': {
                          background: '#69bec4',
                          color: '#23263a',
                          borderColor: '#69bec4',
                          '&:hover': {
                            background: '#69bec4',
                          }
                        },
                        '&:hover': {
                          background: '#23263a',
                          color: '#69bec4',
                        }
                      }
                    }}
                  >
                    <ToggleButton value="7days">7 Days</ToggleButton>
                    <ToggleButton value="30days">30 Days</ToggleButton>
                  </ToggleButtonGroup>
                </Box>
                <Box sx={{ height: { xs: selectedTimeframe === "30days" ? 200 : 180, md: selectedTimeframe === "30days" ? 280 : 240 }, width: '100%', maxWidth: '100%', mx: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ModernLineChart data={filteredSeasonData} whiteBg={whiteBg} height={selectedTimeframe === "30days" ? 280 : 240} />
                </Box>
              </Box>
              <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                <Typography variant="h6" sx={{ color: cardText, fontWeight: 700, fontSize: 16, mb: 1 }}>Platform Distribution</Typography>
                <PieChartComponent data={pieData} />
                <Box sx={{ 
                  mt: 2, 
                  p: 1.5, 
                  background: `linear-gradient(135deg, ${getPlatformColor(mostProfitablePlatform)}15 0%, #23263a 100%)`, 
                  borderRadius: 2, 
                  color: cardText, 
                  fontWeight: 500, 
                  fontSize: 14, 
                  textAlign: 'center', 
                  width: '100%', 
                  maxWidth: '100%', 
                  mx: 'auto', 
                  boxShadow: `0 1px 4px ${getPlatformColor(mostProfitablePlatform)}22`, 
                  transition: 'box-shadow 0.2s, background 0.2s',
                  border: `2px solid ${getPlatformColor(mostProfitablePlatform)}`,
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: `linear-gradient(90deg, ${getPlatformColor(mostProfitablePlatform)} 0%, transparent 100%)`,
                  }
                }}>
                  <span style={{ color: getPlatformColor(mostProfitablePlatform), fontWeight: 700, fontSize: 16 }}>💡</span> The most profitable platform {getTimeframeText()} was <span style={{ color: getPlatformColor(mostProfitablePlatform), fontWeight: 700 }}>{mostProfitablePlatform}</span> with ${getTotalRevenueForTimeframe().toLocaleString()} revenue!
                </Box>
              </Box>
            </Box>
            {/* Active Campaigns Section */}
            <Box sx={{ background: '#151623', borderRadius: 6, boxShadow: '0 4px 32px 0 #69bec422', p: { xs: 2, md: 4 }, mb: 2, color: cardText, width: '100%', maxWidth: '100%' }}>
              <Typography variant="h6" sx={{ mb: 3, color: cardText, fontWeight: 800, fontSize: 20, letterSpacing: 0.2, textAlign: 'left', textShadow: whiteBg ? 'none' : '0 1px 4px #0006' }}>
                Active Campaigns
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                {(dashboardCampaigns || []).map((campaign, index) => (
                  <Box key={index} sx={{ 
                    background: 'linear-gradient(135deg, #23263a 0%, #151623 100%)', 
                    borderRadius: 4, 
                    p: 3, 
                    border: '1px solid rgba(105,190,196,0.2)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 24px 0 #69bec433',
                    }
                  }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Typography variant="h6" sx={{ color: '#69bec4', fontWeight: 700, fontSize: 18 }}>
                        {campaign.name}
                      </Typography>
                      <Box sx={{ 
                        background: 'linear-gradient(90deg, #5edc1f 0%, #69bec4 100%)', 
                        color: '#23263a', 
                        px: 2, 
                        py: 0.5, 
                        borderRadius: 2, 
                        fontSize: 12, 
                        fontWeight: 700 
                      }}>
                        ROI: {(campaign.revenue / campaign.cost).toFixed(2)}x
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                      {campaign.platforms.map((platform, pIndex) => (
                        <Box key={pIndex} sx={{ 
                          background: 'rgba(105,190,196,0.1)', 
                          color: '#69bec4', 
                          px: 1.5, 
                          py: 0.5, 
                          borderRadius: 1, 
                          fontSize: 11, 
                          fontWeight: 600 
                        }}>
                          {platform}
                        </Box>
                      ))}
                    </Box>
                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, fontSize: 14 }}>
                      <Box>
                        <Typography sx={{ color: '#69bec4', fontSize: 12, mb: 0.5 }}>Revenue</Typography>
                        <Typography sx={{ color: '#5edc1f', fontWeight: 700 }}>${campaign.revenue.toLocaleString()}</Typography>
                      </Box>
                      <Box>
                        <Typography sx={{ color: '#69bec4', fontSize: 12, mb: 0.5 }}>Cost</Typography>
                        <Typography sx={{ color: '#d32f2f', fontWeight: 700 }}>${campaign.cost.toLocaleString()}</Typography>
                      </Box>
                      <Box>
                        <Typography sx={{ color: '#69bec4', fontSize: 12, mb: 0.5 }}>Impressions</Typography>
                        <Typography sx={{ color: '#fff', fontWeight: 600 }}>{campaign.impressions.toLocaleString()}</Typography>
                      </Box>
                      <Box>
                        <Typography sx={{ color: '#69bec4', fontSize: 12, mb: 0.5 }}>Conversions</Typography>
                        <Typography sx={{ color: '#fff', fontWeight: 600 }}>{campaign.conversions}</Typography>
                      </Box>
                    </Box>
                    <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid rgba(105,190,196,0.2)' }}>
                      <Typography sx={{ color: '#69bec4', fontSize: 11 }}>
                        {campaign.startDate} - {campaign.endDate}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
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
            </Box>
          </motion.div>
        )}
        {view === "profile" && (
          <motion.div
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -200 }}
            transition={{ duration: 0.7, ease: "anticipate" }}
            style={{ height: "100%" }}
          >
            <Profile />
          </motion.div>
        )}
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
            Create New Campaign
          </DialogTitle>
          <DialogContent sx={{ minWidth: 340, p: 2 }}>
            <TextField
              autoFocus
              margin="dense"
              label="Campaign Name"
              type="text"
              fullWidth
              variant="outlined"
              value={campaignName}
              onChange={e => setCampaignName(e.target.value)}
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="platform-label">Platform</InputLabel>
              <Select
                labelId="platform-label"
                value={platform}
                label="Platform"
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
              label="Investment Value"
              type="number"
              fullWidth
              variant="outlined"
              value={investment}
              onChange={e => setInvestment(e.target.value)}
              inputProps={{ min: 0 }}
            />
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
          <Button onClick={handleDialogClose} color="secondary" sx={{ fontWeight: 600, px: 3 }}>Cancel</Button>
          <Button onClick={handleDialogSave} color="primary" variant="contained" sx={{ fontWeight: 700, px: 3, background: 'linear-gradient(90deg, #5edc1f 0%, #3bbf1f 100%)', color: '#181a20', '&:hover': { background: 'linear-gradient(90deg, #3bbf1f 0%, #5edc1f 100%)', color: '#fff' } }}>Save</Button>
        </DialogActions>
      </Dialog>
      {/* Floating PDF Export Button - moved outside main content for correct positioning */}
      {/* Floating PDF Export Button - moved outside main content for correct positioning */}
    </Box>
  );
}