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
- `json={boolean}` - (optional) will force the response to be in JSON format. For the rare occasion when you're dealing with a site that returns JSON, but doesn't bother to set the proper `content-type` header.

## HTTP Verb

The server will accept any verb (GET/POST/PUT/PATCH/DELETE) and automatically use that in the destination request.

## Headers

The server transparently passes all headers to the destination. Useful for authentication.

## Examples

http://localhost:1234/?q=https://baconipsum.com/api/?type=meat-and-filler

http://localhost:1234/?q=https://google.com

http://localhost:1234/?q=https://google.com&json=true

## Security

Note that this disables TLS certificate validation on all proxied requests. It's done intentionally for local development. You would never use something like this in production.
