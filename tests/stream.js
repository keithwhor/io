// Verify Server-Sent-Events work as expected

const dotenv = require('dotenv').config();
const io = require('../index.js');
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

(async () => {

  const headers = {};
  let params = {
    model: 'text-davinci-003',
    prompt: ['The following is the nursery rhyme Humpty Dumpty:'],
    suffix: null,
    max_tokens: 512,
    temperature: 1.0,
    top_p: 1.0,
    n: 1,
    logprobs: null,
    echo: false,
    stop: null,
    presence_penalty: 0.0,
    frequency_penalty: 0.0,
    best_of: 1,
    logit_bias: null,
    user: null,
    stream: true
  };

  Object.keys(params).forEach(key => {
    if (params[key] === null) {
      delete params[key];
    }
  });

  let message = '';

  let result = await io.post(
    `https://api.openai.com/v1/completions`,
    OPENAI_API_KEY,
    headers,
    params,
    (eventData) => {
      if (eventData.data !== '[DONE]') {
        message = message + eventData.data.choices[0].text;
        message = message.trimStart();
        console.log(message + '\n');
      }
    }
  );

  console.log(result.data);

})();
