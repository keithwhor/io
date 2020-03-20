# httpapi

**httpapi** is a simple Node.js HTTP wrapper for API calls.

Methods supported are...

```javascript
const httpapi = require('httpapi');

httpapi.request(method, url, queryParams = {}, headers = null, body = null);
httpapi.get(url, authorization = null, headers = null, queryParams = {});
httpapi.del(url, authorization = null, headers = null, queryParams = {});
httpapi.post(url, authorization = null, headers = null, params = {});
httpapi.put(url, authorization = null, headers = null, params = {});
```

## request

The `request` method takes a raw `body` string and sends no `content-type` by default.

It returns a result with the following schema;

```json
{
  "statusCode": 200,
  "headers": {},
  "body": ""
}
```

## get, del

The `get` and `del` methods will populate the URL querystring with `x-www-urlencoded`
values based on a `queryParams` object. They will send a
`content-type: application/json` header by default.

The `authorization` parameter will set the `authorization` HTTP header. If this
value begins with the strings `Basic ` or `Bearer `, the full value will be used.
Otherwise, `Bearer ` will be prepended. Sending `authorization = "x"`, for example,
will populate the `authorization` header with a value of `Bearer x`.

**NOTE:** If the requested resource does not return JSON data, an error will be thrown.

They return a result with the following schema;

```json
{
  "statusCode": 200,
  "headers": {},
  "data": {}
}
```

## post, put

The `post` and `put` methods will populate the post body with `application/json`
values based on a `params` object. They will send a
`content-type: application/json` header by default.

The `authorization` parameter will set the `authorization` HTTP header. If this
value begins with the strings `Basic ` or `Bearer `, the full value will be used.
Otherwise, `Bearer ` will be prepended. Sending `authorization = "x"`, for example,
will populate the `authorization` header with a value of `Bearer x`.

**NOTE:** If the requested resource does not return JSON data, an error will be thrown.

They return a result with the following schema;

```json
{
  "statusCode": 200,
  "headers": {},
  "data": {}
}
```

# Thanks!

&copy; 2020 Standard Library (Polybit Inc.)
