const express = require('express');
const router = express.Router();
const { fetchFilesRecursive } = require('../services/githubService');
const { reviewCode } = require('../services/openaiService');
const { parseGitHubUrl } = require('../utils/validators');

router.post('/review-repo', async (req, res) => {
  const repoUrl = req.body.repoUrl;

  try {
    const { owner, repo } = parseGitHubUrl(repoUrl);
    console.log("Owner:", owner, "Repo:", repo);

    const files = await fetchFilesRecursive(owner, repo);
        console.log("Fetching files from repo: ",repoUrl);
  
    const reviews = [];

    for (const file of files) {
      const review = await reviewCode(file.content, file.language || "javascript");
      reviews.push({ path: file.path, review });
    }

    res.json({ reviews });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
