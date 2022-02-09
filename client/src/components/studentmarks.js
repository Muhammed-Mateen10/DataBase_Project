import React, { useEffect, useState } from "react";

const StudentMarks = ({ student_id }) => {
  const [courses, setcourses] = useState([]);
  const [marks, setmarks] = useState([]);
  var x = 0;
  const getMarks = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/studentmarks/allmarks",
        {
          method: "GET",
          headers: { jwt_token: localStorage.token },
        }
      );
      const parseRes = await response.json();
      setmarks(parseRes);
      console.log("here");

      //   console.log(parseRes);
    } catch (error) {
      console.log(error.message);
    }
  };
  const getCourses = async () => {
    try {
      const body = { student_id };
      const response = await fetch(
        "http://localhost:3001/studentmarks/allcoursesofstudent",
        {
          method: "GET",
          headers: { jwt_token: localStorage.token },
          body: body,
        }
      );
      const parseRes = await response.json();
      setcourses(parseRes);
      console.log("here");
      console.log(parseRes[0]);
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    getMarks();
    // getCourses();
  }, []);
  return (
    <table class="table table-dark">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">course_code</th>
          <th scope="col">mid_1</th>
          <th scope="col">mid_2</th>
          <th scope="col">quiz</th>
          <th scope="col">assignment</th>
          <th scope="col">project</th>
          <th scope="col">final_exam</th>
          <th scope="col">total</th>
        </tr>
      </thead>
      <tbody>
        {marks.length !== 0 &&
          marks.map((mark) => (
            <tr key={marks.course_code}>
              <td>{++x}</td>
              <td>{mark.course_code}</td>
              <td>{mark.mid_1}</td>
              <td>{mark.mid_2}</td>
              <td>{mark.quiz}</td>
              <td>{mark.assignment}</td>
              <td>{mark.project}</td>
              <td>{mark.final_exam}</td>
              <td>{mark.total}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default StudentMarks;
