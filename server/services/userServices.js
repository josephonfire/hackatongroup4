const { getCollection } = require("../data/db.js");
const bcrypt = require("bcrypt"); // Importa o bcrypt para hashar a password

// Cria um novo utilizador na base de dados
async function newUser(userData) {
  const user = await getCollection("users");
  // Hash da senha antes de salvar
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const userToSave = { ...userData, password: hashedPassword };
  const result = await user.insertOne(userToSave);
  return result.insertedId;
}

// Encontra um utilizador na base de dados
async function findOneUser(query) {
  const user = await getCollection("users");
  const result = await user.findOne(query);
  return result;
}

// Exporta as funções
module.exports = { newUser, findOneUser };
