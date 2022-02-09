import React from "react";
import { Link } from "react-router-dom";

const Startingpage = () => {
  return (
    <div className="jumbotron mt-5">
      <h1>Project Name:University Management</h1>
      <p>Group Members</p>
      <p>19k0195</p>
      <p>19k0280</p>
      <p>19k1253</p>
      <Link to="/stdlogin" className="btn btn-primary">
        Student Login
      </Link>
      <Link to="/teacherlogin" className="btn btn-primary ml-3">
        Teacher Login
      </Link>
      <Link to="/adminlogin" className="btn btn-primary ml-3">
        Admin Login
      </Link>
    </div>
  );
};

export default Startingpage;
