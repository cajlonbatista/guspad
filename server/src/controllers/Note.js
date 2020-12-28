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
  async show(req, res) {
    try {
      const notes = await Note.find();
      return res.status(200).json(notes);
    } catch (error) {
      return res.status(401).json(error);
    }
  },
  async update(req, res) {
    try {
      const { id } = req.params;
      const note = await Note.findByIdAndUpdate(id, req.body, { new: true });
      return res.status(200).json(note);

    } catch (error) {
      return res.status(401).json(error);
    }
  },
  async search(req, res) {
    try {
      const { label, user } = req.body;
      const note = await Note.find({ labels: label, user: user });
      return res.status(200).json(note);
    } catch (error) {
      return res.status(401).json(error);
    }
  },
  async destroy(req, res) {
    try {
      const { id } = req.params;
      await Note.findByIdAndRemove(id);
      return res.status(201).json({ message: 'Sucess'});
    } catch (error) {
      return res.status(401).json(error);
    }
  },
  async index(req, res) {
    try {
      const { id } = req.params;
      const note = await Note.findById(id);
      return res.status(200).json(note);
    } catch (error) {
      return res.status(401).json(error);
    }
  },
  async userindex(req, res) {
    try {
      const { id } = req.params;
      const note = await Note.find({ user: id});
      return res.status(200).json(note);
    } catch (error) {
      return res.status(401).json(error);
    }
  }
}