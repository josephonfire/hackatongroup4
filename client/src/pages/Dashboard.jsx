import React, { useState, useEffect, useRef } from "react";
import PieChartComponent from "../components/PieChart";
import ExportPDF from "../components/ExportPDF";
import Profile from "../components/Profile";
import {
  Box,
  Typography,
  Button,
  CssBaseline,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Menu,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ModernLineChart from "../components/ModernLineChart";
import ModernSidebar from "../components/ModernSidebar";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
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
  const [connectedSocials, setConnectedSocials] = useState([
    "Instagram",
    "Facebook",
    "TikTok",
    "LinkedIn",
    "X",
  ]); // All connected by default
  const [pieData, setPieData] = useState([]);
  const [seasonData7Days, setSeasonData7Days] = useState([]);
  const [seasonData30Days, setSeasonData30Days] = useState([]);
  const [selectedTimeframe, setSelectedTimeframe] = useState("7days");
  const [summary, setSummary] = useState({});
  const [platforms, setPlatforms] = useState([]);
  const [dashboardCampaigns, setDashboardCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMetric, setSelectedMetric] = useState("revenue");
  // Mover para o topo
  const [selectedCampaignPlatform, setSelectedCampaignPlatform] =
    useState("all");
  const campaignPlatformOptions = [
    { value: "all", label: "All" },
    { value: "Instagram", label: "Instagram" },
    { value: "Facebook", label: "Facebook" },
    { value: "TikTok", label: "TikTok" },
    { value: "LinkedIn", label: "LinkedIn" },
    { value: "X", label: "X" },
  ];
  const filteredCampaigns =
    selectedCampaignPlatform === "all"
      ? dashboardCampaigns
      : dashboardCampaigns.filter((camp) =>
          camp.platforms.includes(selectedCampaignPlatform)
        );

  const handleAddCampaign = () => {
    setDialogOpen(true);
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

  const pageBg = whiteBg ? "#f5f6fa" : "#33363D";
  const pageText = whiteBg ? "#222e3c" : "#5edc1f";
  const sidebarBg = "#23263a";
  const sidebarText = whiteBg ? "#fff" : "#fff";
  const cardBg = whiteBg ? "#fff" : "#151623";
  const cardText = whiteBg ? "#222e3c" : "#69bec4";
  const cardShadow = whiteBg ? "0 2px 12px #0001" : "0 2px 12px #0008";

  // Adicionar função getPlatformColor
  const getPlatformColor = (platform) => {
    const colors = {
      Instagram: "#e1306c",
      Facebook: "#0047ab",
      TikTok: "#FFD600",
      LinkedIn: "#0096ff",
      X: "#000000",
    };
    return colors[platform] || "#69bec4";
  };

  useEffect(() => {
    setSelectedCampaign("");
    setLoading(true);
    setError(null);
    fetch("http://localhost:3031/api/dashboard-data")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch dashboard data");
        }
        return res.json();
      })
      .then((data) => {
        console.log("DADOS DO BACKEND:", data);
        setPieData(data.pieData || []);
        setSeasonData7Days(data.seasonData7Days || []);
        setSeasonData30Days(data.seasonData30Days || []);
        setSummary(data.summary || {});
        setPlatforms(data.platforms || []);
        setDashboardCampaigns(data.campaigns || []);
        setLoading(false);
      })
      .catch((err) => {
        // Trate o erro, se necessário
        console.error("Erro ao buscar dados do dashboard:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Proteção extra para selectedTimeframe
  const safeTimeframe = ["7days", "30days"].includes(selectedTimeframe)
    ? selectedTimeframe
    : "7days";
  const currentSeasonData =
    safeTimeframe === "7days" ? seasonData7Days : seasonData30Days;

  // Normalizar nomes das plataformas para evitar erro de filtro
  const normalize = (str) =>
    (str || "").toLowerCase().replace(/[^a-z0-9]/gi, "");
  const normalizedSocials = (connectedSocials || []).map(normalize);

  const filteredPieData = pieData || [];
  const filteredSeasonData = currentSeasonData || [];

  // Log para depuração
  console.log("DADOS PARA O GRÁFICO:", filteredSeasonData);

  // Substituir cálculo de totals e mostProfitablePlatform para considerar apenas revenue
  const revenueTotals = filteredSeasonData.reduce((acc, cur) => {
    Object.keys(cur).forEach((key) => {
      if (key !== "day" && cur[key] && typeof cur[key].revenue === "number") {
        acc[key] = (acc[key] || 0) + cur[key].revenue;
      }
    });
    return acc;
  }, {});

  const mostProfitablePlatform =
    Object.entries(revenueTotals).length > 0
      ? Object.entries(revenueTotals).sort((a, b) => b[1] - a[1])[0][0]
      : "";

  // Corrigir getTotalRevenueForTimeframe para considerar apenas revenue da plataforma mais rentável
  const getTotalRevenueForTimeframe = () => {
    if (!mostProfitablePlatform) return 0;
    return filteredSeasonData.reduce((total, day) => {
      if (
        day[mostProfitablePlatform] &&
        typeof day[mostProfitablePlatform].revenue === "number"
      ) {
        total += day[mostProfitablePlatform].revenue;
      }
      return total;
    }, 0);
  };

  // Get timeframe display text
  const getTimeframeText = () => {
    return selectedTimeframe === "7days" ? "this week" : "this month";
  };

  // Lista de métricas disponíveis
  const metricOptions = [
    { value: "revenue", label: "Revenue" },
    { value: "clicks", label: "Total Clicks" },
    { value: "impressions", label: "Impressions" },
    { value: "cost", label: "Cost" },
    { value: "cpc", label: "Cost Per Click" },
    { value: "roas", label: "ROAS" },
  ];

  // Função para transformar os dados para o gráfico de acordo com a métrica selecionada
  function getChartDataByMetric(seasonData, metric) {
    return seasonData.map((dayObj) => {
      const newObj = { day: dayObj.day };
      Object.keys(dayObj).forEach((key) => {
        if (key !== "day") {
          newObj[key] = dayObj[key][metric];
        }
      });
      return newObj;
    });
  }

  const chartData = getChartDataByMetric(
    safeTimeframe === "7days" ? seasonData7Days : seasonData30Days,
    selectedMetric
  );

  // Loading component
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h6" sx={{ color: "#69bec4" }}>
          Loading dashboard data...
        </Typography>
      </Box>
    );
  }

  // Error component
  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h6" sx={{ color: "#d32f2f" }}>
          Error: {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      className="dashboard-page"
      sx={{
        minHeight: "100vh",
        height: "100vh",
        background:
          view === "profile"
            ? "#151623"
            : "linear-gradient(135deg, #23263a 0%, #33363D 60%, #69bec4 100%)",
        color: cardText,
        transition: "background 0.3s, color 0.3s",
        overflowY: "auto", // Permite scroll vertical
        display: "flex",
      }}
    >
      <CssBaseline />
      <ModernSidebar
        view={view}
        setView={setView}
        dashboardRef={dashboardRef}
      />
      <Box
        component="main"
        ref={dashboardRef}
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 4 },
          color: pageText,
          minHeight: "100vh",
          maxHeight: "100vh",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {view === "dashboard" && (
          <motion.div
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -200 }}
            transition={{ duration: 0.7, ease: "anticipate" }}
            style={{ height: "100%" }}
          >
            {/* Grid principal */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "2fr 1fr 1fr" },
                gridTemplateRows: { xs: "auto", md: "1fr 1fr" },
                gap: 3,
                mb: 2,
                width: "100%",
              }}
            >
              {/* Card maior: Receita */}
              <Box
                sx={{
                  gridColumn: { md: "1/2" },
                  gridRow: { md: "1/3" },
                  background:
                    "linear-gradient(120deg, #69bec4 0%, #3a5c7c 100%)",
                  color: "#23263a",
                  borderRadius: 5,
                  boxShadow: "0 4px 32px 0 #69bec422",
                  p: 4,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: 220,
                }}
              >
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
                >
                  <span
                    style={{ fontSize: 32, fontWeight: 900, letterSpacing: 1 }}
                  >
                    Total Revenue
                  </span>
                </Box>
                <Box
                  sx={{
                    fontSize: 44,
                    fontWeight: 900,
                    mb: 1,
                    letterSpacing: 1.5,
                  }}
                >
                  ${summary.totalRevenue?.toLocaleString() || "0"}
                </Box>
                <Box
                  sx={{
                    fontWeight: 700,
                    fontSize: 18,
                    color: "#5edc1f",
                    letterSpacing: 1,
                  }}
                >
                  ROI: {summary.roi?.toFixed(2)}x
                </Box>
                <Box
                  sx={{ mt: 1, fontSize: 16, color: "#23263a", opacity: 0.8 }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      mb: 1,
                    }}
                  >
                    <span style={{ fontSize: 16, fontWeight: 600 }}>
                      Investment:
                    </span>
                    <span
                      style={{
                        fontWeight: 700,
                        fontSize: 18,
                        color: "#5edc1f",
                      }}
                    >
                      ${summary.totalCost?.toLocaleString() || "0"}
                    </span>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontSize: 16, fontWeight: 600 }}>
                      Profit:
                    </span>
                    <span
                      style={{
                        fontWeight: 700,
                        color: "#5edc1f",
                        fontSize: 18,
                      }}
                    >
                      $
                      {(
                        summary.totalRevenue - summary.totalCost
                      )?.toLocaleString() || "0"}
                    </span>
                  </Box>
                </Box>
                <Box
                  sx={{
                    mt: 2,
                    fontSize: 18,
                    color: "#23263a",
                    opacity: 0.7,
                    textAlign: "center",
                  }}
                >
                  Best Platform:{" "}
                  <span
                    style={{
                      color: getPlatformColor(summary.bestPlatform),
                      fontWeight: 700,
                      fontSize: 22,
                    }}
                  >
                    {summary.bestPlatform}
                  </span>
                </Box>
              </Box>
              {/* Card: Crescimento */}
              <Box
                sx={{
                  background: "#151623",
                  color: "#69bec4",
                  borderRadius: 5,
                  boxShadow: "0 4px 32px 0 #69bec422",
                  p: 3,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "center",
                  minHeight: 100,
                }}
              >
                <Box
                  sx={{
                    fontSize: 18,
                    fontWeight: 700,
                    mb: 1,
                    letterSpacing: 1,
                  }}
                >
                  Total Clicks
                </Box>
                <Box sx={{ fontSize: 32, fontWeight: 900 }}>
                  {summary.totalClicks?.toLocaleString() || "0"}
                </Box>
                <Box
                  sx={{
                    fontWeight: 700,
                    fontSize: 16,
                    color: "#5edc1f",
                    letterSpacing: 1,
                  }}
                >
                  {summary.totalConversions} conversions
                </Box>
              </Box>
              {/* Card: Despesas */}
              <Box
                sx={{
                  background: "#151623",
                  color: "#69bec4",
                  borderRadius: 5,
                  boxShadow: "0 4px 32px 0 #69bec422",
                  p: 3,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "center",
                  minHeight: 100,
                }}
              >
                <Box
                  sx={{
                    fontSize: 18,
                    fontWeight: 700,
                    mb: 1,
                    letterSpacing: 1,
                  }}
                >
                  Total Cost
                </Box>
                <Box sx={{ fontSize: 32, fontWeight: 900 }}>
                  ${summary.totalCost?.toLocaleString() || "0"}
                </Box>
                <Box
                  sx={{
                    fontWeight: 700,
                    fontSize: 16,
                    color: "#5edc1f",
                    letterSpacing: 1,
                  }}
                >
                  Ad Spend
                </Box>
              </Box>
              {/* Card: Renda Diária */}
              <Box
                sx={{
                  background: "#151623",
                  color: "#69bec4",
                  borderRadius: 5,
                  boxShadow: "0 4px 32px 0 #69bec422",
                  p: 3,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "center",
                  minHeight: 100,
                }}
              >
                <Box
                  sx={{
                    fontSize: 18,
                    fontWeight: 700,
                    mb: 1,
                    letterSpacing: 1,
                  }}
                >
                  Impressions
                </Box>
                <Box sx={{ fontSize: 32, fontWeight: 900 }}>
                  {summary.totalImpressions?.toLocaleString() || "0"}
                </Box>
                <Box
                  sx={{
                    fontWeight: 700,
                    fontSize: 16,
                    color: "#5edc1f",
                    letterSpacing: 1,
                  }}
                >
                  Total Reach
                </Box>
              </Box>
              {/* Botão Export PDF no espaço vazio do grid */}
              <Box
                className="pdf-hide"
                sx={{
                  display: { xs: "none", md: "flex" },
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: 100,
                }}
              >
                <ExportPDF
                  exportRef={dashboardRef}
                  fileName="dashboard.pdf"
                  customButton={
                    <Button
                      variant="contained"
                      startIcon={
                        <PictureAsPdfIcon
                          sx={{ fontSize: 28, color: "#69bec4" }}
                        />
                      }
                      sx={{
                        background: "#151623",
                        color: "#69bec4",
                        fontWeight: 900,
                        fontSize: 20,
                        borderRadius: 4,
                        px: 4,
                        py: 2.2,
                        border: "2.5px solid #69bec4",
                        boxShadow:
                          "0 6px 32px 0 #69bec488, 0 1.5px 8px 0 #69bec4aa",
                        textTransform: "none",
                        letterSpacing: 1.2,
                        position: "relative",
                        overflow: "hidden",
                        transition: "all 0.25s cubic-bezier(.4,2,.3,1)",
                        "&:hover": {
                          background: "#23263a",
                          color: "#fff",
                          borderColor: "#69bec4",
                          boxShadow:
                            "0 10px 40px 0 #69bec4cc, 0 2px 12px 0 #69bec4aa",
                          transform: "scale(1.045)",
                        },
                      }}
                    >
                      Export PDF
                    </Button>
                  }
                />
              </Box>
            </Box>
            {/* Gráfico principal destacado */}
            <Box
              sx={{
                background: "#151623",
                borderRadius: 6,
                boxShadow: "0 4px 32px 0 #69bec422",
                p: { xs: 2, md: 4 },
                mb: 1,
                color: cardText,
                width: "100%",
                maxWidth: "100%",
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: "center",
                justifyContent: "space-between",
                gap: 1,
              }}
            >
              <Box sx={{ flex: 2, minWidth: 0 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                    gap: 2,
                    flexWrap: "wrap",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: cardText,
                      fontWeight: 800,
                      fontSize: 20,
                      letterSpacing: 0.2,
                      textAlign: "left",
                      textShadow: whiteBg ? "none" : "0 1px 4px #0006",
                      fontFamily: "Inter",
                    }}
                  >
                    Season Progress by Platform
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <ToggleButtonGroup
                      value={selectedTimeframe}
                      exclusive
                      onChange={(event, newValue) => {
                        if (newValue !== null) {
                          setSelectedTimeframe(newValue);
                        }
                      }}
                      sx={{
                        "& .MuiToggleButton-root": {
                          color: "#69bec4",
                          borderColor: "#69bec4",
                          fontWeight: 600,
                          fontSize: 12,
                          px: 2,
                          py: 0.5,
                          background: "#151623",
                          "&.Mui-selected": {
                            background: "#69bec4",
                            color: "#23263a",
                            borderColor: "#69bec4",
                            "&:hover": {
                              background: "#69bec4",
                            },
                          },
                          "&:hover": {
                            background: "#23263a",
                            color: "#69bec4",
                          },
                        },
                      }}
                    >
                      <ToggleButton value="7days">7 Days</ToggleButton>
                      <ToggleButton value="30days">30 Days</ToggleButton>
                    </ToggleButtonGroup>
                    <ToggleButtonGroup
                      value={selectedMetric}
                      exclusive
                      onChange={(event, newValue) => {
                        if (newValue !== null) {
                          setSelectedMetric(newValue);
                        }
                      }}
                      sx={{
                        "& .MuiToggleButton-root": {
                          color: "#69bec4",
                          borderColor: "#69bec4",
                          fontWeight: 600,
                          fontSize: 12,
                          px: 2,
                          py: 0.5,
                          background: "#151623",
                          "&.Mui-selected": {
                            background: "#69bec4",
                            color: "#23263a",
                            borderColor: "#69bec4",
                            "&:hover": {
                              background: "#69bec4",
                            },
                          },
                          "&:hover": {
                            background: "#23263a",
                            color: "#69bec4",
                          },
                        },
                      }}
                    >
                      {metricOptions.map((opt) => (
                        <ToggleButton key={opt.value} value={opt.value}>
                          {opt.label}
                        </ToggleButton>
                      ))}
                    </ToggleButtonGroup>
                  </Box>
                </Box>
                <Box
                  sx={{
                    height: {
                      xs: selectedTimeframe === "30days" ? 200 : 180,
                      md: selectedTimeframe === "30days" ? 280 : 240,
                    },
                    width: "100%",
                    maxWidth: "100%",
                    mx: "auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ModernLineChart
                    data={chartData}
                    whiteBg={whiteBg}
                    height={selectedTimeframe === "30days" ? 280 : 240}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  flex: 1,
                  minWidth: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: cardText,
                    fontWeight: 700,
                    fontSize: 16,
                    mb: 1,
                    fontFamily: "Inter",
                  }}
                >
                  Platform Distribution
                </Typography>
                <PieChartComponent data={pieData} />
                <Box
                  sx={{
                    mt: 1,
                    p: 1.5,
                    background: `linear-gradient(135deg, ${getPlatformColor(
                      mostProfitablePlatform
                    )}15 0%, #23263a 100%)`,
                    borderRadius: 2,
                    color: cardText,
                    fontWeight: 500,
                    fontSize: 14,
                    textAlign: "center",
                    width: "100%",
                    maxWidth: "100%",
                    mx: "auto",
                    boxShadow: `0 1px 4px ${getPlatformColor(
                      mostProfitablePlatform
                    )}22`,
                    transition: "box-shadow 0.2s, background 0.2s",
                    border: `2px solid ${getPlatformColor(
                      mostProfitablePlatform
                    )}`,
                    position: "relative",
                    overflow: "hidden",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "2px",
                      background: `linear-gradient(90deg, ${getPlatformColor(
                        mostProfitablePlatform
                      )} 0%, transparent 100%)`,
                    },
                  }}
                >
                  <span
                    style={{
                      color: getPlatformColor(mostProfitablePlatform),
                      fontWeight: 700,
                      fontSize: 16,
                    }}
                  >
                    💡
                  </span>{" "}
                  The most profitable platform {getTimeframeText()} was{" "}
                  <span
                    style={{
                      color: getPlatformColor(mostProfitablePlatform),
                      fontWeight: 700,
                    }}
                  >
                    {mostProfitablePlatform}
                  </span>{" "}
                  with ${getTotalRevenueForTimeframe().toLocaleString()}{" "}
                  revenue!
                </Box>
              </Box>
            </Box>
            {/* Active Campaigns Section */}
            <Box
              sx={{
                background: "#151623",
                borderRadius: 6,
                boxShadow: "0 4px 32px 0 #69bec422",
                p: { xs: 2, md: 4 },
                mb: 2,
                color: cardText,
                width: "100%",
                maxWidth: "100%",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  mb: 3,
                  color: cardText,
                  fontWeight: 800,
                  fontSize: 20,
                  letterSpacing: 0.2,
                  textAlign: "left",
                  textShadow: whiteBg ? "none" : "0 1px 4px #0006",
                  fontFamily: "Inter",
                }}
              >
                Active Campaigns
              </Typography>
              <ToggleButtonGroup
                value={selectedCampaignPlatform}
                exclusive
                onChange={(event, newValue) => {
                  if (newValue !== null) setSelectedCampaignPlatform(newValue);
                }}
                sx={{
                  mb: 2,
                  "& .MuiToggleButton-root": {
                    color: "#69bec4",
                    borderColor: "#69bec4",
                    fontWeight: 600,
                    fontSize: 12,
                    px: 2,
                    py: 0.5,
                    background: "#151623",
                    "&.Mui-selected": {
                      background: "#69bec4",
                      color: "#23263a",
                      borderColor: "#69bec4",
                      "&:hover": { background: "#69bec4" },
                    },
                    "&:hover": { background: "#23263a", color: "#69bec4" },
                  },
                }}
              >
                {campaignPlatformOptions.map((opt) => (
                  <ToggleButton key={opt.value} value={opt.value}>
                    {opt.label}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                  gap: 3,
                }}
              >
                {(filteredCampaigns || []).map((campaign, index) => {
                  // Corrigir busca dos dados da plataforma selecionada
                  let stats = null;
                  if (selectedCampaignPlatform !== "all") {
                    // Corrigir para buscar a plataforma com case-insensitive
                    const platformKey = campaign.platforms.find(
                      (p) =>
                        p.toLowerCase() ===
                        selectedCampaignPlatform.toLowerCase()
                    );
                    if (platformKey && campaign[platformKey]) {
                      stats = campaign[platformKey];
                    }
                  }
                  return (
                    <Box
                      key={index}
                      sx={{
                        background:
                          "linear-gradient(135deg, #23263a 0%, #151623 100%)",
                        borderRadius: 4,
                        p: 3,
                        border: "1px solid rgba(105,190,196,0.2)",
                        transition: "transform 0.2s, box-shadow 0.2s",
                        "&:hover": {
                          transform: "translateY(-2px)",
                          boxShadow: "0 8px 24px 0 #69bec433",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          mb: 2,
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            color: "#69bec4",
                            fontWeight: 700,
                            fontSize: 18,
                          }}
                        >
                          {campaign.name}
                        </Typography>
                        <Box
                          sx={{
                            background:
                              "linear-gradient(90deg, #5edc1f 0%, #69bec4 100%)",
                            color: "#23263a",
                            px: 2,
                            py: 0.5,
                            borderRadius: 2,
                            fontSize: 12,
                            fontWeight: 700,
                          }}
                        >
                          ROI:{" "}
                          {selectedCampaignPlatform !== "all" &&
                          stats &&
                          stats.cost > 0
                            ? (stats.revenue / stats.cost).toFixed(2)
                            : (campaign.revenue / campaign.cost).toFixed(2)}
                          x
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 1,
                          mb: 2,
                        }}
                      >
                        {campaign.platforms.map((platform, pIndex) => (
                          <Box
                            key={pIndex}
                            sx={{
                              background: "rgba(105,190,196,0.1)",
                              color: "#69bec4",
                              px: 1.5,
                              py: 0.5,
                              borderRadius: 1,
                              fontSize: 11,
                              fontWeight: 600,
                            }}
                          >
                            {platform}
                          </Box>
                        ))}
                      </Box>
                      <Box
                        sx={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          gap: 2,
                          fontSize: 14,
                        }}
                      >
                        <Box>
                          <Typography
                            sx={{ color: "#69bec4", fontSize: 12, mb: 0.5 }}
                          >
                            Revenue
                          </Typography>
                          <Typography
                            sx={{ color: "#5edc1f", fontWeight: 700 }}
                          >
                            {selectedCampaignPlatform !== "all" &&
                            stats &&
                            typeof stats.revenue === "number"
                              ? `$${stats.revenue.toLocaleString()}`
                              : `$${campaign.revenue?.toLocaleString() || 0}`}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography
                            sx={{ color: "#69bec4", fontSize: 12, mb: 0.5 }}
                          >
                            Cost
                          </Typography>
                          <Typography
                            sx={{ color: "#d32f2f", fontWeight: 700 }}
                          >
                            {selectedCampaignPlatform !== "all" &&
                            stats &&
                            typeof stats.cost === "number"
                              ? `$${stats.cost.toLocaleString()}`
                              : `$${campaign.cost?.toLocaleString() || 0}`}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography
                            sx={{ color: "#69bec4", fontSize: 12, mb: 0.5 }}
                          >
                            Impressions
                          </Typography>
                          <Typography sx={{ color: "#fff", fontWeight: 600 }}>
                            {selectedCampaignPlatform !== "all" &&
                            stats &&
                            typeof stats.impressions === "number"
                              ? stats.impressions.toLocaleString()
                              : campaign.impressions?.toLocaleString() || 0}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography
                            sx={{ color: "#69bec4", fontSize: 12, mb: 0.5 }}
                          >
                            Conversions
                          </Typography>
                          <Typography sx={{ color: "#fff", fontWeight: 600 }}>
                            {selectedCampaignPlatform !== "all" &&
                            stats &&
                            typeof stats.conversions === "number"
                              ? stats.conversions.toLocaleString()
                              : campaign.conversions?.toLocaleString() || 0}
                          </Typography>
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          mt: 2,
                          pt: 2,
                          borderTop: "1px solid rgba(105,190,196,0.2)",
                        }}
                      >
                        <Typography sx={{ color: "#69bec4", fontSize: 11 }}>
                          {campaign.startDate} - {campaign.endDate}
                        </Typography>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </Box>
            {/* Botões flutuantes no canto inferior direito */}
            <Box
              className="pdf-hide"
              sx={{
                position: "fixed",
                bottom: 32,
                right: 32,
                zIndex: 1300,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: 2,
              }}
            >
              <Button
                onClick={handleAddCampaign}
                sx={{
                  borderRadius: "50%",
                  width: 64,
                  height: 64,
                  background:
                    "linear-gradient(120deg, #69bec4 0%, #3a5c7c 100%)",
                  color: "#23263a",
                  boxShadow: "0 8px 32px 0 #69bec4cc",
                  fontWeight: 900,
                  fontSize: 32,
                  minWidth: 0,
                  p: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 2,
                  transition:
                    "background 0.3s, box-shadow 0.3s, color 0.3s, transform 0.3s",
                  "&:hover": {
                    background:
                      "linear-gradient(120deg, #3a5c7c 0%, #69bec4 100%)",
                    color: "#23263a",
                    boxShadow: "0 12px 40px 0 #69bec4ee",
                    transform: "scale(1.08)",
                  },
                }}
              >
                <AddIcon sx={{ color: "#23263a", fontSize: 36 }} />
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
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        PaperProps={{ sx: { borderRadius: 4, p: 1 } }}
      >
        <DialogTitle
          sx={{
            fontWeight: 700,
            fontSize: 20,
            color: "#3a5c7c",
            textAlign: "center",
            letterSpacing: 0.5,
          }}
        >
          New Campaign
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
            onChange={(e) => setCampaignName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="platform-label">Platform</InputLabel>
            <Select
              labelId="platform-label"
              value={platform}
              label="Platform"
              onChange={(e) => setPlatform(e.target.value)}
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
            onChange={(e) => setInvestment(e.target.value)}
            inputProps={{ min: 0 }}
          />
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
          <Button
            onClick={handleDialogClose}
            sx={{
              fontWeight: 600,
              px: 3,
              color: "#69bec4",
              "&:hover": { color: "#d32f2f" },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDialogSave}
            variant="contained"
            sx={{
              fontWeight: 700,
              px: 3,
              background: "linear-gradient(120deg, #69bec4 0%, #3a5c7c 100%)",
              color: "#23263a",
              "&:hover": {
                background: "linear-gradient(120deg, #3a5c7c 0%, #69bec4 100%)",
                color: "#23263a",
              },
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
