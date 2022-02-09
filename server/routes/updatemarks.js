const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

router.put(
  "/marks/updatemarks/:student_id",
  authorization,
  async (req, res) => {
    try {
      const student_id = req.params.student_id;
      const { course_code, title, marks } = req.body;
      console.log(student_id);
      const studentmarks = await pool.query(
        "Update marks set $1 = $2 Where student_id = $3 and course_code = $4 Returning *",
        [title, marks, student_id, course_code]
      );
      res.json(studentmarks.rows);
      console.log(studentmarks.rows);
    } catch (err) {
      console.log(err.message);
      res.status(500).json("Server Error");
    }
  }
);

module.exports = router;
