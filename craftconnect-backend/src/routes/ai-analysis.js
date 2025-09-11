const express = require('express');
const multer = require('multer');
const aiAnalyzer = require('../controllers/aiBusinessAnalyzer');

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('audio/')) {
      cb(null, true);
    } else {
      cb(new Error('Only audio files are allowed'), false);
    }
  }
});

// Main analysis endpoint
router.post('/analyze-voice', upload.single('audio'), aiAnalyzer.analyzeBusinessFromVoice.bind(aiAnalyzer));

module.exports = router;



