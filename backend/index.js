const cloudinary = require("cloudinary").v2;
const express = require("express");
const app = express();
const cors = require("cors");
const dbConnect = require("./config/database");
const routes = require("./routes/routes");
const bookingRoute = require("./routes/Booking");
require("dotenv").config();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.listen(PORT,(req,res)=>{
    console.log(`App started @ ${PORT}`);
})

cloudinary.config({ 
  cloud_name: 'dpftc2sdu', 
  api_key:  process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});
console.log(cloudinary.config());

app.use("/api/v1",routes);
app.use("/api/v1",bookingRoute);

dbConnect();
