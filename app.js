const express = require('express');

//Initialisation du serveur express
const server = express();

//GET
server.get('/', (req, res) => {
  return res.send('Bonjour KDA');
});

//Définition du port
const PORT = 9000;
server.listen(PORT, () => {
  console.log(`Le serveur écoute sur le port ${PORT}`);
});
