const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    releaseYear: { type: Number, required: true },
    img: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: [
        'drama',
        'fantasy',
        'historical',
        'experimental',
        'science fiction'
      ]
    }
  },
  { timestamps: true, collection: 'movies' }
)

const Movie = mongoose.model('movies', movieSchema, 'movies')
module.exports = Movie
