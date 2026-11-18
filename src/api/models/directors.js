const mongoose = require('mongoose')

const directorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    birthYear: { type: Number, required: false },
    img: { type: String, required: true },
    movies: [{ type: mongoose.Types.ObjectId, ref: 'movies' }]
  },
  { timestamps: true, collection: 'directors' }
)

const Director = mongoose.model('directors', directorSchema, 'directors')
module.exports = Director
