# CatLog

Cat log is a simple logging library based on npmlog and terminal flags.

### info

```javascript
const CatLog = require('cat-log')
const log = new CatLog()
log.info('some important information')

// node index.js
// -> info some important information
```

### warn

```javascript
const CatLog = require('cat-log')
const log = new CatLog()
log.warn('on fire')

// node index.js
// -> warn on fire
```

### error

```javascript
const CatLog = require('cat-log')
const log = new CatLog()
log.error('i cannot help now')

// node index.js
// -> err i cannot help now
```

## Using Flags

By default `Catlog` is initiated in `info` mode, which means `info, warn and error` will be displayed while logging. All other log levels are muted in info mode and you are expected to set specific modes while initiating class or pass terminal flags for same

### debug

```javascript
const CatLog = require('cat-log')
const log = new CatLog()
log.debug('debugging http request')

// node index.js --debug
// -> debug debugging http request
```


### verbose

```javascript
const CatLog = require('cat-log')
const log = new CatLog()
log.verbose('good to know')

// node index.js --verbose
// -> verbose good to know
```

### silly

```javascript
const CatLog = require('cat-log')
const log = new CatLog()
log.silly('ahhuh')

// node index.js --silly
// -> silly ahhuh
```

## Initiating with a given log level

Also you can initiate the class with a given log level instead of passing command line flags.

```javascript
const CatLog = require('cat-log')
const log = new CatLog('', 'silly')
log.silly('ahhuh')

// node index.js
// -> silly ahhuh
```


## Prefixing logs

```javascript
const CatLog = require('cat-log')
const log = new CatLog('adonis')
log.info('this is info')

// node index.js
// -> info adonis this is info
```

COPYRIGHT (c) 2015 <Harminder Virk>

MIT License

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
