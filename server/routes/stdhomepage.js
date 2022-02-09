const router = require("express").Router();

const pool = require("../db");
const authorization = require("../middleware/authorization");

router.get("/", authorization, async (req, res) => {
  try {
    console.log(req.student);
    const student = await pool.query(
      "Select * from student where student_id = $1",
      [req.student]
    );
    res.json(student.rows[0]);
    // const student =
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Server Error");
  }
});

router.post("/registercourse", authorization, async (req, res) => {
  try {
    const { course_code, student_id } = req.body;
    const check = await pool.query(
      "Select * from course_register where student_id = $1 and course_code = $2",
      [student_id, course_code]
    );
    if (check.rows.length !== 0) {
      res.status(500).json("You have already registered this course");
    }
    const courses = await pool.query(
      "INSERT INTO course_register(course_code , student_id ) VALUES ($1 , $2 )",
      [course_code, student_id]
    );
    res.json(courses.rows);
    console.log(courses.rows);
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
