const express = require("express");
const cors = require("cors");
const { createServer } = require("http");

const app = express();
const server = createServer(app);
const mainRoute = require("./routes/routes");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

api.use("/api", mainRoute);

// === Root path ===
app.get("/", (req, res) => {
  res.status(200).json({
    status: true,
    message: `🚀 Server is running on http://${process.env.HOST}:${process.env.PORT}`,
  });
});

// === Catch-all 404 (tanpa '*') ===
app.use((req, res) => {
  res.status(404).json({
    status: false,
    message: "Endpoint not found",
  });
});

module.exports = { app, server };
