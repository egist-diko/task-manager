const express = require("express");
require("./db/mongoose");

const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(express.json());
app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);

module.exports = app;
