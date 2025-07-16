import React from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Divider, Box } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import PieChartIcon from "@mui/icons-material/PieChart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TimelineIcon from "@mui/icons-material/Timeline";
import MenuIcon from "@mui/icons-material/Menu";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function ModernSidebar({ view, setView, dashboardRef }) {
  const [open, setOpen] = React.useState(true);

  const menuItems = [
    { text: "Profile", icon: <AccountCircleIcon />, view: "profile" },
    { text: "Dashboard", icon: <DashboardIcon />, view: "dashboard" },
  ];

  const handlePdfExport = async () => {
    try {
      // Find the main dashboard content element
      const dashboardElement = document.querySelector('.dashboard-page');
      if (!dashboardElement) {
        console.error('Dashboard element not found');
        return;
      }

      // Create a temporary container for the PDF
      const tempContainer = document.createElement('div');
      tempContainer.style.position = 'absolute';
      tempContainer.style.left = '-9999px';
      tempContainer.style.top = '0';
      tempContainer.style.width = '1600px'; // Much wider for better spacing
      tempContainer.style.background = '#23263a';
      tempContainer.style.padding = '60px'; // Much more padding
      tempContainer.style.color = '#e0e0e0';
      tempContainer.style.fontSize = '16px'; // Larger font size
      tempContainer.style.lineHeight = '1.6'; // Better line spacing
      document.body.appendChild(tempContainer);

      // Clone the dashboard content
      const dashboardClone = dashboardElement.cloneNode(true);
      
      // Remove the sidebar from the clone
      const sidebarClone = dashboardClone.querySelector('.MuiDrawer-root');
      if (sidebarClone) {
        sidebarClone.remove();
      }

      // Add better spacing for PDF layout
      const mainContent = dashboardClone.querySelector('main');
      if (mainContent) {
        mainContent.style.padding = '40px';
        mainContent.style.margin = '0';
        mainContent.style.gap = '48px';
      }

      // Improve chart container spacing
      const chartContainers = dashboardClone.querySelectorAll('[style*="background"]');
      chartContainers.forEach(container => {
        if (container.style.background && container.style.background.includes('#151623')) {
          container.style.marginBottom = '48px';
          container.style.padding = '48px';
          container.style.borderRadius = '16px';
        }
      });

      // Add spacing to grid layouts
      const gridContainers = dashboardClone.querySelectorAll('[style*="display: grid"]');
      gridContainers.forEach(grid => {
        grid.style.gap = '32px';
        grid.style.marginBottom = '48px';
      });

      // Increase spacing between summary cards
      const summaryCards = dashboardClone.querySelectorAll('[style*="background: linear-gradient"]');
      summaryCards.forEach(card => {
        card.style.marginBottom = '32px';
        card.style.padding = '32px';
      });

      // Remove floating buttons from the clone
      const floatingButtons = dashboardClone.querySelectorAll('[style*="position: fixed"]');
      floatingButtons.forEach(button => button.remove());

      // Remove the timeframe toggle buttons from the clone
      const toggleButtons = dashboardClone.querySelectorAll('.MuiToggleButtonGroup-root');
      toggleButtons.forEach(button => button.remove());

      // Remove platform tags from campaign cards
      const platformTags = dashboardClone.querySelectorAll('[style*="background: rgba(105,190,196,0.1)"]');
      platformTags.forEach(tag => tag.remove());

      // Also remove any remaining platform tags by looking for the specific structure
      const campaignCards = dashboardClone.querySelectorAll('[style*="display: flex"][style*="flexWrap: wrap"]');
      campaignCards.forEach(card => {
        const tags = card.querySelectorAll('div[style*="background: rgba(105,190,196,0.1)"]');
        tags.forEach(tag => tag.remove());
      });

      // Remove platform percentage labels (like "Facebook 23%")
      const percentageLabels = dashboardClone.querySelectorAll('text, span, div, tspan');
      percentageLabels.forEach(label => {
        if (label.textContent && label.textContent.match(/^(Facebook|Instagram|TikTok|LinkedIn|X)\s+\d+%$/)) {
          label.remove();
        }
      });

      // Remove pie chart labels (platform names with percentages)
      const pieChartLabels = dashboardClone.querySelectorAll('svg text');
      pieChartLabels.forEach(label => {
        if (label.textContent && label.textContent.match(/^(Facebook|Instagram|TikTok|LinkedIn|X)\s+\d+%$/)) {
          label.remove();
        }
      });

      // Also remove any remaining SVG text elements that might contain platform percentages
      const svgTexts = dashboardClone.querySelectorAll('svg tspan');
      svgTexts.forEach(text => {
        if (text.textContent && text.textContent.match(/^(Facebook|Instagram|TikTok|LinkedIn|X)\s+\d+%$/)) {
          text.remove();
        }
      });

      tempContainer.appendChild(dashboardClone);

      // Capture the content
      const canvas = await html2canvas(tempContainer, { 
        scale: 2,
        backgroundColor: '#23263a',
        width: 1600,
        height: dashboardElement.scrollHeight * 1.2, // Increase height for better spacing
        useCORS: true,
        allowTaint: true,
        scrollX: 0,
        scrollY: 0,
        logging: false
      });

      // Clean up
      document.body.removeChild(tempContainer);

      // Create PDF
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const imgAspect = imgWidth / imgHeight;
      const pageAspect = pageWidth / pageHeight;

      let renderWidth, renderHeight, x, y;
      if (imgAspect > pageAspect) {
        renderWidth = pageWidth;
        renderHeight = pageWidth / imgAspect;
        x = 0;
        y = (pageHeight - renderHeight) / 2;
      } else {
        renderHeight = pageHeight;
        renderWidth = pageHeight * imgAspect;
        x = (pageWidth - renderWidth) / 2;
        y = 0;
      }

      pdf.addImage(imgData, 'PNG', x, y, renderWidth, renderHeight);
      pdf.save('dashboard-report.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        width: open ? 220 : 64,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? 220 : 64,
          boxSizing: 'border-box',
          background: '#23263a !important',
          color: '#e0e0e0',
          borderRight: 'none',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          height: '100vh',
          overflow: 'hidden',
          transform: open ? 'translateX(0)' : 'translateX(0)',
          boxShadow: open ? '2px 0 8px rgba(0,0,0,0.3)' : '1px 0 4px rgba(0,0,0,0.2)',
        },
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        height: 60, 
        px: 2, 
        py: 0, 
        mt: 0,
        transition: 'all 0.3s ease-in-out'
      }}>
        <IconButton 
          onClick={() => setOpen(!open)} 
          sx={{ 
            color: "#b0b3b8", 
            p: 1, 
            mr: open ? 1 : 0,
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              color: '#69bec4',
              transform: 'scale(1.1)',
            }
          }}
        >
          <MenuIcon fontSize="medium" />
        </IconButton>
        <Box sx={{
          overflow: 'hidden',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          opacity: open ? 1 : 0,
          transform: open ? 'translateX(0)' : 'translateX(-20px)',
          width: open ? 'auto' : 0,
        }}>
          <span style={{ 
            fontWeight: 700, 
            fontSize: 20, 
            marginLeft: 4, 
            lineHeight: 1, 
            color: '#e0e0e0', 
            letterSpacing: 1,
            whiteSpace: 'nowrap'
          }}>
            AdCharter
          </span>
        </Box>
      </Box>
      <Divider sx={{ background: "#292d36" }} />
      <List sx={{ mt: 2 }}>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            selected={view === item.view}
            onClick={() => setView(item.view)}
            sx={{
              borderRadius: 2.5,
              margin: '10px 12px',
              px: 2,
              py: 1.2,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&.Mui-selected': {
                background: '#23263a !important',
                color: '#fff',
                boxShadow: '0 2px 12px 0 #0002',
                transform: 'translateX(4px)',
              },
              '&:hover': {
                background: '#2e323c',
                color: '#fff',
                boxShadow: '0 2px 8px 0 #0001',
                transform: 'translateX(2px)',
              },
            }}
          >
            <ListItemIcon sx={{ 
              color: 'inherit', 
              minWidth: 36,
              transition: 'all 0.3s ease-in-out'
            }}>
              {item.icon}
            </ListItemIcon>
            <Box sx={{
              overflow: 'hidden',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              opacity: open ? 1 : 0,
              transform: open ? 'translateX(0)' : 'translateX(-10px)',
              width: open ? 'auto' : 0,
            }}>
              {open && <ListItemText primary={item.text} sx={{ fontWeight: 500, letterSpacing: 0.5 }} />}
            </Box>
          </ListItem>
        ))}
        {/* PDF Export Button - only show when dashboard is open */}
        {view === "dashboard" && (
          <ListItem
            button
            onClick={handlePdfExport}
            sx={{
              borderRadius: 2.5,
              margin: '10px 12px',
              px: 2,
              py: 1.2,
              transition: 'background 0.18s, color 0.18s, box-shadow 0.18s',
              '&:hover': {
                background: '#2e323c',
                color: '#fff',
                boxShadow: '0 2px 8px 0 #0001',
              },
            }}
          >
            <ListItemIcon sx={{ color: 'inherit', minWidth: 36 }}>
              <PictureAsPdfIcon />
            </ListItemIcon>
            {open && <ListItemText primary="Export PDF" sx={{ fontWeight: 500, letterSpacing: 0.5 }} />}
          </ListItem>
        )}
      </List>
    </Drawer>
  );
} 