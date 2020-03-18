const fs = require('fs')
const util = require('util')
const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

app.use(express.json()) // for parsing application/json

const PORT = process.env.PORT || 3000;
// URL de connexion
const url = 'mongodb://localhost:27017'

// Nom de la base de donnée
const bdd_name = 'cours_nodejs'
const client = new MongoClient(url)

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/hello', function (req, res) {
  const nom = req.query.nom
  if (nom) {
    res.send('Bonjour, ' + nom + ' !')
  } else {
    res.send('Quel est votre nom ?')
  }
})

app.get('/messages/all', async function (req, res) {
    try {
        await client.connect()
        const db = client.db(bdd_name)

        const collection = db.collection('messages')

        const docs = await collection.find({}).toArray()
        console.log(docs)
        res.send(docs)
    }
    catch (err) {
        console.log(err.stack)
        res.send(docs)
    }
    client.close()
})

app.post('/chat', async function (req, res) {
  if (req.body.msg === 'ville') {
    res.send('Nous sommes à Paris')
  } else if (req.body.msg === 'météo') {
    res.send('Il fait beau')
  } else {
    if (/ = /.test(req.body.msg)) {
      const [ cle, valeur ] = req.body.msg.split(' = ')
      let valeursExistantes
      try {
          await client.connect()
          const db = client.db(bdd_name)

          const collection = db.collection('messages')

          let r = await db.collection('messages').insertOne({from: cle, msg: valeur})
          assert.equal(1, r.insertedCount)

          const docs = await collection.find({}).toArray()
          console.log(docs)
          res.send(docs)
      }
      catch (err) {
          console.log(err.stack)
          res.send(docs)
      }
      client.close()
    } else {
      const cle = req.body.msg
      try {
        const values = await readValuesFromFile()
        const reponse = values[cle]
        res.send(cle + ': ' + reponse)
      } catch (err) {
        res.send('error while reading réponses.json', err)
      }
    }
  }
})

app.listen(PORT, function () {
  console.log('Example app listening on port ' + PORT)
})

async function readValuesFromFile() {
  const reponses = await readFile('réponses.json', { encoding: 'utf8' })
  return JSON.parse(reponses)
}
