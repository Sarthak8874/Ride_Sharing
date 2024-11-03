const cloudinary = require("cloudinary").v2;
const express = require("express");
const app = express();
const cors = require("cors");
const dbConnect = require("./config/database");
const routes = require("./routes/routes");
const bookingRoute = require("./routes/Booking");
require("dotenv").config();
const PORT = process.env.PORT || 4000;

app.listen(PORT, (req, res) => {
  console.log(`App started @ ${PORT}`);
});

app.use(cors());
app.use(express.json());
const fileUpload = require("express-fileupload");
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/api/v1", routes);

dbConnect();
