// Verify Server-Sent-Events work as expected

const dotenv = require('dotenv').config();
const io = require('../index.js');
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

(async () => {

  const headers = {
    'x-api-key': ANTHROPIC_API_KEY
  };
  let params = {
    prompt: "\n\nHuman: Hey there what's up?\n\nAssistant:",
    model: 'claude-v1',
    max_tokens_to_sample: 16,
    stop_sequences: [ '\n\nHuman:' ],
    temperature: 1,
    top_k: -1,
    top_p: -1,
    stream: true
  }

  let message = '';
  let lastResult = null;

  let result = await io.post(
    `https://api.anthropic.com/v1/complete`,
    null,
    headers,
    params,
    (eventData) => {
      if (eventData.data !== '[DONE]') {
        lastResult = eventData.data;
        console.log(lastResult);
      }
    }
  );

  console.log(result);

})();
