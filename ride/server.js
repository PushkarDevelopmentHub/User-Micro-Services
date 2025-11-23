const http = require("http");
const app = require("./app");
const dotenv = require("dotenv");
dotenv.config();


const server = http.createServer(app);

server.listen(3003, () => {
  console.log("ride service is running on port 3003");
});
