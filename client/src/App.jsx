import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import SignUpPage from './pages/Signup';
import LandingPage from './pages/LandingPage';
import Profile from './components/Profile';
import ModernSidebar from './components/ModernSidebar';
import { Box, CssBaseline } from '@mui/material';
import './styles/pages.css';

function ProfileWithSidebar() {
  const navigate = useNavigate();
  const handleSetView = (view) => {
    if (view === 'dashboard') navigate('/dashboard');
    if (view === 'profile') navigate('/profile');
  };
  return (
    <Box sx={{ minHeight: '100vh', height: '100vh', background: '#151623', color: '#fff', display: 'flex' }}>
      <CssBaseline />
      <ModernSidebar view={"profile"} setView={handleSetView} dashboardRef={null} />
      <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, md: 4 }, minHeight: '100vh', maxHeight: '100vh', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Profile />
      </Box>
    </Box>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<ProfileWithSidebar />} />
      </Routes>
    </Router>
  );
}

export default App;
