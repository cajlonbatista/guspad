const mongoose = require('mongoose');

const Note = mongoose.model('Note');

module.exports = {
  async create(req, res) {
    try {
      const note = await Note.create(req.body);
      return res.status(201).json(note);
    } catch (error) {
      return res.status(401).json(error);
    }
  },
  async destroy(req, res) {
    await Note.findByIdAndDelete()
  }
}