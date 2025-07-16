const express = require('express');
const cors = require('cors');
const campaignsRouter = require('./routes/campaigns');

const app = express();

app.use(cors());
app.use(express.json());

// Monta o router em /api/campaigns
app.use('/api/campaigns', campaignsRouter);

module.exports = app;

