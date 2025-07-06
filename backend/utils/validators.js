// utils/validators.js
const parseGitHubUrl = (url) => {
  const cleanedUrl = url
    .replace(/\.git$/, '')     // remove .git
    .replace(/\/+$/, '');      // remove trailing slashes

  const regex = /github\.com\/([^\/]+)\/([^\/]+)/;
  const match = cleanedUrl.match(regex);

  if (!match) {
    throw new Error("❌ Invalid GitHub repo URL");
  }

  return {
    owner: match[1],
    repo: match[2],
  };
};

module.exports = { parseGitHubUrl };
