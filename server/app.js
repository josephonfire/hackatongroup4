// Importações
const express = require('express');
const cors = require('cors');
const campaignsRouter = require('./routes/campaigns');
const dotenv = require('dotenv');
const signupRouter = require('./routes/signup');

dotenv.config();
const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  }

const app = express();

// Configurações Gerais
app.use(cors());
app.use(express.json());

// Monta o router em /api/campaigns
app.use('/api/campaigns', campaignsRouter);

// Monta o router em /api/signup
app.use('/api/signup', signupRouter);

// Post para 
module.exports = app;

