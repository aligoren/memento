# Node Res

![](http://i1117.photobucket.com/albums/k594/thetutlage/poppins-1_zpsg867sqyl.png)

![](https://img.shields.io/travis/poppinss/node-res.svg)
[![Coverage Status](https://coveralls.io/repos/poppinss/node-res/badge.svg?branch=master&service=github)](https://coveralls.io/github/poppinss/node-res?branch=master)

`node-res` exposes helper methods to constructor different http response. It supports almost every method from `express` but is just an I/O module.


## See also

1. node-req
2. node-cookie

## Responding to requests.

```javascript
const http = require('http')
const nodeRes = require('node-res')

http.createServer(function (req, res) {
  
  // plain text
  nodeRes.send(req, res, "Hello world")

  // json
  nodeRes.json(req, res, {time:"now"})

  // jsonp
  nodeRes.jsonp(req, res, {time:"now"}, "callback")

}).listen(3000)

```

nodeRes takes http server `res` object as first argument to perform any operation.

## Methods

#### header (res, key, value)

```javascript
nodeRes.header(res, 'Content-Type', 'text/html')
```

#### type (res, type, [charset=utf-8])

This method will set the content type by doing a lookup on the given type and sets `charset=utf-8` by default.

```javascript
nodeRes.type(res, 'html')
```

#### removeHeader (res, key)

```
nodeRes.removeHeader(res, 'Content-type')
```

#### getHeader (res, key)

```
nodeRes.getHeader(res, 'Content-type')
```

#### status (res, statusCode)

```javascript
nodeRes.status(res, 200)
```

#### send(req, res, body)

```javascript
nodeRes.send(req, res, {user:"someone"})
```

#### json (req, res, body)
`send` method is fully capable of making json responses, it is an alias method for readability.

```javascript
nodeRes.json(req, res, {user:"someone"})
```

#### jsonp (req, res, body, callback="callback")

```javascript
nodeRes.jsonp(req, res, {user:"someone"}, "angular")
```

#### download (req, res, filePath)

```javascript
nodeRes.download(req, res, 'fullPathToFile')
```

#### attachment (req, res, filePath, name?, disposition=attachment?)

force download

```javascript
nodeRes.attachment(req, res, 'fullPathToFile')
nodeRes.attachment(req, res, 'fullPathToFile', 'downloadName')
nodeRes.attachment(req, res, 'fullPathToFile', 'downloadName', 'disposition=attachment')
```

#### location (res, url)

sets location header on request

```javascript
nodeRes.location(res, 'http://example.org')
```

#### redirect (req, res, url, status=302?)

redirects to given url after setting location header

```javascript
nodeRes.redirect(res, 'http://example.com', 301)
```

#### vary (res, field)

Adds vary header to response, if it is not there already.

```javascript
nodeRes.vary(res, 'Accept')
```

#### descriptive methods
Node res also has support for descriptive methods, they set the status itself without calling the `status` method.

```javascript
nodeRes.ok(req, res, 'Hello world') // will set 200 as status
nodeRes.unauthorized(req, res, 'You must login first') // will set 401 as status
```

| method | http response status |
|--------|-------------|
| continue | 100 |
| switchingProtocols | 101 |
| ok | 200 |
| created | 201 |
| accepted | 202 |
| nonAuthoritativeInformation | 203 |
| noContent | 204 |
| resetContent | 205 |
| partialContent | 206 |
| multipleChoices | 300 |
| movedPermanently | 301 |
| found | 302 |
| seeOther | 303 |
| notModified | 304 |
| useProxy | 305 |
| temporaryRedirect | 307 |
| badRequest | 400 |
| unauthorized | 401 |
| paymentRequired | 402 |
| forbidden | 403 |
| notFound | 404 |
| methodNotAllowed | 405 |
| notAcceptable | 406 |
| proxyAuthenticationRequired | 407 |
| requestTimeout | 408 |
| conflict | 409 |
| gone | 410 |
| lengthRequired | 411 |
| preconditionFailed | 412 |
| requestEntityTooLarge | 413 |
| requestUriTooLong | 414 |
| unsupportedMediaType | 415 |
| requestedRangeNotSatisfiable | 416 |
| expectationFailed | 417 |
| unprocessableEntity | 422 |
| tooManyRequests | 429 |
| internalServerError | 500 |
| notImplemented | 501 |
| badGateway | 502 |
| serviceUnavailable | 503 |
| gatewayTimeout | 504 |
| httpVersionNotSupported | 505 |

## License 
(The MIT License)

Copyright (c) 2015 Poppins

Permission is hereby granted, free of charge, to any person obtaining a
copy of this software and associated documentation files (the "Software"),
to deal in the Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense,
and/or sell copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE 
