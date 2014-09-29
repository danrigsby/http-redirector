# Html-Redirector

A small NodeJS server to redirect all traffic to a new site

# Install and Run

```bash
$ npm install -g redis-commander
$ node app.js -t 'https://www.MYBASEADDRESS.com'
```

# Usage

```bash
$ node app.js --help
Options:
  -h, --help                 output usage information
  -r, --redirectTo <path>    The base url to redirect to
  -p, --port <port>          The port to run on [3000]
  -c, --redirectCode <code>  The http redirect method to use [301]
  -P, --noPing               Do not ignore calls to /ping.html
```
