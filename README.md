# http2-example
This repo is connected with my presentation : https://docs.google.com/presentation/d/1TkhmohFgk0Ctyd-ssPdFAWan0srCz7Ss5fmT3R0sWkQ/edit#slide=id.p
Example shows how to implement server in NodeJs that uses HTTP/2 protocol.
I'm running it on node v8.9.0 - it needs to be run with --expose-http2 flag

run `npm i` first, then `npm start`

There are two endpoint in this example:
'/nopush' - it loads index.html
'/' - it loads index.html but first pushes styles.css - check out how it differs in load time
