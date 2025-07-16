import React, { useState } from 'react';
import { Box, Typography, Avatar, Button, Grid, Card } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';
import MusicNoteIcon from '@mui/icons-material/MusicNote'; // TikTok
import '../styles/Profile.css';

const SOCIALS = [
  { key: 'Instagram', name: 'Instagram', icon: <InstagramIcon className="profile-social-icon instagram" />, color: '#e1306c' },
  { key: 'Facebook', name: 'Facebook', icon: <FacebookIcon className="profile-social-icon facebook" />, color: '#1877f2' },
  { key: 'TikTok', name: 'TikTok', icon: <MusicNoteIcon className="profile-social-icon tiktok" />, color: '#FFD600' },
  { key: 'LinkedIn', name: 'LinkedIn', icon: <LinkedInIcon className="profile-social-icon linkedin" />, color: '#0077b5' },
  { key: 'X', name: 'X', icon: <XIcon className="profile-social-icon x" />, color: '#5edc1f' },
];

export default function Profile({ connectedSocials = [], onChange }) {
  const [connected, setConnected] = useState(connectedSocials);
  // Mock user info
  const user = {
    name: 'Jane Doe',
    email: 'jane.doe@email.com',
    avatar: '',
  };

  const handleToggle = (key) => {
    let updated;
    if (connected.includes(key)) {
      updated = connected.filter(s => s !== key);
    } else {
      updated = [...connected, key];
    }
    setConnected(updated);
    if (onChange) onChange(updated);
  };

  return (
    <div className="profile-dashboard-style profile-root">
      <div className="profile-header-row">
        <div className="profile-user-info">
          <Avatar className="profile-avatar">{user.name[0]}</Avatar>
          <div className="profile-user-details">
            <Typography variant="h5" className="profile-username">{user.name}</Typography>
            <Typography variant="body1" className="profile-email">{user.email}</Typography>
          </div>
        </div>
        <Button className="profile-logout-btn">Log out</Button>
      </div>
      <Typography variant="h6" className="profile-socials-title">Connected Socials</Typography>
      <Grid container spacing={3} className="profile-socials-grid">
        {SOCIALS.map(social => (
          <Grid item xs={12} sm={6} md={4} key={social.key}>
            <Card className="profile-social-card">
              <div className="profile-social-icon-wrapper">{social.icon}</div>
              <Typography variant="subtitle1" className="profile-social-name">{social.name}</Typography>
              <Button
                className={`profile-social-btn${connected.includes(social.key) ? ' connected' : ''}`}
                onClick={() => handleToggle(social.key)}
                style={connected.includes(social.key)
                  ? { background: '#d32f2f', color: '#fff', borderColor: '#d32f2f' }
                  : { color: social.color, borderColor: social.color }}
              >
                {connected.includes(social.key) ? 'Disconnect' : 'Connect'}
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}