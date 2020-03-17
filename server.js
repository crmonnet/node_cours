var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');

var port = process.env.PORT || 3000;

app.use(bodyParser.json());

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
	}else if (msg.includes("=")) {
		var tab = msg.split('=');
		var myWord = tab[0];
		myWord = myWord.split(" ").join("");
		var value = tab[1];
		value = value.split(" ").join("");

		var obj = {}
		obj[myWord] = value;

		var json = JSON.stringify(obj);

		fs.writeFileSync("réponses.json", json, 'utf8');
		res.send("Merci pour cette information !");
	}else{
		var rawData = fs.readFileSync("réponses.json");
		var data = JSON.parse(rawData);
		if (data[msg] != null) {
			res.send(msg + ": " + data[msg]);
		}
		else {
			res.send("Je ne connais pas " + msg + "...")
		}
	}
});

app.listen(port, function () {
	console.log('Connexion réussie !');
	console.log('Port : ' + port);
});
