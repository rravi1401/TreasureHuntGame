const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoute = require("./routes/auth");
const quesRoute = require("./routes/ques");
const leaderBoardRoute = require("./routes/leaderboard");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/ques", quesRoute);
app.use("/api/leaderBoard", leaderBoardRoute);

app.listen(process.env.PORT || 8000, () => {
  console.log("Backend Server Running !");
});
