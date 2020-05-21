//Carregando módulos
	const express = require('express');
	const handlebars = require('express-handlebars');
	const bodyParser = require('body-parser');
	const app = express();
	const admin = require('./routes/admin');
	const path = require('path');
	const mongoose = require('mongoose');

//Configurações
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
	app.get('/', (req, res) => {
			res.send("Rota principal");
	});
	app.get('/posts', (req, res) => {
			res.send("Lista de posts");
	});
	app.use('/admin', admin);

//Outros
	const PORTA = 3000;
	app.listen(PORTA, () => {
		console.log("Servidor rodando na url http://localhost:" + PORTA);
	});
