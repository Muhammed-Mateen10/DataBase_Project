const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

router.get("/", authorization, async (req, res) => {
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

module.exports = router;
