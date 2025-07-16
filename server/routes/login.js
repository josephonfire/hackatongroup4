const express = require('express');
const { body, validationResult } = require('express-validator');
const { findOneUser } = require("../services/userServices.js"); // Importa a função para encontrar um utilizador
const jwt = require("jsonwebtoken"); // Importa o jwt para criar um token
const bcrypt = require('bcrypt');

const SECRET = 'AdCharts'; // Defina sua chave secreta

const router_login = express.Router(); // Cria um router para o login

// Endpoint para o login com condições de verificação
router_login.post(
  "/",
  body("email").isEmail(), // Verifica se é um e-mail válido
  body("password").isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  async (req, res, next) => {
    const errors = validationResult(req); // Verifica se há erros
    const { email, password } = req.body; // O que receber do body será a informação POST
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // Se houver erros, retorna o erro
    }

    try {
      // Encontra o utilizador só pelo email
      const user = await findOneUser({ email });

      if (!user) {
        return res.status(401).json({ message: "User not found!" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Incorrect password!" });
      }

      const token = jwt.sign({ id: user._id, email: user.email }, SECRET);

      return res.status(200).json({
        token,
        message: "Login successful!",
        id: user._id
      });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router_login;