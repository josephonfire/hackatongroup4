const app = require('./app');


// Porta 3031
const PORT = 3031;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});