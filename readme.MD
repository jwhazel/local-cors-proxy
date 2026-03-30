# Local CORS Proxy ⚙️

A simple local server that can proxy remote resources and return the response with the proper `Access-Control-Allow-Origin: *` cors header. Useful for local frontend development where you don't have any control over remote resources and their cors options.

## Setup

This is a dependency free script. You can run it in one of two ways:

### Easy

- `npx github:jwhazel/local-cors-proxy` - runs it locally without having to do anything else

### Clone the repo

- `git clone https://github.com/jwhazel/local-cors-proxy` - downloads the repo
- `cd local-cors-proxy` - move into the directory
- `npm run serve` - run the server

In either case, you can override the default port by passing in your own at the start of the script like so `PORT=8080 npx/npm run...`

## Use

The server has 2 parameters:

- `url={string}` - the url you want to proxy
- `contentType={string}` - (optional) will override the response to be in whatever format you want without altering the body. This is for really weird edge cases where you're dealing with old/inept servers that might be serving up something like JSON or XML, but return it as `Content-Type: text/plain`

## HTTP Verb

The server will accept any verb (GET/POST/PUT/PATCH/DELETE) and automatically use that in the destination request.

## Headers

The server transparently passes all headers to the destination. Useful for authentication.

## Examples

http://localhost:1234/?url=https://baconipsum.com/api/?type=meat-and-filler

http://localhost:1234/?url=https://google.com

http://localhost:1234/?url=https://google.com&contentType=application/json

## Security

Note that this disables TLS certificate validation on all proxied requests. It's done intentionally for local development. You would never use something like this for production.
