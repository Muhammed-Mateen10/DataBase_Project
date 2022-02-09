import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const StdRegister = () => {
  const [inputs, setInputs] = useState({
    student_id: "",
    student_name: "",
    father_name: "",
    phone_number: "",
    semester_no: "",
    address: "",
    loginPassword: "",
  });

  const {
    student_id,
    father_name,
    phone_number,
    semester_no,
    address,
    loginPassword,
    student_name,
  } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = {
        student_id,
        father_name,
        phone_number,
        semester_no,
        address,
        loginPassword,
        student_name,
      };
      const response = await fetch("http://localhost:3001/auth/stdregister", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <h1 className="mt-5 text-center">Register Student</h1>
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          name="student_id"
          value={student_id}
          placeholder="student id"
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="text"
          name="student_name"
          value={student_name}
          placeholder="student name"
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="text"
          name="father_name"
          value={father_name}
          placeholder="father name"
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="text"
          name="phone_number"
          value={phone_number}
          placeholder="phone_ number"
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="text"
          name="address"
          value={address}
          placeholder="address"
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="text"
          name="semester_no"
          value={semester_no}
          placeholder="semester"
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="text"
          name="loginPassword"
          value={loginPassword}
          placeholder="password"
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />
        <button className="btn btn-success btn-block">Submit</button>
      </form>
      <Link to="/adminhomepage">return</Link>
    </Fragment>
  );
};

export default StdRegister;
