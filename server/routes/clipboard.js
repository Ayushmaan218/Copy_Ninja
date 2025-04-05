const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Clipboard = require("../models/Clipboard");

const router = express.Router();

// Multer storage for uploaded files
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({ storage });

// Generate a random 6-character code
const generateCode = () => Math.random().toString(36).substring(2, 8).toUpperCase();

/**
 * Upload a file
 */
router.post("/upload", upload.single("file"), async (req, res) => {
  const code = generateCode();
  const entry = new Clipboard({
    code,
    type: req.file.mimetype,
    filePath: req.file.path,
    originalName: req.file.originalname,
    expiresAt: new Date(Date.now() + 60 * 60 * 1000) // 1 hour expiry
  });
  await entry.save();
  res.json({ code });
});

/**
 * Upload a text snippet
 */
router.post("/text", async (req, res) => {
  const code = generateCode();
  const entry = new Clipboard({
    code,
    type: "text",
    content: req.body.text,
    expiresAt: new Date(Date.now() + 60 * 60 * 1000) // 1 hour expiry
  });
  await entry.save();
  res.json({ code });
});

/**
 * Get metadata (text or file)
 */
router.get("/:code", async (req, res) => {
  const entry = await Clipboard.findOne({ code: req.params.code });

  if (!entry || entry.expiresAt < Date.now()) {
    return res.status(404).json({ error: "Not found or expired" });
  }

  if (entry.type === "text") {
    return res.json({ type: "text", content: entry.content });
  }

  // It's a file
  return res.json({
    type: entry.type,
    originalName: entry.originalName
  });
});

/**
 * Download file binary
 */
router.get("/:code/download", async (req, res) => {
  const entry = await Clipboard.findOne({ code: req.params.code });

  if (!entry || entry.expiresAt < Date.now() || entry.type === "text") {
    return res.status(404).json({ error: "Not found or expired" });
  }

  const filePath = path.resolve(entry.filePath);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "File not found" });
  }

  res.download(filePath, entry.originalName);
});

module.exports = router;
