const http = require("http");
const { readFile } = require("./filestystem.js");

const server = http.createServer((request, response) => {
  if (
    request.method === "GET" &&
    (request.url === "/" || request.url === "/home")
  ) {
    readFile("./public/pages/home.html")
      .then((dataBuffer) => {
        response.write(dataBuffer);
        response.end();
      })
      .catch((err) => {
        console.log(err);
        response.end("Internal Server Error");
      });
  } else if (request.method === "GET" && request.url === "/about") {
    readFile("./public/pages/about.html")
      .then((dataBuffer) => {
        response.write(dataBuffer);
        response.end;
      })
      .catch((err) => {
        console.log(err);
        response.end("Internal Server Error");
      });
  } else if (request.method === "GET" && request.url === "/contact") {
    readFile("./public/pages/contact.html")
      .then((dataBuffer) => {
        response.write(dataBuffer);
        response.end();
      })
      .catch((err) => {
        console.log(err);
        response.end("Internal Server Error");
      });
  } else if (request.method === "GET" && request.url === "/faq") {
    readFile("./public/pages/faq.html")
      .then((dataBuffer) => {
        response.write(dataBuffer);
        response.end();
      })
      .catch((err) => {
        console.log(err);
        response.end("Internal Server Error");
      });
  } else if (request.method === "GET" && request.url === "/styles") {
    readFile("./public/css/styles.css")
      .then((dataBuffer) => {
        response.write(dataBuffer);
        response.end();
      })
      .catch((err) => {
        console.log(err);
        response.end("Internal Server error");
      });
  } else {
    response.end("Page not Found");
  }
});

const PORT = 3003;
server.listen(PORT, () => console.log("server ready at PORT:", PORT));
