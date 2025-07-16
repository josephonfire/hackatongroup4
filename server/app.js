// Importações
const express = require('express');
const cors = require('cors');
const campaignsRouter = require('./routes/campaigns');
const dotenv = require('dotenv');
dotenv.config();

const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  }


// Importações de rotas
// const signupRouter = require('./routes/signup');
const facebookRouter = require('./routes/facebook');
const instagramRouter = require('./routes/instagram');
const linkedinRouter = require('./routes/linkedin');
const xRouter = require('./routes/x');
const tiktokRouter = require('./routes/tiktok');
const { findOneUser, newUser } = require('./services/userServices');


const app = express();

// Configurações Gerais
app.use(cors());
app.use(express.json());

// Monta o route geral de campanhas
app.use('/api/campaigns', campaignsRouter);

// Monta os routers das redes sociais
app.use('/api/facebook', facebookRouter);
app.use('/api/instagram', instagramRouter);
app.use('/api/linkedin', linkedinRouter);
app.use('/api/x', xRouter);
app.use('/api/tiktok', tiktokRouter);

// // Monta o router em /api/signup
// app.use('/api/signup', signupRouter);

// POST do signup com condições de verificação 
const errors = {
    message: "Os dados introduzidos não são válidos",
    errors: {
      email: "O endereço introduzido já está registado.",
      passwordConfirmation: "As passwords não coincidem.",
      empty: "É obrigatório o preenchimento de todos os campos."
    }
  }

app.post('/api/signup', async (req, res) => {
    const { email, password, confirmPassword } = req.body; // O que receber do body será a informação POST
  
    // Confirmar se o e-mail já existe
    const takenEmail = await findOneUser({ email })
    if (takenEmail && email === takenEmail.email) {
      return res.status(400).json({ "message": errors.message, "error": errors.errors.email })
    }
  
    // Confirmar se não há campos vazios
    if (email === "" || password === "" || confirmPassword === "") {
      return res.status(400).json({ "message": errors.message, "error": errors.errors.empty })
    }
  
    // Confirmar se as passwords estão iguais
    if (password !== confirmPassword) {
      return res.status(400).json({ "message": errors.message, "error": errors.errors.passwordConfirmation })
    }
  
    // Se passar todas as confirmações, cria o utilizador
    const id = await newUser(req.body);
  
    return res.status(201).json({
      "message": "Utilizador criado com sucesso!",
      "_id": id
    })
  })


// Post para 
module.exports = app;

