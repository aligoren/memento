# Node Csp

![](http://i1117.photobucket.com/albums/k594/thetutlage/poppins-1_zpsg867sqyl.png)

![](https://img.shields.io/travis/poppinss/node-csp.svg?style=flat-square)
[![Coverage Status](https://img.shields.io/coveralls/poppinss/node-csp/master.svg?style=flat-square)](https://coveralls.io/github/poppinss/node-csp?branch=master)
[![License](https://img.shields.io/npm/l/node-csp.svg?style=flat-square)](https://opensource.org/licenses/MIT)

Node Csp is a general purpose module to add `Content Security Policy` header to your http response. It can be used with any node http server.

## Features

1. Cross Browser support as per http://caniuse.com/#feat=contentsecuritypolicy
2. Supports all directives using http://content-security-policy.com/
3. Has support for `nonce`
4. Fully tested.

## Vanilla Http Server

```javascript
const http = require('http')
const csp = require('node-csp')
const fs = require('fs')

const options = {
  directives: {
    defaultSrc: ['self'],
    scriptSrc: ['self', 'cdnjs.cloudflare.com', '@nonce']
  },
  nonce: '614d9122-d5b0-4760-aecf-3a5d17cf0ac9' // make sure to have unique nonce for each request
}

http.createServer(function (req, res) {
  const html = fs.readFile(__dirname + '/index.html', function (err, contents) {
    csp.add(req, res, options)
    res.writeHead(200)
    res.write(contents)
    res.end()
  })
}).listen(4000)

```

## Options

```javascript
{
   directives: {
    defaultSrc: ['self'],
    scriptSrc: ['@nonce'],
    styleSrc: ['self', 'cdnjs.cloudflare.com'],
    ...
   },
   nonce: '614d9122-d5b0-4760-aecf-3a5d17cf0ac9',
   reportOnly: false, // only set reporty only headers
   setAllHeaders: false, // sets all csp headers as per http://content-security-policy.com/
   disableAndroid: false // csp is buggy on android
}
```

## The MIT License
Copyright (c) 2016 Harminder Virk

Permission is hereby granted, free of charge, to any person obtaining a
copy of this software and associated documentation files (the "Software"),
to deal in the Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense,
and/or sell copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
DEALINGS IN THE SOFTWARE.
 -->