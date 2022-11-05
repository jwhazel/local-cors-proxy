# Local CORS Proxy

A simple local server that can proxy remotes resources and return the response with the proper `Access-Control-Allow-Origin: *` cors header. Useful for local development where you don't have any control over remote resources and their cors options.

## Setup

- `npm install` install dependecies
- `npm run serve` run the server

## Use

The server has 2 parameters:

- `q={string}` - the url you want to proxy
- `json={boolean}` - (optional) will force the response to be in JSON format

## HTTP Verb
The server will accept any verb (GET/POST/PUT/PATCH/DELETE) and automatically use that in the destination request.

## Headers
The server transparently passes all headers to the destination. Useful for authentication.

## Examples

http://localhost:1234/?q=https://baconipsum.com/api/?type=meat-and-filler

http://localhost:1234/?q=https://google.com

http://localhost:1234/?q=https://google.com&json=true
