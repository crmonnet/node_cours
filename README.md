Hello World! #Chatbot2020

Pour ceux qui sont en confinnement, voici un chat bot qui ne fera pas grand chose, mais vous permettra de vous sentir moins seul


## Il faut aller sur https://myapphelloworldcrm.herokuapp.com/

Dans un terminal, faites ces requetes cURL :

##Le simple Hello World
```
$ curl http://localhost:3000/
Hello World!
```

##A la recherche d'un ami
```
$ curl http://localhost:3000/hello?nom=Cyril
Bonjour Cyril!
```

##Mais où sommes-nous ?
```
$ curl -X POST --header "Content-Type: application/json" --data "{\"msg\":\"ville\"}" https://myapphelloworldcrm.herokuapp.com/chat
Nous sommes à Paris
```

##Quel temps fait-il ?
```
$ curl -X POST --header "Content-Type: application/json" --data "{\"msg\":\"météo\"}" https://myapphelloworldcrm.herokuapp.com/chat
Il fait beau
```
