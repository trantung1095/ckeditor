const express = require("express");
const bodyparser = require("body-parser");
const morgan = require("morgan");
const multiparty = require("connect-multiparty");
const cors = require("cors");

const MultipartyMiddleware = multiparty({ uploadDir: "./images" });

const PORT = process.env.PORT || 8000;

const app = express();

const whitelist = ["http://localhost:3000"];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Testing our server",
  });
});

app.use(bodyparser.urlencoded({ extended: true }));

app.use(bodyparser.json());

app.listen(PORT, () => {
  console.log(`Server has successfully started at : ${PORT}`);
});

app.post("/uploads", MultipartyMiddleware, (req, res) => {
  console.log(req.files.upload);
});
