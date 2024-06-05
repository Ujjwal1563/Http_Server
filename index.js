const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req, res) => {
    const log = `${Date.now()}: ${req.method} ${req.url} New Req Received\n`;
    const myUrl = url.parse(req.url, true);
    console.log(myUrl);

    fs.appendFile("log.txt", log, (err) => {
        if (err) {
            res.statusCode = 500;
            res.end("Internal Server Error");
            return;
        }

        switch (myUrl.pathname) {
            case '/':
                if (req.method === "GET") {
                    res.end("HomePage");
                }
                break;
            case '/about':
                const username = myUrl.query.myname;
                res.end(`Hi, ${username}`);
                break;
            case '/search':
                const search = myUrl.query.search_query;
                res.end("Here are your results for " + search);
                break;
            case '/signup':
                if (req.method === "GET") {
                    res.end("This is a signup form");
                } else if (req.method === "POST") {
                    res.end("Success");
                }
                break;
            default:
                res.end("404 Not Found");
                break;
        }
    });
});

myServer.listen(8000, () => console.log("Server Started!"));
