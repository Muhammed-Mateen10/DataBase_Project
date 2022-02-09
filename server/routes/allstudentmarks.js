const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

router.get("/allmarks", authorization, async (req, res) => {
  try {
    const studentmarks = await pool.query(
      "Select * from marks where student_id = $1",
      [req.student]
    );
    res.json(studentmarks.rows);
    console.log(studentmarks.rows);
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Server Error");
  }
});

router.get("/marksincourse", async (req, res) => {
  try {
    const { course_code, student_id } = req.body;
    const coursemarks = await pool.query(
      `Select mid_1 , mid_2 , quiz , assignment , project,final_exam , total  from marks where student_id = '${student_id}' and course_code = '${course_code}'`
    );
    res.json(coursemarks.rows);
  } catch (err) {
    console.log(err.message);
  }
});

router.get("/allcoursesofstudent", async (req, res) => {
  try {
    const { student_id } = req.body;
    const courses = await pool.query(
      `Select course_code from course_register Where student_id = '${student_id}';`
    );
    console.log(courses.rows);
  } catch (err) {
    console.log(err.message);
  }
});

router.post("/insertmarks", authorization, async (req, res) => {
  const { student_id, course_code } = req.body;
  try {
    const studentmarks = await pool.query(
      `INSERT INTO marks (student_id , course_code , mid_1 , mid_2 , quiz , assignment , project , final_exam) VALUES ('${student_id}' , '${course_code}' , 0 , 0 , 0 ,0 );`
    );
    res.json(studentmarks.rows);
    console.log(studentmarks.rows);
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Server Error");
  }
});

router.put("/updatemarks/:student_id", authorization, async (req, res) => {
  try {
    const { student_id } = req.params;
    const { course_code, title, marks } = req.body;

    const studentmarks = await pool.query(
      `Update marks set ${title}= '${marks}' Where student_id = '${student_id}' and course_code = '${course_code}' RETURNING *;`
    );
    const updatetotal = await pool.query(
      "Update marks set total = mid_1 + mid_2 + quiz + assignment + project + final_exam where student_id = $1",
      [student_id]
    );
    // res.json(studentmarks.rows);
    // console.log(studentmarks.rows);
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
