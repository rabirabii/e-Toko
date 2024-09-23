require("dotenv").config({ path: "config/.env" });

exports.JWT_SECRET = process.env.JWT_SECRET_KEY;
