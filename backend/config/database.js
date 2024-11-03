const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = () => {
  mongoose
    .connect(process.env.MONDODB_URL)
    .then(() => {
      console.log("DB connection is success");
    })
    .catch((err) => {
      console.log("error in DB connection", err);
    });
};

module.exports = dbConnect;
