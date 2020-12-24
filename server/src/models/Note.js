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
  color: {
    type: String,
    required: false,
  },
  fixed: {
    type: Boolean,
    required: false,
  },
  publishedAt: {
    type: Date,
    default: Date.now()
  },
});
mongoose.model("Note", NoteSchema);