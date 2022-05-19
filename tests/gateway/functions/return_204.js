/**
* Returns a 204 status code with no body
* @returns {object.http}
*/
module.exports = async (context) => {
  return {
    statusCode: 204,
    headers: {},
    body: ''
  };
};
