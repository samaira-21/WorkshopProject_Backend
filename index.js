const express = require("express");
const productRouter = require("./Routes/productRoutes")
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());
const dotenv = require("dotenv");
dotenv.config({ path:"./.config.env"})

mongoose.connect(process.env.DB_URL)
.then(() => {
  console.log("DB Connected successfully");
})
.catch((err) => {
  console.log(err);
})


app.use((req, res, next) => {
  const now = new Date();
  req.requestTimeOfHit = now.toLocaleString();
  next();
});

app.use("/api/v1/products", productRouter)

app.listen(process.env.PORT_No, () => {
  console.log("Server running on port: ", process.env.PORT_No);
})