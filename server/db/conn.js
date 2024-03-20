const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27019/Registration", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((e) => {
    console.log(e);
  });
