// Chamando os módulos
  const express = require('express');
  const router = express.Router(); //Função que permite criar rotas em arquivos a parte
  const mongoose = require('mongoose');
  require("../models/Categoria");
  const Categoria = mongoose.model("Categorias");


// Criando as rotas
  router.get('/', (req, res) => {
    res.render("admin/index");
  });
  router.get('/posts', (req, res) => {
    res.send("Página dos posts");
  });
  router.get('/categorias', (req, res) => {
    res.render('admin/categorias');
  });
  router.get('/categorias/add', (req, res) => {
    res.render('admin/addCategoria');
  });
  router.post('/categorias/nova', (req, res) => {
    const novaCategoria = {
      Nome: req.body.nome,
      Slug: req.body.slug
    }

    new Categoria(novaCategoria).save().then(() => {
      console.log("Categoria salva com sucesso!");
    }).catch((erro) => {
      console.log("Erro ao salvar categoria. Erro: " + erro);
    });
  });


// Exporta as rotas
  module.exports = router;
