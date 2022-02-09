const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

router.get("/allcourses", authorization, async (req, res) => {
  try {
    const courses = await pool.query("Select * from course");
    res.json(courses.rows);
    console.log(courses.rows);
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Server Error");
  }
});

router.post("/addnewcourse", authorization, async (req, res) => {
  try {
    const {
      course_code,
      course_name,
      teacher_email,
      credit_hours,
      teacher_name,
    } = req.body;
    const courses = await pool.query(
      "INSERT INTO course(course_code , course_name , credit_hours , teacher_email,teacher_name ) VALUES ($1 , $2 , $3 , $4 , $5)",
      [course_code, course_name, credit_hours, teacher_email, teacher_name]
    );
    res.json(courses.rows);
    console.log(courses.rows);
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Server Error");
  }
});

router.post("/addcoursetoregistration", authorization, async (req, res) => {
  try {
    const { course_code, course_name, credit_hours } = req.body;
    const courses = await pool.query(
      "INSERT INTO course_available(course_code , course_name,credit_hours ) VALUES ($1 , $2 , $3)",
      [course_code, course_name, credit_hours]
    );
    res.json(courses.rows);
    console.log(courses.rows);
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Server Error");
  }
});

router.get("/coursesforregister", authorization, async (req, res) => {
  try {
    const courses = await pool.query("Select * from course_available");
    res.json(courses.rows);
    console.log(courses.rows);
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Server Error");
  }
});

router.post("/registernewcourse", authorization, async (req, res) => {
  try {
    const { student_id, course_code } = req.body;

    const check = await pool.query(
      "Select * from course_register where student_id = $1 and course_code = $2",
      [student_id, course_code]
    );

    if (check.rows.length !== 0) {
      return res.status(500).json("Already Enrolled");
    }

    const courses = await pool.query(
      "Insert into course_register (student_id , course_code) Values($1 , $2)",
      [student_id, course_code]
    );
  } catch (err) {
    console.log(err.message);
  }
});

router.get("/registeredcourses", authorization, async (req, res) => {
  try {
    const courses = await pool.query("Select * from course_register ");
    res.json(courses.rows);
    console.log(courses.rows);
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Server Error");
  }
});

router.get("/registeredbystudent", authorization, async (req, res) => {
  const { student_id } = req.body;
  try {
    const courses = await pool.query(
      "Select * from course_register where student_id = $1",
      [student_id]
    );
    res.json(courses.rows);
    console.log(courses.rows);
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
