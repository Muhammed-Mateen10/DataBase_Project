import React, { Fragment, useState, useEffect } from "react";

import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
  ChakraProvider,
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import StudentMarks from "./studentmarks";

const StdHomepage = ({ setAuth }) => {
  const [student_id, setstudent_id] = useState("");

  async function getName() {
    try {
      const response = await fetch("http://localhost:3001/stdhomepage/", {
        method: "GET",
        headers: { jwt_token: localStorage.token },
      });

      const parseRes = await response.json();
      setstudent_id(parseRes.student_id);
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
      <ChakraProvider>
        <h1>Student homepage Hello :{student_id}</h1>
        <Button colorScheme="green" onClick={(e) => logout(e)}>
          Log Out
        </Button>
        <Tabs variant="soft-rounded" colorScheme="green">
          <TabList>
            <Tab>Home</Tab>
            <Tab>Marks</Tab>
            <Tab>Attendance</Tab>
            <Tab>Register</Tab>

            <Tab></Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <p>homepage</p>
            </TabPanel>
            <TabPanel>
              <StudentMarks student_id={student_id} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </ChakraProvider>
    </Fragment>
  );
};

export default StdHomepage;
