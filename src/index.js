const express = require("express");
require("./db/mongoose");

const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);

app.listen(port, () => {
  console.log("Server is ip on port " + port);
});
