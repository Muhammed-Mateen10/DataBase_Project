import { parse } from "ipaddr.js";
import React, { Fragment, useState } from "react";
import { toast } from "react-toastify";

const StdLogin = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    student_id: "",
    loginPassword: "",
  });
  const { student_id, loginPassword } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const body = { student_id, loginPassword };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/auth/stdlogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();
      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
        toast.success("Login Successfully");
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Fragment>
      <h1 className="text-center my-5">Student Login</h1>
      <form onSubmit={onSubmitForm}>
        <div className="form-group">
          <input
            type="text"
            name="student_id"
            placeholder="19KXXXX"
            className="form-control my-3"
            value={student_id}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="loginPassword"
            placeholder="*******"
            className="form-control my-3"
            value={loginPassword}
            onChange={(e) => onChange(e)}
          />
        </div>
        <button className="btn btn-success btn-primary">Log In</button>
      </form>
    </Fragment>
  );
};

export default StdLogin;
