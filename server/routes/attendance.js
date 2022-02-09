const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

router.post("/addattendence", authorization, async (req, res) => {
  try {
    const { student_id, course_code, attendancedate, attended } = req.body;
    const check = pool.query(
      "Select * from Attendance where student_id = $1 and course_code = $2 and attandancedate = $3",
      [student_id, course_code, attendancedate]
    );
    const attendance = pool.query(
      "Insert into attendace (student_id , course_code , attendancedate , attended ) Values($1 , $2 , $3 , $4",
      [student_id, course_code, attendancedate, attended]
    );
    res.json(attendance.rows);
    console.log(attendance.rows);
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Server Error");
  }
});

router.get("/allattendances", authorization, async (req, res) => {
  try {
    const { student_id, course_code, attendancedate, attended } = req.body;
    const check = pool.query(
      "Select * from Attendance where student_id = $1 and course_code = $2 and attandancedate = $3",
      [student_id, course_code, attendancedate]
    );
    console.log(check.rows);
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Server Error");
  }
});
