// using http module given by node js inbuild creating a basic server
import http from 'http';
const PORT = 3000;
// console.log(http);
/*
 -> http module contain a function called as createServer
 -> this createServer function taker callback function as the input
 -> now this call back function takes two arguments :-
 ->  1) req= this arguments contains all the detail about incoming req
 ->  2) response= this arguments contains function using which we can prepare response

 -> the createServer function returns return a server object
 */

const server = http.createServer((req, response) => {
    console.log(req.method)
    if (req.url == "/faq") {
        response.end("list of faq");
    } else if (req.url == "/home") {
        response.end("home page");

    } else {
        response.end("default");

    }
});

// for starting a server 
server.listen(PORT, () => {
    // whwn the server will started the call back function execute
    console.log("server started on port", PORT);
});
