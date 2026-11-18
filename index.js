require('dotenv').config()
const express = require('express')
const { connectDB } = require('./src/config/db')
const moviesRouter = require('./src/api/routes/movies')
const directorsRouter = require('./src/api/routes/directors')

const app = express()

app.use(express.json())

connectDB()

app.use('/api/v1/movies', moviesRouter)
app.use('/api/v1/directors', directorsRouter)

app.use((req, res, next) => {
  return res.status(404).json('Route not found')
})

app.listen(3000, () => {
  console.log('Server deployed on: http://localhost:3000')
})
