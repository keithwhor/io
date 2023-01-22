const httpAPI = require('../index.js');

const chai = require('chai');
const expect = chai.expect;

const {Gateway, FunctionParser} = require('functionscript');

const PORT = 7357;
const HOST = 'localhost'
const ROOT = './tests/gateway';
const REQUEST_URL = `http://${HOST}:${PORT}`;

class FSGateway extends Gateway {
  constructor (cfg) {
    super(cfg);
    this.supportedMethods['DELETE'] = true;
    this.supportedMethods['PUT'] = true;
    this.supportedMethods['PATCH'] = true;
  }
}

const FaaSGateway = new FSGateway({debug: false/* true */, root: ROOT});
const parser = new FunctionParser();

before(async () => {
  FaaSGateway.listen(PORT);
  FaaSGateway.define(parser.load(ROOT, 'functions'));
});

after(async () => {
  FaaSGateway.close();
});

describe('io.request', async () => {

  // request - GET

  it ('Should make a generic HTTP request with GET method', async () => {

    let result = await httpAPI.request('GET', REQUEST_URL);

    expect(result).to.exist;
    expect(result.statusCode).to.equal(200);
    expect(result.headers).to.haveOwnProperty('x-functionscript');
    expect(result.headers['content-type'].split(';')[0]).to.equal('application/json');
    expect(result.body).to.exist;
    expect(result.body).to.be.instanceof(Buffer);

    let data = JSON.parse(result.body.toString());

    expect(data.http.headers['content-type']).to.not.exist;
    expect(data.http.method).to.equal('GET');

  });

  it ('Should make a generic HTTP request with GET method and send queryParams', async () => {

    let result = await httpAPI.request('GET', REQUEST_URL, {hello: 'world'});

    expect(result).to.exist;
    expect(result.statusCode).to.equal(200);
    expect(result.headers).to.haveOwnProperty('x-functionscript');
    expect(result.headers['content-type'].split(';')[0]).to.equal('application/json');
    expect(result.body).to.exist;
    expect(result.body).to.be.instanceof(Buffer);

    let data = JSON.parse(result.body.toString());

    expect(data.http.headers['content-type']).to.not.exist;
    expect(data.http.method).to.equal('GET');
    expect(data.params.hello).to.equal('world');

  });

  it ('Should make a generic HTTP request with GET method and send queryParams and headers', async () => {

    let result = await httpAPI.request('GET', REQUEST_URL, {hello: 'world'}, {'x-test': 'true'});

    expect(result).to.exist;
    expect(result.statusCode).to.equal(200);
    expect(result.headers).to.haveOwnProperty('x-functionscript');
    expect(result.headers['content-type'].split(';')[0]).to.equal('application/json');
    expect(result.body).to.exist;
    expect(result.body).to.be.instanceof(Buffer);

    let data = JSON.parse(result.body.toString());

    expect(data.http.headers['content-type']).to.not.exist;
    expect(data.http.method).to.equal('GET');
    expect(data.params.hello).to.equal('world');
    expect(data.http.headers['x-test']).to.equal('true');

  });

  it ('Should make a generic HTTP request with GET method and send queryParams, headers and body', async () => {

    let result = await httpAPI.request('GET', REQUEST_URL, {hello: 'world'}, {'x-test': 'true'}, 'hello');

    expect(result).to.exist;
    expect(result.statusCode).to.equal(200);
    expect(result.headers).to.haveOwnProperty('x-functionscript');
    expect(result.headers['content-type'].split(';')[0]).to.equal('application/json');
    expect(result.body).to.exist;
    expect(result.body).to.be.instanceof(Buffer);

    let data = JSON.parse(result.body.toString());

    expect(data.http.headers['content-type']).to.not.exist;
    expect(data.http.method).to.equal('GET');
    expect(data.params.hello).to.equal('world');
    expect(data.http.headers['x-test']).to.equal('true');
    expect(data.http.body).to.equal('');

  });

  // request - DELETE

  it ('Should make a generic HTTP request with DELETE method', async () => {

    let result = await httpAPI.request('DELETE', REQUEST_URL);

    expect(result).to.exist;
    expect(result.statusCode).to.equal(200);
    expect(result.headers).to.haveOwnProperty('x-functionscript');
    expect(result.headers['content-type'].split(';')[0]).to.equal('application/json');
    expect(result.body).to.exist;
    expect(result.body).to.be.instanceof(Buffer);

    let data = JSON.parse(result.body.toString());

    expect(data.http.headers['content-type']).to.not.exist;
    expect(data.http.method).to.equal('DELETE');

  });

  it ('Should make a generic HTTP request with DELETE method and send queryParams', async () => {

    let result = await httpAPI.request('DELETE', REQUEST_URL, {hello: 'world'});

    expect(result).to.exist;
    expect(result.statusCode).to.equal(200);
    expect(result.headers).to.haveOwnProperty('x-functionscript');
    expect(result.headers['content-type'].split(';')[0]).to.equal('application/json');
    expect(result.body).to.exist;
    expect(result.body).to.be.instanceof(Buffer);

    let data = JSON.parse(result.body.toString());

    expect(data.http.headers['content-type']).to.not.exist;
    expect(data.http.method).to.equal('DELETE');
    expect(data.params.hello).to.equal('world');

  });

  it ('Should make a generic HTTP request with DELETE method and send queryParams and headers', async () => {

    let result = await httpAPI.request('DELETE', REQUEST_URL, {hello: 'world'}, {'x-test': 'true'});

    expect(result).to.exist;
    expect(result.statusCode).to.equal(200);
    expect(result.headers).to.haveOwnProperty('x-functionscript');
    expect(result.headers['content-type'].split(';')[0]).to.equal('application/json');
    expect(result.body).to.exist;
    expect(result.body).to.be.instanceof(Buffer);

    let data = JSON.parse(result.body.toString());

    expect(data.http.headers['content-type']).to.not.exist;
    expect(data.http.method).to.equal('DELETE');
    expect(data.params.hello).to.equal('world');
    expect(data.http.headers['x-test']).to.equal('true');

  });

  it ('Should make a generic HTTP request with DELETE method and send queryParams, headers and body', async () => {

    let result = await httpAPI.request('DELETE', REQUEST_URL, {hello: 'world'}, {'x-test': 'true'}, 'hello');

    expect(result).to.exist;
    expect(result.statusCode).to.equal(200);
    expect(result.headers).to.haveOwnProperty('x-functionscript');
    expect(result.headers['content-type'].split(';')[0]).to.equal('application/json');
    expect(result.body).to.exist;
    expect(result.body).to.be.instanceof(Buffer);

    let data = JSON.parse(result.body.toString());

    expect(data.http.headers['content-type']).to.not.exist;
    expect(data.http.method).to.equal('DELETE');
    expect(data.params.hello).to.equal('world');
    expect(data.http.headers['x-test']).to.equal('true');
    expect(data.http.body).to.equal('');

  });

  // request - POST

  it ('Should make a generic HTTP request with POST method', async () => {

    let result = await httpAPI.request('POST', REQUEST_URL, null, {'content-type': 'application/json'});

    expect(result).to.exist;
    expect(result.statusCode).to.equal(200);
    expect(result.headers).to.haveOwnProperty('x-functionscript');
    expect(result.headers['content-type'].split(';')[0]).to.equal('application/json');
    expect(result.body).to.exist;
    expect(result.body).to.be.instanceof(Buffer);

    let data = JSON.parse(result.body.toString());

    expect(data.http.headers['content-type'].split(';')[0]).to.equal('application/json');
    expect(data.http.method).to.equal('POST');

  });

  it ('Should make a generic HTTP request with POST method and send queryParams and headers', async () => {

    let result = await httpAPI.request('POST', REQUEST_URL, {hello: 'world'}, {'content-type': 'application/json', 'x-test': 'true'});

    expect(result).to.exist;
    expect(result.statusCode).to.equal(200);
    expect(result.headers).to.haveOwnProperty('x-functionscript');
    expect(result.headers['content-type'].split(';')[0]).to.equal('application/json');
    expect(result.body).to.exist;
    expect(result.body).to.be.instanceof(Buffer);

    let data = JSON.parse(result.body.toString());

    expect(data.http.headers['content-type'].split(';')[0]).to.equal('application/json');
    expect(data.http.method).to.equal('POST');
    expect(data.params.hello).to.equal('world');
    expect(data.http.headers['x-test']).to.equal('true');

  });

  it ('Should make a generic HTTP request with POST method and send queryParams, headers and body', async () => {

    let result = await httpAPI.request('POST', REQUEST_URL, {}, {'content-type': 'application/json', 'x-test': 'true'}, '{"test":"hah"}');

    expect(result).to.exist;
    expect(result.statusCode).to.equal(200);
    expect(result.headers).to.haveOwnProperty('x-functionscript');
    expect(result.headers['content-type'].split(';')[0]).to.equal('application/json');
    expect(result.body).to.exist;
    expect(result.body).to.be.instanceof(Buffer);

    let data = JSON.parse(result.body.toString());

    expect(data.http.headers['content-type'].split(';')[0]).to.equal('application/json');
    expect(data.http.method).to.equal('POST');
    expect(data.params.test).to.equal('hah');
    expect(data.http.headers['x-test']).to.equal('true');
    expect(data.http.body).to.equal('{"test":"hah"}');

  });

  // request - PUT

  it ('Should make a generic HTTP request with PUT method', async () => {

    let result = await httpAPI.request('PUT', REQUEST_URL, null, {'content-type': 'application/json'});

    expect(result).to.exist;
    expect(result.statusCode).to.equal(200);
    expect(result.headers).to.haveOwnProperty('x-functionscript');
    expect(result.headers['content-type'].split(';')[0]).to.equal('application/json');
    expect(result.body).to.exist;
    expect(result.body).to.be.instanceof(Buffer);

    let data = JSON.parse(result.body.toString());

    expect(data.http.headers['content-type'].split(';')[0]).to.equal('application/json');
    expect(data.http.method).to.equal('PUT');

  });

  it ('Should make a generic HTTP request with PUT method and send queryParams and headers', async () => {

    let result = await httpAPI.request('PUT', REQUEST_URL, {hello: 'world'}, {'content-type': 'application/json', 'x-test': 'true'});

    expect(result).to.exist;
    expect(result.statusCode).to.equal(200);
    expect(result.headers).to.haveOwnProperty('x-functionscript');
    expect(result.headers['content-type'].split(';')[0]).to.equal('application/json');
    expect(result.body).to.exist;
    expect(result.body).to.be.instanceof(Buffer);

    let data = JSON.parse(result.body.toString());

    expect(data.http.headers['content-type'].split(';')[0]).to.equal('application/json');
    expect(data.http.method).to.equal('PUT');
    expect(data.params.hello).to.equal('world');
    expect(data.http.headers['x-test']).to.equal('true');

  });

  it ('Should make a generic HTTP request with PUT method and send queryParams, headers and body', async () => {

    let result = await httpAPI.request('PUT', REQUEST_URL, {}, {'content-type': 'application/json', 'x-test': 'true'}, '{"test":"hah"}');

    expect(result).to.exist;
    expect(result.statusCode).to.equal(200);
    expect(result.headers).to.haveOwnProperty('x-functionscript');
    expect(result.headers['content-type'].split(';')[0]).to.equal('application/json');
    expect(result.body).to.exist;
    expect(result.body).to.be.instanceof(Buffer);

    let data = JSON.parse(result.body.toString());

    expect(data.http.headers['content-type'].split(';')[0]).to.equal('application/json');
    expect(data.http.method).to.equal('PUT');
    expect(data.params.test).to.equal('hah');
    expect(data.http.headers['x-test']).to.equal('true');
    expect(data.http.body).to.equal('{"test":"hah"}');

  });

  // request - PATCH

  it ('Should make a generic HTTP request with PATCH method', async () => {

    let result = await httpAPI.request('PATCH', REQUEST_URL, null, {'content-type': 'application/json'});

    expect(result).to.exist;
    expect(result.statusCode).to.equal(200);
    expect(result.headers).to.haveOwnProperty('x-functionscript');
    expect(result.headers['content-type'].split(';')[0]).to.equal('application/json');
    expect(result.body).to.exist;
    expect(result.body).to.be.instanceof(Buffer);

    let data = JSON.parse(result.body.toString());

    expect(data.http.headers['content-type'].split(';')[0]).to.equal('application/json');
    expect(data.http.method).to.equal('PATCH');

  });

  it ('Should make a generic HTTP request with PATCH method and send queryParams and headers', async () => {

    let result = await httpAPI.request('PATCH', REQUEST_URL, {hello: 'world'}, {'content-type': 'application/json', 'x-test': 'true'});

    expect(result).to.exist;
    expect(result.statusCode).to.equal(200);
    expect(result.headers).to.haveOwnProperty('x-functionscript');
    expect(result.headers['content-type'].split(';')[0]).to.equal('application/json');
    expect(result.body).to.exist;
    expect(result.body).to.be.instanceof(Buffer);

    let data = JSON.parse(result.body.toString());

    expect(data.http.headers['content-type'].split(';')[0]).to.equal('application/json');
    expect(data.http.method).to.equal('PATCH');
    expect(data.params.hello).to.equal('world');
    expect(data.http.headers['x-test']).to.equal('true');

  });

  it ('Should make a generic HTTP request with PATCH method and send queryParams, headers and body', async () => {

    let result = await httpAPI.request('PATCH', REQUEST_URL, {}, {'content-type': 'application/json', 'x-test': 'true'}, '{"test":"hah"}');

    expect(result).to.exist;
    expect(result.statusCode).to.equal(200);
    expect(result.headers).to.haveOwnProperty('x-functionscript');
    expect(result.headers['content-type'].split(';')[0]).to.equal('application/json');
    expect(result.body).to.exist;
    expect(result.body).to.be.instanceof(Buffer);

    let data = JSON.parse(result.body.toString());

    expect(data.http.headers['content-type'].split(';')[0]).to.equal('application/json');
    expect(data.http.method).to.equal('PATCH');
    expect(data.params.test).to.equal('hah');
    expect(data.http.headers['x-test']).to.equal('true');
    expect(data.http.body).to.equal('{"test":"hah"}');

  });

});

