const { Octokit } = require("@octokit/rest");
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const detectLanguage = require('../utils/detectLanguage')
const fetchFilesRecursive = async (owner, repo, path = '') => {
  try {
    const { data: repoMeta } = await octokit.repos.get({ owner, repo });
    const defaultBranch = repoMeta.default_branch;
    console.log("Default Branch:", defaultBranch);

    const { data: items } = await octokit.repos.getContent({
      owner,
      repo,
      path,
      ref: defaultBranch,
    });

    const files = [];

    for (const item of items) {
  if (item.type === "dir") {
    const nested = await fetchFilesRecursive(owner, repo, item.path);
    files.push(...nested);
  } else if (item.type === "file") {
    const language = detectLanguage(item.name);
    if (!language) {
      console.log(`⛔ Skipping unsupported file: ${item.path}`);
      continue;
    }

    try {
      const { data: fileData } = await octokit.repos.getContent({
        owner,
        repo,
        path: item.path,
        ref: defaultBranch,
      });

      const content = Buffer.from(fileData.content, "base64").toString("utf8");

      files.push({
        path: item.path,
        content,
        language,
      });
    } catch (err) {
      console.error(`⚠️ Failed to fetch file: ${item.path}`, err.message);
    }
  }
}
    console.log(files)

    return files;
  } catch (error) {
    console.error("GitHub API Error:", error.status, error.message);
    throw new Error("Failed to fetch repo contents");
  }
};


module.exports = { fetchFilesRecursive };


