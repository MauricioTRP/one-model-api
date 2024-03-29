const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const migrate = require('./migrations')
const port = process.env.PORT ?? 5000;

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Esta es una API básica con CRUD de usuarios, revisa la ruta /users'})
})

// Users CRUD

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

// Migrate flaite

app.get('/migrate', migrate.migrateDB)
app.get('/drop', migrate.dropDB)

app.listen(port, () => {
  console.log(`App running on port ${port}`)
  console.log((`The database is ${process.env.DB_NAME}`));
})
