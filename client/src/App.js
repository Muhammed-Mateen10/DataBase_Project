import React, { Fragment, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Switch,
  Redirect,
  BrowserRouter,
} from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//components
import StdHomepage from "./components/stdhomepage";
import StdLogin from "./components/stdlogin";
import TeacherHomepage from "./components/teacherhomepage";
import AdminHomepage from "./components/adminhomepage";
import AdminLogin from "./components/adminlogin";
import Startingpage from "./components/startingPage";

import TeacherLogin from "./components/teacherlogin";
import StdRegister from "./components/studentregister";

toast.configure();

function App() {
  const [isAuthenticated, setisAuthenticated] = useState(false);

  async function isAuth() {
    try {
      const response = await fetch("http://localhost:3001/auth/verified", {
        method: "GET",
        headers: { jwt_token: localStorage.token },
      });
      const parseRes = await response.json();
      // console.log(parseRes);
      parseRes == true ? setisAuthenticated(true) : setisAuthenticated(false);
    } catch (err) {
      console.log(err.message);
    }
  }

  const setAuth = (boolean) => {
    setisAuthenticated(boolean);
  };

  useEffect(() => {
    isAuth();
  }, []);

  return (
    <Fragment>
      <Router>
        <div className="container">
          <Switch>
            <Route
              exact
              path="/"
              render={(props) =>
                !isAuthenticated ? (
                  <Startingpage />
                ) : (
                  <Redirect to="/stdhomepage" />
                )
              }
            />

            <Route
              exact
              path="/stdregister"
              render={(props) => <StdRegister />}
            />

            <Route
              exact
              path="/stdlogin"
              render={(props) =>
                !isAuthenticated ? (
                  <StdLogin {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/stdhomepage" />
                )
              }
            />
            <Route
              exact
              path="/teacherlogin"
              render={(props) =>
                !isAuthenticated ? (
                  <TeacherLogin {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/teacherhomepage" />
                )
              }
            />
            <Route
              exact
              path="/adminlogin"
              render={(props) =>
                !isAuthenticated ? (
                  <AdminLogin {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/adminhomepage" />
                )
              }
            />
            <Route
              exact
              path="/adminhomepage"
              render={(props) =>
                isAuthenticated ? (
                  <AdminHomepage {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/adminlogin" />
                )
              }
            />
            <Route
              exact
              path="/teacherhomepage"
              render={(props) =>
                isAuthenticated ? (
                  <TeacherHomepage {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/teacherlogin" />
                )
              }
            />
            <Route
              exact
              path="/stdhomepage"
              render={(props) =>
                isAuthenticated ? (
                  <StdHomepage {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/stdlogin" />
                )
              }
            />
          </Switch>
        </div>
      </Router>
    </Fragment>
    // shorthand
  );
}

export default App;
