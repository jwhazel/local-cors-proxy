# local-cors-proxy
A simple local server that can proxy remotes resources and return the response with the proper `Access-Control-Allow-Origin: *` cors header. Useful for local development where you don't have any control over remote resources and their cors options.

## setup
`npm install` install all dependecies
`npm run serve` run the server

## use
The server has 2 parameters:
`q={string}` - the resource you're trying to proxy
`json={boolean}` - (optional) will force the response to be in JSON format

## examples
http://localhost:1234/?q=https://baconipsum.com/api/?type=meat-and-filler

http://localhost:1234/?q=https://google.com

http://localhost:1234/?q=https://google.com&json=true