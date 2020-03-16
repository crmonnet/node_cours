var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.json())

app.get('/', function (req, res) {
	res.send('Hello World!\n');
});

app.get('/hello', function(req, res){
	nom = req.query.nom;
	if(nom){
		res.send("Bonjour " + nom + "!\n");
	}else{
		res.send("Qui es-tu ?\n");
	}
});

app.post('/chat', function(req, res) {
	var msg = req.body.msg;
	console.log(req.body);
	console.log(msg);

	if (msg == "ville") {
		res.send("Nous sommes à Paris\n");
	}else if(msg == "météo") {
		res.send("Il fait beau\n");
	}else{
		res.send("Merci de faire un requete correcte !");
	}
});

app.listen(port, function () {
	console.log('Connexion réussie !');
	console.log('Port : ' + port);
});