describe('io.get', async () => {

  // request - GET

  it ('Should make a GET request', async () => {

    let result = await httpAPI.get(REQUEST_URL);

    expect(result).to.exist;
    expect(result.statusCode).to.equal(200);
    expect(result.headers).to.haveOwnProperty('x-functionscript');
    expect(result.headers['content-type'].split(';')[0]).to.equal('application/json');
    expect(result.data).to.exist;
    expect(result.data).to.be.an('object');
    expect(result.data.http.headers['content-type'].split(';')[0]).to.equal('application/json');
    expect(result.data.http.method).to.equal('GET');
    expect(result.data.http.body).to.equal('');

  });

  it ('Should make a GET request and send Authorization: Bearer header', async () => {

    let result = await httpAPI.get(REQUEST_URL, 'x');

    expect(result).to.exist;
    expect(result.statusCode).to.equal(200);
    expect(result.headers).to.haveOwnProperty('x-functionscript');
    expect(result.headers['content-type'].split(';')[0]).to.equal('application/json');
    expect(result.data).to.exist;
    expect(result.data).to.be.an('object');
    expect(result.data.http.headers['content-type'].split(';')[0]).to.equal('application/json');
    expect(result.data.http.method).to.equal('GET');
    expect(result.data.http.body).to.equal('');
    expect(result.data.http.headers['authorization']).to.equal('Bearer x');

  });

  it ('Should make a GET request and send Authorization: Basic header', async () => {

    let result = await httpAPI.get(REQUEST_URL, 'Basic x');

    expect(result).to.exist;
    expect(result.statusCode).to.equal(200);
    expect(result.headers).to.haveOwnProperty('x-functionscript');
    expect(result.headers['content-type'].split(';')[0]).to.equal('application/json');
    expect(result.data).to.exist;
    expect(result.data).to.be.an('object');
    expect(result.data.http.headers['content-type'].split(';')[0]).to.equal('application/json');
    expect(result.data.http.method).to.equal('GET');
    expect(result.data.http.body).to.equal('');
    expect(result.data.http.headers['authorization']).to.equal('Basic x');

  });

  it ('Should make a GET request and send Authorization: Bearer and other headers', async () => {

    let result = await httpAPI.get(REQUEST_URL, 'x', {'x-test': 'true'});

    expect(result).to.exist;
    expect(result.statusCode).to.equal(200);
    expect(result.headers).to.haveOwnProperty('x-functionscript');
    expect(result.headers['content-type'].split(';')[0]).to.equal('application/json');
    expect(result.data).to.exist;
    expect(result.data).to.be.an('object');
    expect(result.data.http.headers['content-type'].split(';')[0]).to.equal('application/json');
    expect(result.data.http.method).to.equal('GET');
    expect(result.data.http.body).to.equal('');
    expect(result.data.http.headers['authorization']).to.equal('Bearer x');
    expect(result.data.http.headers['x-test']).to.equal('true');

  });

  it ('Should make a GET request and send Authorization: Bearer and other headers + send queryParams', async () => {

    let result = await httpAPI.get(REQUEST_URL, 'x', {'x-test': 'true'}, {'hello': 'world'});

    expect(result).to.exist;
    expect(result.statusCode).to.equal(200);
    expect(result.headers).to.haveOwnProperty('x-functionscript');
    expect(result.headers['content-type'].split(';')[0]).to.equal('application/json');
    expect(result.data).to.exist;
    expect(result.data).to.be.an('object');
    expect(result.data.http.headers['content-type'].split(';')[0]).to.equal('application/json');
    expect(result.data.http.method).to.equal('GET');
    expect(result.data.http.body).to.equal('');
    expect(result.data.http.headers['authorization']).to.equal('Bearer x');
    expect(result.data.http.headers['x-test']).to.equal('true');
    expect(result.data.params.hello).to.equal('world');

  });

  it('Should make a GET request to a URL with a path that contains part of the host', async () => {

    let result = await httpAPI.get(REQUEST_URL + '/local', 'x', {'x-test': 'true'});

    expect(result).to.exist;
    expect(result.statusCode).to.equal(200);
    expect(result.headers).to.haveOwnProperty('x-functionscript');
    expect(result.headers['content-type'].split(';')[0]).to.equal('application/json');
    expect(result.data).to.exist;
    expect(result.data).to.be.an('object');
    expect(result.data.http.headers['content-type'].split(';')[0]).to.equal('application/json');
    expect(result.data.http.method).to.equal('GET');
    expect(result.data.http.body).to.equal('');
    expect(result.data.http.headers['authorization']).to.equal('Bearer x');
    expect(result.data.http.headers['x-test']).to.equal('true');

  });


  it('Should make a GET request to a URL with a path that repeats and contains part of the host', async () => {

    let result = await httpAPI.get(REQUEST_URL + '/local/localhost/', 'x', {'x-test': 'true'});

    expect(result).to.exist;
    expect(result.statusCode).to.equal(200);
    expect(result.headers).to.haveOwnProperty('x-functionscript');
    expect(result.headers['content-type'].split(';')[0]).to.equal('application/json');
    expect(result.data).to.exist;
    expect(result.data).to.be.an('object');
    expect(result.data.http.headers['content-type'].split(';')[0]).to.equal('application/json');
    expect(result.data.http.method).to.equal('GET');
    expect(result.data.http.body).to.equal('');
    expect(result.data.http.headers['authorization']).to.equal('Bearer x');
    expect(result.data.http.headers['x-test']).to.equal('true');

  });

});

