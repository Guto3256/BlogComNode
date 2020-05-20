// Chamando os módulos
  const express = require('express');
  const router = express.Router(); //Função que permite criar rotas em arquivos a parte

// Criando as rotas
  router.get('/', (req, res) => {
    res.send("Página principal do painel ADM");
  });
  router.get('/posts', (req, res) => {
    res.send("Página dos posts");
  });
  router.get('/categorias', (req, res) => {
    res.send("Página de categorias");
  });


// Exporta as rotas
  module.exports = router;
