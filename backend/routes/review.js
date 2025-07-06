const express = require('express');
const router = express.Router();
const { reviewCode, generateTests } = require('../services/openaiService');

router.post('/', async (req, res) => {
  const { code, language } = req.body;
  try {
    const response = await reviewCode(code, language);
    res.json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/generate-tests', async (req, res) => {
  const { code, language } = req.body;
  try {
    const tests = await generateTests(code, language);
    res.json({ tests });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
