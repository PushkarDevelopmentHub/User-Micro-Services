const express = require("express");
const expressProxy = require("express-http-proxy");

const app = express();

// Proxy all routes to the user service
app.use("/user", expressProxy("http://localhost:3001"));
// Proxy all routes to the captain service
app.use("/captain", expressProxy("http://localhost:3002"));
// Proxy all routes to the ride service
app.use("/ride", expressProxy("http://localhost:3003"));

app.listen(3000, () => {
  console.log("API Gateway is running on port 3000");
});
