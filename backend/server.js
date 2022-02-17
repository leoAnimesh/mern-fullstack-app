// import packages
const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 5000;

// connect Db
require("./config/db")();

//global middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

//custom middlewares
app.use(require("./middlewares/handleErrors"));

//listing to the server
app.listen(PORT, () =>
  console.log(`[+] Server Running at port http://localhost:${PORT} `)
);
