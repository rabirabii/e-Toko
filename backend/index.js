const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const multer = require("multer");
const Sequalize = require("./database/db");

const { uploadAvatar, uploadProductImages } = require("./utils/multer");

// Import Routes
const Auth = require("./routes/Auth");
const Customer = require("./routes/Customer");
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "config/.env",
  });
}
console.log("JWT_SECRET:", process.env.JWT_SECRET_KEY);
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "images")));
const PORT = process.env.Port;

Sequalize.sync({ force: false })
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.log("Error while connecting with database : ", error);
  });

app.post("/upload/avatar", uploadAvatar.single("avatar"), (req, res) => {
  if (req.file) {
    res.send("Avatar uploaded successfully.");
  } else {
    res.status(400).send("Avatar upload failed.");
  }
});

app.post("/upload/product-images", (req, res) => {
  uploadProductImages(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).send(err.message);
    } else if (err) {
      return res.status(500).send(err);
    }
    res.send("Product images uploaded successfully.");
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

app.use("/api/auth", Auth);
app.use("/api/customer", Customer);
