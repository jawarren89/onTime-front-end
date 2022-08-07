import "./App.css";
import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import axios from "axios";

import AllRoutines from "./pages/AllRoutines";
import EditRoutine from "./pages/EditRoutine";
import PlayRoutine from "./pages/PlayRoutine";
import About from "./pages/About";
import NavBar from "./components/NavBar";
import PageNotFound from "./pages/404Page";

function App() {
  const URL = "https://ontime-planner.herokuapp.com";

  const [routines, setRoutines] = useState([]);
  const [selectedRoutine, setSelectedRoutine] = useState({});
  const [pageTitle, setPageTitle] = useState("onTime");
  const [viewNavbar, setViewNavbar] = useState(true);

  const toggleNavbar = () => setViewNavbar(!viewNavbar);

  //Convert time in hrs:min meridiem to military time for axios submission
  const toMilitaryDict = (form) => {
    if (form.meridiem === "PM") {
      const timeData = {
        complete_time: {
          hour: parseInt(form.hours) + 12,
          minute: parseInt(form.minutes),
        },
      };
      return timeData;
    } else {
      const timeData = {
        complete_time: {
          hour: parseInt(form.hours),
          minute: parseInt(form.minutes),
        },
      };
      return timeData;
    }
  };

  const fetchAllRoutines = () => {
    axios
      .get(`${URL}/routines`)
      .then((response) => {
        const updatedRoutines = response.data;
        setRoutines(updatedRoutines);
        console.log("fetchAllRoutines request");
        console.log(updatedRoutines);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const fetchOneRoutine = (routineId) => {
  //   axios
  //     .get(`${URL}/routines/${routineId}`)
  //     .then((response) => {
  //       console.log("fetchOneRoutine request");
  //       const oneRoutine = response.data;
  //       console.log(oneRoutine);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // const selectRoutine = (routineId) => {
  //   for (const routine of routines) {
  //     if (routine.routine_id === routineId) {
  //       setSelectedRoutine(routine);
  //     }
  //   }
  // };

  const addRoutine = (routineData) => {
    axios
      .post(`${URL}/routines`, routineData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateRoutine = (routineId, routineData) => {
    const routineUpdate = { routine_id: routineId, routineData };
    axios
      .put(`${URL}/routines/${routineId}`, routineUpdate)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteRoutine = (routineId) => {
    axios
      .delete(`${URL}/routines/${routineId}`)
      .then((response) => {
        console.log(response.data);
        fetchAllRoutines();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Gets all tasks or, optionally, all tasks associated with a routine
  const fetchRoutineTasks = (routineId = null) => {
    axios
      .get(`${URL}/tasks`, { params: { routine_id: routineId } })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addTask = (taskData) => {
    axios
      .post(`${URL}/tasks`, taskData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateTask = (taskId, taskData) => {
    axios
      .put(`${URL}/tasks/${taskId}`, taskData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteTask = (taskId) => {
    axios
      .delete(`${URL}/tasks/${taskId}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let location = useLocation();
  useEffect(() => {
    if (location.pathname === "/") {
      setPageTitle("Routines");
    } else if (location.pathname === "/taskbank") {
      setPageTitle("Task Bank");
    } else if (location.pathname === "/about") {
      setPageTitle("About");
    } else if (location.pathname === "/settings") {
      setPageTitle("Settings");
    }
  }, [location]);

  useEffect(() => fetchAllRoutines(), []);

  // useEffect(() => {
  //   if (selectedRoutine === 0) {
  //     return;
  //   } else {
  //     fetchOneRoutine(selectedRoutine);
  //   }
  // }, [selectedRoutine]);

  return (
    <div className="App">
      <NavBar
        pageTitle={pageTitle}
        selectedRoutine={selectedRoutine}
        viewNavbar={viewNavbar}
        toggleNavbarCallback={toggleNavbar}
      ></NavBar>
      <Routes>
        <Route
          path="/"
          element={
            <AllRoutines
              routines={routines}
              setSelectedRoutine={setSelectedRoutine}
              updateRoutine={updateRoutine}
              deleteRoutine={deleteRoutine}
              toMilitaryDict={toMilitaryDict}
            />
          }
        />
        <Route path="/taskbank" element={<PageNotFound />} />
        <Route path="/about" element={<About />} />
        <Route path="/settings" element={<PageNotFound />} />
        <Route
          path="/routine/:routine_id/edit"
          element={
            <EditRoutine
              selectedRoutine={selectedRoutine}
              updateRoutine={updateRoutine}
            />
          }
        />
        <Route path="/routine/:routine_id/play" element={<PlayRoutine />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