describe('io.del', async () => {

  // request - DELETE

  it ('Should make a DELETE request', async () => {

    let result = await httpAPI.del(REQUEST_URL);

    expect(result).to.exist;
    expect(result.statusCode).to.equal(200);
    expect(result.headers).to.haveOwnProperty('x-functionscript');
    expect(result.headers['content-type'].split(';')[0]).to.equal('application/json');
    expect(result.data).to.exist;
    expect(result.data).to.be.an('object');
    expect(result.data.http.headers['content-type'].split(';')[0]).to.equal('application/json');
    expect(result.data.http.method).to.equal('DELETE');
    expect(result.data.http.body).to.equal('');

  });

  it ('Should make a DELETE request and send Authorization: Bearer header', async () => {

    let result = await httpAPI.del(REQUEST_URL, 'x');

    expect(result).to.exist;
    expect(result.statusCode).to.equal(200);
    expect(result.headers).to.haveOwnProperty('x-functionscript');
    expect(result.headers['content-type'].split(';')[0]).to.equal('application/json');
    expect(result.data).to.exist;
    expect(result.data).to.be.an('object');
    expect(result.data.http.headers['content-type'].split(';')[0]).to.equal('application/json');
    expect(result.data.http.method).to.equal('DELETE');
    expect(result.data.http.body).to.equal('');
    expect(result.data.http.headers['authorization']).to.equal('Bearer x');

  });

  it ('Should make a DELETE request and send Authorization: Basic header', async () => {

    let result = await httpAPI.del(REQUEST_URL, 'Basic x');

    expect(result).to.exist;
    expect(result.statusCode).to.equal(200);
    expect(result.headers).to.haveOwnProperty('x-functionscript');
    expect(result.headers['content-type'].split(';')[0]).to.equal('application/json');
    expect(result.data).to.exist;
    expect(result.data).to.be.an('object');
    expect(result.data.http.headers['content-type'].split(';')[0]).to.equal('application/json');
    expect(result.data.http.method).to.equal('DELETE');
    expect(result.data.http.body).to.equal('');
    expect(result.data.http.headers['authorization']).to.equal('Basic x');

  });

  it ('Should make a DELETE request and send Authorization: Bearer and other headers', async () => {

    let result = await httpAPI.del(REQUEST_URL, 'x', {'x-test': 'true'});

    expect(result).to.exist;
    expect(result.statusCode).to.equal(200);
    expect(result.headers).to.haveOwnProperty('x-functionscript');
    expect(result.headers['content-type'].split(';')[0]).to.equal('application/json');
    expect(result.data).to.exist;
    expect(result.data).to.be.an('object');
    expect(result.data.http.headers['content-type'].split(';')[0]).to.equal('application/json');
    expect(result.data.http.method).to.equal('DELETE');
    expect(result.data.http.body).to.equal('');
    expect(result.data.http.headers['authorization']).to.equal('Bearer x');
    expect(result.data.http.headers['x-test']).to.equal('true');

  });

  it ('Should make a DELETE request and send Authorization: Bearer and other headers + send queryParams', async () => {

    let result = await httpAPI.del(REQUEST_URL, 'x', {'x-test': 'true'}, {'hello': 'world'});

    expect(result).to.exist;
    expect(result.statusCode).to.equal(200);
    expect(result.headers).to.haveOwnProperty('x-functionscript');
    expect(result.headers['content-type'].split(';')[0]).to.equal('application/json');
    expect(result.data).to.exist;
    expect(result.data).to.be.an('object');
    expect(result.data.http.headers['content-type'].split(';')[0]).to.equal('application/json');
    expect(result.data.http.method).to.equal('DELETE');
    expect(result.data.http.body).to.equal('');
    expect(result.data.http.headers['authorization']).to.equal('Bearer x');
    expect(result.data.http.headers['x-test']).to.equal('true');
    expect(result.data.params.hello).to.equal('world');

  });

});

