import "./App.css";
import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import axios from "axios";

import NavMenu from "./components/NavMenu";
import AllRoutines from "./pages/AllRoutines";
import EditRoutine from "./pages/EditRoutine";
import PlayRoutine from "./pages/PlayRoutine";
import About from "./pages/About";
import Page404 from "./pages/Page404";

function App() {
  const URL = "https://ontime-planner.herokuapp.com";

  const [routines, setRoutines] = useState([]);
  const [selectedRoutine, setSelectedRoutine] = useState({
    routine_id: 0,
    title: "",
    description: "",
    destination: "",
    complete_time: {},
    start_time: {},
    total_time: 0,
    tasks: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  const [pageTitle, setPageTitle] = useState("onTime");
  const [expandNavMenu, setExpandNavMenu] = useState(false);
  const [viewNavSystem, setViewNavSystem] = useState(true);
  const [showAddRoutine, setAddRoutine] = useState(false);

  const toggleAddRoutineForm = () => setAddRoutine(!showAddRoutine);
  const toggleNavMenu = () => setExpandNavMenu(!expandNavMenu);

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

  const fetchOneRoutine = (routineId) => {
    axios
      .get(`${URL}/routines/${routineId}`)
      .then((response) => {
        const oneRoutine = response.data;
        setSelectedRoutine(oneRoutine);
        console.log("fetchOneRoutine request");
        console.log(oneRoutine);
      })
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
    axios
      .put(`${URL}/routines/${routineId}`, routineData)
      .then((response) => {
        console.log(response.data);
        fetchAllRoutines();
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

  const initiateRoutine = (routineId) => {
    axios
      .put(`${URL}/routines/init/${routineId}`, {})
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchInitiatedRoutine = (routineId) => {
    axios
      .get(`${URL}/routines/init/${routineId}`)
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
      setViewNavSystem(true);
    } else if (location.pathname === "/taskbank") {
      setPageTitle("Task Bank");
      setViewNavSystem(true);
    } else if (location.pathname === "/about") {
      setPageTitle("About");
      setViewNavSystem(true);
    } else if (location.pathname === "/settings") {
      setPageTitle("Settings");
      setViewNavSystem(true);
    } else if (
      location.pathname.includes("edit") ||
      location.pathname.includes("play")
    ) {
      setPageTitle(selectedRoutine.title);
      setViewNavSystem(false);
    } else {
      setViewNavSystem(true);
    }
  }, [location]);

  useEffect(() => fetchAllRoutines(), []);

  return (
    <div className="App">
      <NavMenu
        pageTitle={pageTitle}
        viewNavSystem={viewNavSystem}
        expandNavMenu={expandNavMenu}
        toggleNavMenu={toggleNavMenu}
      ></NavMenu>
      <Routes>
        <Route
          path="/"
          element={
            <AllRoutines
              selectedRoutine={selectedRoutine}
              setSelectedRoutine={setSelectedRoutine}
              routines={routines}
              updateRoutine={updateRoutine}
              deleteRoutine={deleteRoutine}
              showAddRoutine={showAddRoutine}
            />
          }
        />
        <Route path="/taskbank" element={<Page404 />} />
        <Route path="/about" element={<About />} />
        <Route path="/settings" element={<Page404 />} />
        <Route
          path="/routines/:routine_id/edit"
          element={
            <EditRoutine
              toggleAddRoutineForm={toggleAddRoutineForm}
              selectedRoutine={selectedRoutine}
              setSelectedRoutine={setSelectedRoutine}
              isLoading={isLoading}
              fetchOneRoutine={fetchOneRoutine}
              updateRoutine={updateRoutine}
              addTask={addTask}
              updateTask={updateTask}
              deleteTask={deleteTask}
              pageTitle={pageTitle}
              viewNavSystem={viewNavSystem}
            />
          }
        />
        <Route
          path="/routines/:routine_id/play"
          element={
            <PlayRoutine
              selectedRoutine={selectedRoutine}
              pageTitle={pageTitle}
              viewNavSystem={viewNavSystem}
            />
          }
        />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default App;
