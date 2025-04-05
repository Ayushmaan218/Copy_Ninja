const mongoose = require("mongoose");

const clipboardSchema = new mongoose.Schema({
  code: { type: String, unique: true },
  type: String,
  content: String,
  filePath: String,
  originalName: String,
  createdAt: { type: Date, default: Date.now },
  expiresAt: Date
});

module.exports = mongoose.model("Clipboard", clipboardSchema);
