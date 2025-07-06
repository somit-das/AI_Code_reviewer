const {OpenAI} = require('openai');
const openai = new OpenAI({  apiKey: process.env['OPENAI_API_KEY'],});

const reviewCode = async (code, language = "javascript") => {
  const prompt = `
You are a senior software engineer. Review the following ${language} code.
Identify any bugs, inefficiencies, or style issues. Suggest improvements with clear explanations.
Return your feedback in bullet points.

Code:
\`\`\`${language}
${code}
\`\`\`
  `;

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.2,
  });

  return response.choices[0].message.content;
};

const generateTests = async (code, language = "javascript") => {
  const prompt = `
Generate unit tests for the following ${language} code using a standard testing framework (e.g., Jest):

Code:
\`\`\`${language}
${code}
\`\`\`
  `;

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.3,
  });

  return response.choices[0].message.content;
};

module.exports = { reviewCode, generateTests };
