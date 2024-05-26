const express = require('express');
const router = express.Router();
const Audiobook = require('../models/Audiobook');

// GET all audiobooks with optional filtering
router.get('/', async (req, res) => {
  try {
    const { genre, author, rating, searchTerm } = req.query;
    let filter = {};

    if (genre) {
      filter.genre = genre;
    }
    if (author) {
      filter.author = new RegExp(author, 'i'); // case-insensitive regex search
    }
    if (rating) {
      filter.averageRating = { $gte: parseInt(rating) };
    }
    if (searchTerm) {
      filter.$or = [
        { title: { $regex: searchTerm, $options: 'i' } },
        { author: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } }
      ];
    }

    const audiobooks = await Audiobook.find(filter);
    res.json(audiobooks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET an individual audiobook with reviews
router.get('/:id', async (req, res) => {
  try {
    const audiobook = await Audiobook.findById(req.params.id);
    if (!audiobook) {
      return res.status(404).json({ message: 'Audiobook not found' });
    }
    res.json(audiobook);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new review and update the audiobook's average rating
router.post('/:id/reviews', async (req, res) => {
  const { id } = req.params;
  const { user, rating, comment } = req.body;

  try {
    const audiobook = await Audiobook.findById(id);
    if (!audiobook) {
      return res.status(404).json({ message: 'Audiobook not found' });
    }

    const review = { user, rating, comment };
    audiobook.reviews.push(review);

    // Update the average rating
    const totalRating = audiobook.reviews.reduce((acc, review) => acc + review.rating, 0);
    audiobook.averageRating = totalRating / audiobook.reviews.length;

    await audiobook.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



module.exports = router;
