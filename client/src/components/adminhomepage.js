import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const AdminHomepage = ({ setAuth }) => {
  const [admin_name, setadminname] = useState("");

  async function getName() {
    try {
      const response = await fetch("http://localhost:3001/adminhomepage/", {
        method: "GET",
        headers: { jwt_token: localStorage.token },
      });

      const parseRes = await response.json();
      setadminname(parseRes.admin_name);
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
      <h1>Admin homepage Hello :{admin_name}</h1>
      <Link to="/stdregister" className="btn btn-primary">
        Student Register
      </Link>
      <button type="button" class="btn btn-dark">
        Teacher register
      </button>
      <button type="button" class="btn btn-dark">
        Admin Register
      </button>

      <button className="btn btn-danger ml-3 " onClick={(e) => logout(e)}>
        Log Out
      </button>
    </Fragment>
  );
};

export default AdminHomepage;
