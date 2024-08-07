require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const timeout = require("connect-timeout");
const server = require("http").createServer(app);

const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.DATABASEURL, { useNewUrlParser: true})
  .then((res) => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

// Webhook before bodyparser
app.use(`/webhook/stripe`, require("./routes/webhook/stripe"));

app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  cors({
    maxAge: 86400,
    preflightContinue: true,
    origin: [process.env.BASE_URL],
  })
);

app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.setHeader("Cache-Control", "public, max-age=86400");
    res.end();
  } else {
    next();
  }
});

app.use(timeout(29000));
app.use(haltOnTimedout);

function haltOnTimedout(req, res, next) {
  if (!req.timedout) {
    next();
  } else if (!res.headersSent) {
    return res.status(503).send('Service unavailable. Please retry.');
  }
}

app.use(`/checkout/stripe`, require("./routes/checkout/stripe"));
app.use(`/sales`, require("./routes/sales/index"));
app.use(`/sales/invoice`, require("./routes/sales/invoice"));

module.exports = app;

if (require.main === module) {
  const port = process.env.PORT || 5000;
  server.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`API server listening on port ${port}`);
  });
}
