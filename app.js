//Carregando módulos
	const express = require('express');
	const handlebars = require('express-handlebars');
	const bodyParser = require('body-parser');
	const app = express();
	const admin = require('./routes/admin');
	//const mongoose = require('mongoose');

//Configurações
	// Body parser
		app.use(bodyParser.urlencoded({extended: true}));
		app.use(bodyParser.json());
	// Handlebars
		app.engine('handlebars', handlebars({defaultLayout: 'main'}));
		app.set('view engine', 'handlebars');
	// Mongoose

//Rotas
	app.use('/admin', admin);

//Outros
	const PORTA = 3000;
	app.listen(PORTA, () => {
		console.log("Servidor rodando na url http://localhost:" + PORTA);
	});
