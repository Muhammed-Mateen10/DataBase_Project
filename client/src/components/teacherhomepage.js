import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";
const TeacherHomepage = ({ setAuth }) => {
  const [teacher_name, setteachername] = useState("");
  const [inputs, setinputs] = useState({
    student_id: "",
    course_code: "",
    title: "",
    marks: "",
  });

  const { student_id, course_code, title, marks } = inputs;

  const onChange = (e) => {
    setinputs({ ...inputs, [e.target.name]: [e.target.value] });
  };

  const body = { course_code, title, marks };
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("jwt_token", localStorage.token);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3001/studentmarks/updatemarks/${student_id}`,
        {
          method: "PUT",
          headers: headers,
          body: JSON.stringify(body),
        }
      );
      toast.success("Updated successfully");

      window.location.reload();
      const parseRes = await response.json();
      //   if (parseRes.token) {
      //     localStorage.setItem("token", parseRes.token);
      //     setAuth(true);
      //     toast.success("Login Successfully");
      //   } else {
      //     setAuth(false);
      //     toast.error(parseRes);
      //   }
    } catch (err) {
      console.log(err.message);
    }
  };

  async function getName() {
    try {
      const response = await fetch("http://localhost:3001/teacherhomepage/", {
        method: "GET",
        headers: { jwt_token: localStorage.token },
      });

      const parseRes = await response.json();
      setteachername(parseRes.teacher_name);
    } catch (err) {
      console.log(err.message);
    }
  }

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
    toast.success("Logged Out successfully");
  };

  useEffect(() => getName(), []);
  return (
    <Fragment>
      <h1>Teacher homepage Hello :{teacher_name}</h1>
      <button className="btn btn-primary" onClick={(e) => logout(e)}>
        Log Out
      </button>
      <div>Edit Student Marks</div>
      <form onSubmit={onSubmitForm}>
        <div className="form-group">
          <input
            type="text"
            name="student_id"
            placeholder="19kXXXX"
            className="form-control my-3"
            value={student_id}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="course_code"
            placeholder="CS000"
            className="form-control my-3"
            value={course_code}
            onChange={(e) => onChange(e)}
          />
          <input
            type="text"
            name="title"
            placeholder="mid_1 , mid_2 , quiz , assignment , final_exam , project"
            className="form-control my-3"
            value={title}
            onChange={(e) => onChange(e)}
          />
          <input
            type="text"
            name="marks"
            placeholder="00"
            className="form-control my-3"
            value={marks}
            onChange={(e) => onChange(e)}
          />
          <button className="btn btn-success btn-primary">Update</button>
        </div>
      </form>
    </Fragment>
  );
};

export default TeacherHomepage;
