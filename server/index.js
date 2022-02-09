const express = require("express");
const cors = require("cors");
const app = express();

//
app.use(express.json()); // req.body to access data in string or json obj from client side
app.use(cors());

//Routes
//Login Route
app.use("/auth", require("./routes/jwtAuth"));

//student homepage Route
app.use("/stdhomepage", require("./routes/stdhomepage"));
app.use("/studentmarks", require("./routes/allstudentmarks"));
app.use("/teacherhomepage", require("./routes/teacherhomepage"));
app.use("/adminhomepage", require("./routes/adminhomepage"));
app.use("/courses", require("./routes/courses"));
// app.use("/attendance", require("./routes/attendance"));

app.listen(3001, () => {
  console.log("server is running on port 3001");
});
