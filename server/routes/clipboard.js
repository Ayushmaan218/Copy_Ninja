const express = require("express");
const multer = require("multer");
const Clipboard = require("../models/Clipboard");
const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

const generateCode = () => Math.random().toString(36).substring(2, 8).toUpperCase();

router.post("/upload", upload.single("file"), async (req, res) => {
  const code = generateCode();
  const entry = new Clipboard({
    code,
    type: req.file.mimetype,
    filePath: req.file.path,
    originalName: req.file.originalname,
    expiresAt: new Date(Date.now() + 60 * 60 * 1000)
  });
  await entry.save();
  res.json({ code });
});

router.post("/text", async (req, res) => {
  const code = generateCode();
  const entry = new Clipboard({
    code,
    type: "text",
    content: req.body.text,
    expiresAt: new Date(Date.now() + 60 * 60 * 1000)
  });
  await entry.save();
  res.json({ code });
});

router.get("/:code", async (req, res) => {
  const entry = await Clipboard.findOne({ code: req.params.code });
  if (!entry || entry.expiresAt < Date.now()) {
    return res.status(404).json({ error: "Not found or expired" });
  }
  if (entry.type === "text") {
    res.json({ type: "text", content: entry.content });
  } else {
    res.json({
      type: entry.type,
      fileUrl: `http://localhost:5000/${entry.filePath.replace(/\\\\/g, "/")}`,
      originalName: entry.originalName
    });
  }
});

module.exports = router;
