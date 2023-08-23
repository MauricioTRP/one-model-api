require('dotenv').config()
const { request, response } = require('express')

const Pool = require('pg').Pool

// Connection
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  ssl: true,
})

// Create if not exists

const migrateDB = (_request, response) => {
  pool.query(
    'CREATE TABLE IF NOT EXISTS users (id SERIAL, name varchar(45), email varchar(45));',
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`created table users`)
    }
  )
}

const dropDB = (_request, response) => {
  pool.query(
    'DROP TABLE IF EXISTS users;',
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`deleted table users`)
    }
  )
}

module.exports = {
  migrateDB,
  dropDB
}