import React, { useState } from 'react';
import { Box, Typography, Avatar, Button, Grid, Card, CardContent } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';
import MusicNoteIcon from '@mui/icons-material/MusicNote'; // TikTok

const SOCIALS = [
  { key: 'Instagram', name: 'Instagram', icon: <InstagramIcon sx={{ color: '#e1306c', fontSize: 36 }} />, color: '#e1306c' },
  { key: 'Facebook', name: 'Facebook', icon: <FacebookIcon sx={{ color: '#1877f2', fontSize: 36 }} />, color: '#1877f2' },
  { key: 'TikTok', name: 'TikTok', icon: <MusicNoteIcon sx={{ color: '#FFD600', fontSize: 36 }} />, color: '#FFD600' },
  { key: 'LinkedIn', name: 'LinkedIn', icon: <LinkedInIcon sx={{ color: '#0077b5', fontSize: 36 }} />, color: '#0077b5' },
  { key: 'X', name: 'X', icon: <XIcon sx={{ color: '#5edc1f', fontSize: 36 }} />, color: '#5edc1f' },
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
    <Box sx={{ maxWidth: 700, mx: 'auto', mt: 4, p: 3, background: '#23263a', borderRadius: 4, boxShadow: '0 2px 12px #0008', color: '#fff' }}>
      {/* User Info */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Avatar sx={{ width: 64, height: 64, mr: 3, bgcolor: '#5edc1f' }}>{user.name[0]}</Avatar>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>{user.name}</Typography>
          <Typography variant="body1" sx={{ color: '#b0b3b8' }}>{user.email}</Typography>
        </Box>
      </Box>
      {/* Socials Grid */}
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Connected Socials</Typography>
      <Grid container spacing={3}>
        {SOCIALS.map(social => (
          <Grid item xs={12} sm={6} md={4} key={social.key}>
            <Card sx={{ background: '#181a20', color: '#fff', borderRadius: 3, boxShadow: '0 2px 8px #0006', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
              <Box sx={{ mb: 1 }}>{social.icon}</Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{social.name}</Typography>
              <Button
                variant={connected.includes(social.key) ? 'contained' : 'outlined'}
                sx={{
                  mt: 2,
                  background: connected.includes(social.key) ? social.color : 'transparent',
                  color: connected.includes(social.key) ? '#181a20' : social.color,
                  borderColor: social.color,
                  fontWeight: 600,
                  '&:hover': {
                    background: connected.includes(social.key) ? social.color : '#23263a',
                    color: '#fff',
                  },
                  minWidth: 120,
                }}
                onClick={() => handleToggle(social.key)}
              >
                {connected.includes(social.key) ? 'Connected' : 'Connect'}
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}