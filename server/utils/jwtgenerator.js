require("dotenv").config();
const jwt = require("jsonwebtoken");

function jwtgenerator(student_id) {
  const payload = {
    student: student_id,
  };
  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "1hr" });
}

module.exports = jwtgenerator;
