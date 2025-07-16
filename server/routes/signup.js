const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const { newUser } = require("../services/userServices.js");



// Endpoint para o signup com condições de verificação
router.post(
  "/",
  body("email").isEmail(), // Verifica se é um e-mail válido
  body("password").isLength({ min: 6 }), // Verifica se a password tem pelo menos 6 caracteres
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password confirmation does not match password"); // Se a password e a confirmação não forem iguais, retorna este erro
    }
    return true;
  }),
  async (req, res) => {
    console.log("Corpo da requisição:", req.body); // Log para ver o corpo da requisição apos signup
    const errors = validationResult(req); // Verifica se há erros
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // Se houver erros, retorna o erro
    }

    try {
      const userData = req.body;
      await newUser(userData); // Cria o utilizador
      return res
        .status(201)
        .json({ message: "User account created with success!" }); // Retorna uma mensagem de sucesso
    } catch (err) {
      if (err.status === 400) {
        return res.status(400).json({ message: err.message }); // Se houver um erro, retorna um erro
      }
      console.error(err); // Log para ver o erro
      return res.status(500).json({ message: "Error creating user." }); // Retorna uma mensagem de erro
    }
  }
);

module.exports = router;