describe('io.post', async () => {

  // request - POST

  it ('Should make a POST request', async () => {

    let result = await httpAPI.post(REQUEST_URL);

    expect(result).to.exist;
    expect(result.statusCode).to.equal(200);
    expect(result.headers).to.haveOwnProperty('x-functionscript');
    expect(result.headers['content-type'].split(';')[0]).to.equal('application/json');
    expect(result.data).to.exist;
    expect(result.data).to.be.an('object');
    expect(result.data.http.headers['content-type'].split(';')[0]).to.equal('application/json');
    expect(result.data.http.method).to.equal('POST');
    expect(result.data.http.body).to.equal('{}');

  });

  it ('Should make a POST request and send Authorization: Bearer header', async () => {

    let result = await httpAPI.post(REQUEST_URL, 'x');

    expect(result).to.exist;
    expect(result.statusCode).to.equal(200);
    expect(result.headers).to.haveOwnProperty('x-functionscript');
    expect(result.headers['content-type'].split(';')[0]).to.equal('application/json');
    expect(result.data).to.exist;
    expect(result.data).to.be.an('object');
    expect(result.data.http.headers['content-type'].split(';')[0]).to.equal('application/json');
    expect(result.data.http.method).to.equal('POST');
    expect(result.data.http.body).to.equal('{}');
    expect(result.data.http.headers['authorization']).to.equal('Bearer x');

  });

  it ('Should make a POST request and send Authorization: Basic header', async () => {

    let result = await httpAPI.post(REQUEST_URL, 'Basic x');

    expect(result).to.exist;
    expect(result.statusCode).to.equal(200);
    expect(result.headers).to.haveOwnProperty('x-functionscript');
    expect(result.headers['content-type'].split(';')[0]).to.equal('application/json');
    expect(result.data).to.exist;
    expect(result.data).to.be.an('object');
    expect(result.data.http.headers['content-type'].split(';')[0]).to.equal('application/json');
    expect(result.data.http.method).to.equal('POST');
    expect(result.data.http.body).to.equal('{}');
    expect(result.data.http.headers['authorization']).to.equal('Basic x');

  });

  it ('Should make a POST request and send Authorization: Bearer and other headers', async () => {

    let result = await httpAPI.post(REQUEST_URL, 'x', {'x-test': 'true'});

    expect(result).to.exist;
    expect(result.statusCode).to.equal(200);
    expect(result.headers).to.haveOwnProperty('x-functionscript');
    expect(result.headers['content-type'].split(';')[0]).to.equal('application/json');
    expect(result.data).to.exist;
    expect(result.data).to.be.an('object');
    expect(result.data.http.headers['content-type'].split(';')[0]).to.equal('application/json');
    expect(result.data.http.method).to.equal('POST');
    expect(result.data.http.body).to.equal('{}');
    expect(result.data.http.headers['authorization']).to.equal('Bearer x');
    expect(result.data.http.headers['x-test']).to.equal('true');

  });

  it ('Should make a POST request and send Authorization: Bearer and other headers + send params', async () => {

    let result = await httpAPI.post(REQUEST_URL, 'x', {'x-test': 'true'}, {'hello': 'world'});

    expect(result).to.exist;
    expect(result.statusCode).to.equal(200);
    expect(result.headers).to.haveOwnProperty('x-functionscript');
    expect(result.headers['content-type'].split(';')[0]).to.equal('application/json');
    expect(result.data).to.exist;
    expect(result.data).to.be.an('object');
    expect(result.data.http.headers['content-type'].split(';')[0]).to.equal('application/json');
    expect(result.data.http.method).to.equal('POST');
    expect(result.data.http.body).to.equal('{"hello":"world"}');
    expect(result.data.http.headers['authorization']).to.equal('Bearer x');
    expect(result.data.http.headers['x-test']).to.equal('true');
    expect(result.data.params.hello).to.equal('world');

  });

  it ('Should make a POST request to an endpoint that returns nothing with a 204', async () => {

    let result = await httpAPI.post(REQUEST_URL + '/return_204/');

    expect(result).to.exist;
    expect(result.statusCode).to.equal(204);
    expect(result.headers).to.haveOwnProperty('x-functionscript');
    expect(result.data).to.not.exist;

  });

});

