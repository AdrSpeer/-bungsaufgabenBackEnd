const http = require("http");
const fs = require("fs");
const { readFile } = require("./filestystem");

const errorPage = fs.readFileSync("./public/pages/error.html");

const server = http.createServer((request, response) => {
  console.log("new request:", request.method, request.url);

  if (request.method !== "GET") {
    response.write(errorPage);
    return;
  }

  const filePath =
    request.url === "/" || request.url === "/home"
      ? "./public/pages/home.html"
      : `./public/${request.url}`;

  readFile(filePath)
    .then((dataBuffer) => {
      response.write(dataBuffer);
      response.end();
    })
    .catch((err) => {
      console.log(err);
      response.end(errorPage);
    });
});

const PORT = 3003;
server.listen(PORT, () => console.log("server ready at port:", PORT));
