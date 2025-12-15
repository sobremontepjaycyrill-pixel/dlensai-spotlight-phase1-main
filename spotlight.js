// spotlight.js
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const OpenAI = require('openai');

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_ORG_ID,
  project: process.env.OPENAI_PROJECT_ID,
});

// Load the DLENS Spotlight Master Prompt once
const masterPromptTemplate = fs.readFileSync(
  path.join(__dirname, 'prompts', 'DLENS_Spotlight_MasterPrompt_v1_for_API.txt'),
  'utf8'
);

// Simple dev mapping from ticker → display name
const COMPANY_DISPLAY_NAMES = {
  TSLA: 'Tesla, Inc.',
  JOBY: 'Joby Aviation, Inc.',
  SMCI: 'Super Micro Computer, Inc.',
  // add more as you test
};

/**
 * Insert ticker + term + company name into the Master Prompt.
 */
function buildPrompt(ticker, termYears) {
  const upperTicker = ticker.toUpperCase();
  const companyName =
    COMPANY_DISPLAY_NAMES[upperTicker] || `Company for ticker ${upperTicker}`;

  return masterPromptTemplate
    .replace(/\[COMPANY NAME\]/g, companyName)
    .replace(/\[TICKER\]/g, upperTicker)
    .replace(/\[N\]/g, String(termYears));
}

async function runSpotlight(ticker, termYears) {
  const prompt = buildPrompt(ticker, termYears);

  const response = await client.responses.create({
    model: process.env.OPENAI_MODEL || 'gpt-4.1',
    input: prompt,
    max_output_tokens: 8000,
  });

  const html = response.output_text;

  const outFile = path.join(
    process.cwd(),
    `DLENS_Spotlight_${ticker.toUpperCase()}_${termYears}y_via_API.html`
  );

  fs.writeFileSync(outFile, html, 'utf8');
  console.log(`✅ Spotlight generated: ${outFile}`);
}

// ---------- CLI wiring ----------
// Usage: node spotlight.js TSLA 10
const [,, ticker, termStr] = process.argv;

if (!ticker || !termStr) {
  console.error('Usage: node spotlight.js <TICKER> <TERM_YEARS>');
  process.exit(1);
}

const termYears = Number(termStr);
if (Number.isNaN(termYears)) {
  console.error('TERM_YEARS must be a number, got:', termStr);
  process.exit(1);
}

runSpotlight(ticker, termYears).catch(err => {
  console.error('Error running Spotlight:');
  console.error('message:', err.message);
  console.error('details:', err);
  process.exit(1);
});