describe('io.upload', async () => {

  // request - POST (multipart/form-data)

  it ('Should make an .upload() POST request with content-type multipart/form-data', async () => {

    let result = await httpAPI.upload(REQUEST_URL);

    expect(result).to.exist;
    expect(result.statusCode).to.equal(200);
    expect(result.headers).to.haveOwnProperty('x-functionscript');
    expect(result.headers['content-type'].split(';')[0]).to.equal('application/json');
    expect(result.data).to.exist;
    expect(result.data).to.be.an('object');
    expect(result.data.http.headers['content-type'].split(';')[0]).to.equal('multipart/form-data');
    expect(result.data.http.method).to.equal('POST');
    expect(result.data.http.body).to.equal('');

  });

  it ('Should make an .upload() POST request and send Authorization: Bearer header', async () => {

    let result = await httpAPI.upload(REQUEST_URL, 'x');

    expect(result).to.exist;
    expect(result.statusCode).to.equal(200);
    expect(result.headers).to.haveOwnProperty('x-functionscript');
    expect(result.headers['content-type'].split(';')[0]).to.equal('application/json');
    expect(result.data).to.exist;
    expect(result.data).to.be.an('object');
    expect(result.data.http.headers['content-type'].split(';')[0]).to.equal('multipart/form-data');
    expect(result.data.http.method).to.equal('POST');
    expect(result.data.http.body).to.equal('');
    expect(result.data.http.headers['authorization']).to.equal('Bearer x');

  });

  it ('Should make an .upload() POST request and send Authorization: Basic header', async () => {

    let result = await httpAPI.upload(REQUEST_URL, 'Basic x');

    expect(result).to.exist;
    expect(result.statusCode).to.equal(200);
    expect(result.headers).to.haveOwnProperty('x-functionscript');
    expect(result.headers['content-type'].split(';')[0]).to.equal('application/json');
    expect(result.data).to.exist;
    expect(result.data).to.be.an('object');
    expect(result.data.http.headers['content-type'].split(';')[0]).to.equal('multipart/form-data');
    expect(result.data.http.method).to.equal('POST');
    expect(result.data.http.body).to.equal('');
    expect(result.data.http.headers['authorization']).to.equal('Basic x');

  });

  it ('Should make an .upload() POST request and send Authorization: Bearer and other headers', async () => {

    let result = await httpAPI.upload(REQUEST_URL, 'x', {'x-test': 'true'});

    expect(result).to.exist;
    expect(result.statusCode).to.equal(200);
    expect(result.headers).to.haveOwnProperty('x-functionscript');
    expect(result.headers['content-type'].split(';')[0]).to.equal('application/json');
    expect(result.data).to.exist;
    expect(result.data).to.be.an('object');
    expect(result.data.http.headers['content-type'].split(';')[0]).to.equal('multipart/form-data');
    expect(result.data.http.method).to.equal('POST');
    expect(result.data.http.body).to.equal('');
    expect(result.data.http.headers['authorization']).to.equal('Bearer x');
    expect(result.data.http.headers['x-test']).to.equal('true');

  });

  it ('Should make an .upload() POST request and send Authorization: Bearer and other headers + send params', async () => {

    let buffer = Buffer.from('some_data');
    let result = await httpAPI.upload(REQUEST_URL, 'x', {'x-test': 'true'}, {'hello': 'world', 'buf': buffer});

    expect(result).to.exist;
    expect(result.statusCode).to.equal(200);
    expect(result.headers).to.haveOwnProperty('x-functionscript');
    expect(result.headers['content-type'].split(';')[0]).to.equal('application/json');
    expect(result.data).to.exist;
    expect(result.data).to.be.an('object');
    expect(result.data.http.headers['content-type'].split(';')[0]).to.equal('multipart/form-data');
    expect(result.data.http.method).to.equal('POST');
    expect(result.data.http.body).to.be.a('string').and.satisfy(str => str.startsWith('--'));
    expect(result.data.http.headers['authorization']).to.equal('Bearer x');
    expect(result.data.http.headers['x-test']).to.equal('true');
    expect(result.data.params.hello).to.equal('world');
    expect(result.data.params.buf).to.be.an('object');
    expect(result.data.params.buf._base64).to.equal(buffer.toString('base64'));

  });

  it ('Should make an .upload() POST request to an endpoint that returns nothing with a 204', async () => {

    let result = await httpAPI.upload(REQUEST_URL + '/return_204/');

    expect(result).to.exist;
    expect(result.statusCode).to.equal(204);
    expect(result.headers).to.haveOwnProperty('x-functionscript');
    expect(result.data).to.not.exist;

  });

});
