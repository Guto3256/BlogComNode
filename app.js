//Carregando módulos
	const express = require('express');
	const handlebars = require('express-handlebars');
	const bodyParser = require('body-parser');
	const app = express();
	const admin = require('./routes/admin');
	const path = require('path');
	const mongoose = require('mongoose');
	const session = require('express-session');
	const flash = require('connect-flash');
	require('./models/Postagem');
	const Postagem = mongoose.model("Postagens");
//Configurações
	// Sessão
		app.use(session({
			secret: "nodeBlog2020",
			resave: true,
			saveUninitialized: true
		}));
		app.use(flash());
	// Midleware
		app.use((req, res, next) => {
			res.locals.success_msg = req.flash("success_msg");
			res.locals.error_msg = req.flash("error_msg");
			next();
		});
	// Body parser
		app.use(bodyParser.urlencoded({extended: true}));
		app.use(bodyParser.json());
	// Handlebars
		app.engine('handlebars', handlebars({defaultLayout: 'main'}));
		app.set('view engine', 'handlebars');
	// Mongoose
		mongoose.Promise = global.Promise;
		mongoose.connect("mongodb://localhost/nodeblog",{
			useUnifiedTopology: true,
			useNewUrlParser: true
		}).then(() => {
			console.log("Conectado ao MongoDB com sucesso");
		}).catch((erro) => {
			console.log("Erro ao se conectar ao MongoDB. Erro: " + erro);
		});
	// Public
		app.use(express.static(path.join(__dirname,"public")));
//Rotas
	//Rota da página principal
	app.get('/', (req, res) => {
		Postagem.find().lean().populate("Categoria").sort({Data: "desc"}).then((Postagens) => {
			res.render("index.handlebars", {Postagens: Postagens});
		}).catch((erro) => {
			req.flash("error_msg", "Houve um erro ao carregar os posts!");
			res.redirect("/404");
		});
	});

	//Rota de leitura do post
	app.get('/post/:slug', (req, res) => {
		Postagem.findOne({Slug: req.params.slug}).lean().then((Postagem) => {
			if(Postagem){
				res.render("postagem/index.handlebars", {Postagem: Postagem});
			}else{
				req.flash("error_msg", "Este post não existe!");
				res.redirect("/");
			}
		}).catch((erro) => {
			req.flash("error_msg", "Houve um erro ao carregar o post!");
			res.redirect("/");
		});
	})

	//Rotas de erro (404)
	app.get('/404', (req, res) => {
		res.send("Erro 404!");
	});
	
	app.use('/admin', admin);

//Outros
	const PORTA = 3000;
	app.listen(PORTA, () => {
		console.log("Servidor rodando na url http://localhost:" + PORTA);
	});
