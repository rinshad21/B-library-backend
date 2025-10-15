const express = require("express");
const app = express();
require("dotenv").config();
const connectToDB = require("./database/db");
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const bodyParser = require("body-parser");
//routes
const authRoutes = require("./Routes/AuthRouter");
const bookRouter = require("./Routes/bookRouter");
const orderRouter = require("./Routes/orderRoutes");
const adminRoutes = require("./stats/adminStats");
//connecting to database
connectToDB();

//middlewear
app.use(bodyParser.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://b-library.vercel.app"],
    credentials: true,
  })
);
//routes

app.use("/auth", authRoutes);
app.use("/api/books", bookRouter);
app.use("/api/orders", orderRouter);
app.use("/api/admin", adminRoutes);

app.use("/", (req, res) => {
  res.send("b-library Server is running!");
});

app.listen(PORT, () => {
  console.log(`server running at ${PORT}`);
});
