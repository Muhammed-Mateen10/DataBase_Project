const router = require("express").Router();

const pool = require("../db");
const authorization = require("../middleware/authorization");

router.get("/", authorization, async (req, res) => {
  try {
    console.log(req.student);
    const admin = await pool.query(
      "Select * from admin where admin_email = $1",
      [req.student]
    );
    res.json(admin.rows[0]);
    // const student =
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
