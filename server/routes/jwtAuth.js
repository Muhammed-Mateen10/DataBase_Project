const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtgenerator = require("../utils/jwtgenerator");
const authorization = require("../middleware/authorization");
//Login Route
router.post("/stdregister", async (req, res) => {
  try {
    //destructure req.boy to roll number name

    const {
      student_id,
      student_name,
      father_name,
      phone_number,
      semester_no,
      address,
      loginPassword,
    } = req.body;
    //1.if user exists
    const student = await pool.query(
      "Select * from student Where student_id = $1",
      [student_id]
    );
    if (student.rows.length !== 0) {
      return res.status(401).send("Student Already Exist");
    }
    //becrypt
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(loginPassword, salt);

    //enter user in database
    const newstudent = await pool.query(
      "INSERT INTO student(student_id , student_name , father_name , phone_number , semester_no , address , loginPassword) VALUES ($1 , $2 , $3 , $4 , $5 , $6 , $7 ) RETURNING *",
      [
        student_id,
        student_name,
        father_name,
        phone_number,
        semester_no,
        address,
        bcryptPassword,
      ]
    );
    const token = jwtgenerator(newstudent.rows[0].student_id);
    res.json({ token });

    //jwt
  } catch (err) {
    console.log(err.message);
    req.statusCode(500).send("Server Error");
  }
});

router.post("/stdlogin", async (req, res) => {
  try {
    //destruct student
    const { student_id, loginPassword } = req.body;

    //check if student exists
    const student = await pool.query(
      "SELECT * FROM student where student_id = $1",
      [student_id]
    );

    if (student.rows.length === 0) {
      //student doesnt exist
      return res.status(401).json("Invalid Id or Password");
    }
    //verify password from our database

    const validPassword = await bcrypt.compare(
      loginPassword,
      student.rows[0].loginpassword
    );
    if (!validPassword) {
      return res.status(401).json("Invalid Id or Password");
    }
    //give them jwttoken
    const token = jwtgenerator(student.rows[0].student_id);
    res.json({ token });
  } catch (err) {
    console.log(err.message);
    res.statusCode(500).send("Server Error");
  }
});

router.post("/teacherregister", async (req, res) => {
  try {
    //destructure req.boy to roll number name

    const { teacher_email, teacher_name, loginPassword } = req.body;
    //1.if user exists
    const teacher = await pool.query(
      "Select * from teacher Where teacher_email = $1",
      [teacher_email]
    );
    if (teacher.rows.length !== 0) {
      return res.status(401).send("Teacher With this Email Already Exist");
    }
    //becrypt
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(loginPassword, salt);

    //enter user in database
    const newteacher = await pool.query(
      `Insert into teacher (teacher_email , teacher_name , loginPassword) Values('${teacher_email}' , '${teacher_name}' , '${bcryptPassword}');`
    );
    const token = jwtgenerator(newteacher.rows[0].teacher_email);
    res.json({ token });

    //jwt
  } catch (err) {
    console.log(err.message);
    req.statusCode(500).send("Server Error");
  }
});

router.post("/teacherlogin", async (req, res) => {
  try {
    //destruct student
    const { teacher_email, loginPassword } = req.body;

    //check if student exists
    const teacher = await pool.query(
      "SELECT * FROM teacher where teacher_email = $1",
      [teacher_email]
    );

    if (teacher.rows.length === 0) {
      //student doesnt exist
      return res.status(401).json("Invalid Email or Password");
    }
    //verify password from our database

    const validPassword = await bcrypt.compare(
      loginPassword,
      teacher.rows[0].loginpassword
    );
    if (!validPassword) {
      return res.status(401).json("Invalid Email or Password");
    }
    //give them jwttoken
    const token = jwtgenerator(teacher.rows[0].teacher_email);
    res.json({ token });
  } catch (err) {
    console.log(err.message);
    res.statusCode(500).json("Server Error");
  }
});

router.post("/adminregister", async (req, res) => {
  try {
    //destructure req.boy to roll number name

    const { admin_email, admin_name, loginPassword } = req.body;
    //1.if user exists
    const admin = await pool.query(
      "Select * from admin Where admin_email = $1",
      [admin_email]
    );
    if (admin.rows.length !== 0) {
      return res.status(401).send("Admin With this Email Already Exist");
    }
    //becrypt
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(loginPassword, salt);

    //enter user in database
    const newadmin = await pool.query(
      `Insert into admin (admin_email , admin_name , loginPassword) Values('${admin_email}' , '${admin_name}' , '${bcryptPassword}');`
    );
    const token = jwtgenerator(newadmin.rows[0].admin_email);
    res.json({ token });

    //jwt
  } catch (err) {
    console.log(err.message);
    req.statusCode(500).send("Server Error");
  }
});

router.post("/adminlogin", async (req, res) => {
  try {
    //destruct student
    const { admin_email, loginPassword } = req.body;

    //check if student exists
    const admin = await pool.query(
      "SELECT * FROM admin where admin_email = $1",
      [admin_email]
    );

    if (admin.rows.length === 0) {
      //admin doesnt exist
      return res.status(401).json("Invalid Email or Password");
    }
    //verify password from our database

    const validPassword = await bcrypt.compare(
      loginPassword,
      admin.rows[0].loginpassword
    );
    if (!validPassword) {
      return res.status(401).json("Invalid Email or Password");
    }
    //give them jwttoken
    const token = jwtgenerator(admin.rows[0].admin_email);
    res.json({ token });
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Server Error");
  }
});

router.get("/verified", authorization, (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.log(err.message);
    res.statusCode(500).send("Server Error");
  }
});

module.exports = router;
