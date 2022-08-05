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
  const [selectedRoutine, setSelectedRoutine] = useState([]);
  const [pageTitle, setPageTitle] = useState("onTime");
  const [navbar, setNavbar] = useState(true);

  const toggleNavbar = () => setNavbar(!navbar);

  const fetchRoutines = () => {
    axios
      .get(`${URL}/routines`)
      .then((response) => {
        console.log("fetchRoutines request");
        const updatedRoutines = response.data;
        console.log(updatedRoutines);
        setRoutines(updatedRoutines);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const selectRoutine = (routineId) => {
    for (const routine of routines) {
      if (routine.routine_id === routineId) {
        setSelectedRoutine(routine);
      }
    }
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
        fetchRoutines();
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
    console.log(location.pathname);
    setPageTitle(location.pathname);
  }, [location]);

  // how do we get this to only fetch once??
  useEffect(() => fetchRoutines(), []);

  return (
    <div className="App">
      <NavBar
        pageTitle={pageTitle}
        navbar={navbar}
        toggleNavbarCallback={toggleNavbar}
      ></NavBar>
      <Routes>
        <Route
          path="/"
          element={
            <AllRoutines
              routines={routines}
              deleteRoutineCallback={deleteRoutine}
            />
          }
        />
        <Route path="/taskbank" element={<PageNotFound />} />
        <Route path="/about" element={<About />} />
        <Route path="/settings" element={<PageNotFound />} />
        <Route path="/editroutine" element={<EditRoutine />} />
        <Route path="/playroutine" element={<PlayRoutine />} />
        <Route path="/404" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
