const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  publishedAt: {
    type: Date,
    default: Date.now()
  },
});
mongoose.model("Notes", NoteSchema);