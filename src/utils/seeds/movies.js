require('dotenv').config()

const mongoose = require('mongoose')
const Movie = require('../../api/models/movies')
const movies = require('../../data/movies')

const launchSeed = async () => {
  try {
    await mongoose.connect(process.env.DB_URL)

    await Movie.collection.drop()

    await Movie.insertMany(movies)

    console.log('Movies seed completed')
  } catch (error) {
    console.error('Error while launching seed:', error)
  } finally {
    await mongoose.disconnect()
  }
}

launchSeed()
