var express = require('express');
var app = express();

var port = process.env.PORT || 3000;

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

app.listen(port, function () {
	console.log('Connexion réussie !');
	console.log('Port : ' + port);
});

