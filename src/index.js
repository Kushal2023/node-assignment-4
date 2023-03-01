const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 5000;
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
// your code goes here

app.get("/", async (req, res) => {
  res.send("Hello, world!");
});

const errorCheck = (req, res, next) => {
  const { num1, num2 } = req.body;
  const M = 1000000;
  if (typeof num1 !== "number" || typeof num2 !== "number") {
    res.send({ status: "error", message: "Invalid data types" });
  } else if (num1 < -M || num2 < -M) {
    res.send({ status: "error", message: "Underflow" });
  } else if (num1 > M || num2 > M) {
    res.send({ status: "error", message: "Overflow" });
  } else {
    next();
  }
};

app.post("/add", errorCheck, (req, res) => {
  const M = 1000000;
  const { num1, num2 } = req.body;
  if (num1 + num2 > M) {
    res.send({ status: "error", message: "Overflow" });
  } else if (num1 + num2 < -M) {
    res.send({ status: "error", message: "Underflow" });
  } else {
    res.send({
      status: "success",
      message: "the sum of given two numbers",
      sum: num1 + num2,
    });
  }
});

app.post("/sub", errorCheck, (req, res) => {
  const M = 1000000;
  const { num1, num2 } = req.body;
  if (num1 - num2 > M) {
    res.send({ status: "error", message: "Overflow" });
  } else if (num1 - num2 < -M) {
    res.send({ status: "error", message: "Underflow" });
  } else {
    res.send({
      status: "success",
      message: "the difference of given two numbers",
      difference: num1 - num2,
    });
  }
});

app.post("/multiply", errorCheck, (req, res) => {
  const M = 1000000;
  const { num1, num2 } = req.body;
  if (num1 * num2 > M) {
    res.send({ status: "error", message: "Overflow" });
  } else if (num1 * num2 < -M) {
    res.send({ status: "error", message: "Underflow" });
  } else {
    res.send({
      status: "success",
      message: "The product of given numbers",
      result: num1 * num2,
    });
  }
});

app.post("/divide", errorCheck, (req, res) => {
  const M = 1000000;
  const { num1, num2 } = req.body;
  if (num1 * num2 > M) {
    res.send({ status: "error", message: "Overflow" });
  } else if (num1 * num2 < -M) {
    res.send({ status: "error", message: "Underflow" });
  } else if (num2 === 0) {
    res.send({ status: "error", message: "Cannot divide by zero" });
  } else {
    res.send({
      status: "success",
      message: "The division of given numbers",
      result: num1 / num2,
    });
  }
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
