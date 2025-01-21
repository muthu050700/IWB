const jsonServer = require("json-server");
const path = require("path");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults({
  static: "./dist", // Specify the directory where React build files are located
});

const PORT = 5000;
console.log(PORT);
// Middleware to serve React build and JSON API under `/work-book`
server.use((req, res, next) => {
  if (req.url.startsWith("/work-book")) {
    req.url = req.url.replace("/work-book", ""); // Adjust the path for static files and API
    return middlewares(req, res, () => router(req, res, next));
  }
  next();
});

// Fallback for unmatched routes
server.use((req, res) => {
  res.status(404).send("Not Found");
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/work-book`);
});
