// Chamando os módulos
  const express = require('express');
  const router = express.Router(); //Função que permite criar rotas em arquivos a parte
  const mongoose = require('mongoose');
  require("../models/Categoria");
  const Categoria = mongoose.model("Categorias");
  require("../models/Postagem");
  const Postagem = mongoose.model("Postagens");


// Criando as rotas
  //Rota principal
  router.get('/', (req, res) => {
    res.render("admin/index");
  });

  //Rota de Posts
  router.get('/posts', (req, res) => {
    Postagem.find().lean().sort({Data: "desc"}).then((Postagem) => {
      res.render("admin/postagens", {Postagem: Postagem});
    }).catch((erro) => {
      req.flash("error_msg", "Erro ao carregar posts!");
      res.redirect("/admin");
    });
  });

  //Rota do formulário de cadastro de posts
  router.get('/posts/add', (req, res) => {
    Categoria.find().lean().then((Categorias) => {
      res.render("admin/addPost", {Categorias: Categorias});
    });
  });

  //Rota de cadastro de posts
  router.post('/posts/novo', (req, res) => {
    var erros = [];

    if(!req.body.titulo || typeof req.body.titulo == undefined || req.body.titulo == null){
      erros.push({text: "Título inválido"});
    }

    if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null){
      erros.push({text: "Slug inválido"});
    }

    if(!req.body.descricao || typeof req.body.descricao == undefined || req.body.descricao == null){
      erros.push({text: "Descrição inválida"});
    }

    if(!req.body.conteudo || typeof req.body.conteudo == undefined || req.body.conteudo == null){
      erros.push({text: "Conteúdo inválido"});
    }

    if(!req.body.categoria == "0"){
      erros.push({text: "Categoria inválida, registre uma categoria!"});
    }

    if(erros.length > 0){
      Categoria.find().lean().then((Categorias) => {
        res.render("admin/addPost", {erros: erros, Categorias: Categorias});
      });
    }else{
      const novaPostagem = {
        Titulo: req.body.titulo,
        Slug: req.body.slug,
        Descricao: req.body.descricao,
        Conteudo: req.body.conteudo,
        Categoria: req.body.categoria
      }

      new Postagem(novaPostagem).save().then(() => {
        req.flash("success_msg", "Post criado com sucesso!");
        res.redirect("/admin/posts");
      }).catch((erro) => {
        console.log("Erro post: " + erro);
        req.flash("error_msg", "Erro ao salvar post, tente novamente!");
        res.redirect("/admin");
      });
    }
  });

  //Rota de categorias
  router.get('/categorias', (req, res) => {
    Categoria.find().lean().sort({Data: "desc"}).then((Categorias) => {
      res.render('admin/categorias', {Categorias: Categorias});
    }).catch((erro) => {
      req.flash("error_msg", "Erro ao carregar categorias!");
      res.redirect("/admin");
    });
  });

  //Rota do formulário de cadastro de categorias
  router.get('/categorias/add', (req, res) => {
    res.render('admin/addCategoria');
  });

  //Rota de cadastro de categorias
  router.post('/categorias/nova', (req, res) => {
    var erros = [];

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
      erros.push({text: "Nome inválido"});
    }

    if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null){
      erros.push({text: "Slug inválido"});
    }

    if(erros.length > 0){
      res.render("admin/addCategoria", {erros: erros});
    }else{
      const novaCategoria = {
        Nome: req.body.nome,
        Slug: req.body.slug
      }

      new Categoria(novaCategoria).save().then(() => {
        req.flash("success_msg", "Categoria criada com sucesso!");
        res.redirect("/admin/categorias");
      }).catch((erro) => {
        req.flash("error_msg", "Erro ao criar categoria, tente novamente!");
        res.redirect("/admin");
      });
    }
  });

  //Rota do formulário de edição de categorias
  router.get('/categorias/edit/:id', (req, res) => {
    Categoria.findOne({_id:req.params.id}).lean().then((Categoria) => {
      res.render('admin/editCategoria', {Categoria: Categoria});
    }).catch((erro) => {
      req.flash("error_msg", "Esta categoria não existe!");
      res.redirect("/admin/categorias");
    });
  });

  //Rota de edição de categorias
  router.post('/categorias/edit', (req, res) => {
    var erros = [];

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
      erros.push({text: "Nome inválido"});
    }

    if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null){
      erros.push({text: "Slug inválido"});
    }

    if(erros.length > 0){
      res.render("admin/editCategoria", {erros: erros});
    }else{
      Categoria.findOne({_id: req.body.id}).then((categoria) => {
        categoria.Nome = req.body.nome;
        categoria.Slug = req.body.slug;

        categoria.save().then(() => {
          req.flash("success_msg", "Categoria editada com sucesso!");
          res.redirect("/admin/categorias");
        }).catch((erro) => {
          req.flash("error_msg", "Erro ao salvar edição da categoria!");
          res.redirect("/admin/categorias");          
        });
      }).catch((erro) => {
        req.flash("error_msg", "Erro ao editar categoria!");
        res.redirect("/admin/categorias");
      });
    }
  });

  //Rota de exclusão de categorias
  router.get('/categorias/del/:id', (req, res) => {
    Categoria.deleteOne({_id: req.params.id}).then(() => {
      req.flash("success_msg", "Categoria deletada com sucesso!");
      res.redirect("/admin/categorias");
    }).catch((erro) => {
      req.flash("success_msg", "Ocorreu um erro ao deletar a categoria, tente novamente!");
      res.redirect("/admin/categorias");
    });
  });
// Exporta as rotas
  module.exports = router;
