const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  comment: {
    type: String,
    required: false
  }
});

const audiobookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  coverImage: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  averageRating: {
    type: Number,
    default: 0
  },
  description: {
    type: String,
    required: true
  },
  reviews: [reviewSchema]
});

module.exports = mongoose.model('Audiobook', audiobookSchema);
