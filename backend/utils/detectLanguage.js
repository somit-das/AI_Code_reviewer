const path = require('path');

const detectLanguage = (filename) => {
  const ext = path.extname(filename).toLowerCase();

  const map = {
    '.js': 'javascript',
    '.jsx': 'javascript',
    '.ts': 'typescript',
    '.tsx': 'typescript',
    '.py': 'python',
    '.java': 'java',
    '.rb': 'ruby',
    '.cpp': 'cpp',
    '.c': 'c',
    '.cs': 'csharp',
    '.go': 'go',
    '.php': 'php',
    '.rs': 'rust',
    '.kt': 'kotlin',
    '.swift': 'swift',
    '.sh': 'bash',
    '.html': 'html',
    '.css': 'css',
    '.xml': 'xml',
    '.yml': 'yaml',
    '.yaml': 'yaml',
  };

  return map[ext] || null;
};

module.exports = detectLanguage;
