/**
* Returns an event stream
* @returns {object.http}
*/
module.exports = async (context) => {
  return {
    statusCode: 200,
    headers: {'Content-Type': 'text/event-stream'},
    body: Buffer.from([
      `event: message`,
      `data: {"a":1,"b":2}`,
      ``,
      `id: abc`,
      `event: message`,
      `data: what`,
      ``,
      `event: hello`,
      `data: ["1","2",3]`,
      ``
    ].join('\n'))
  };
};
