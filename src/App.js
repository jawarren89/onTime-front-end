import "./App.css";
import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import axios from "axios";

import AllRoutines from "./pages/AllRoutines";
import EditRoutine from "./pages/EditRoutine";
import PlayRoutine from "./pages/PlayRoutine";
import About from "./pages/About";
import PageNotFound from "./pages/404Page";
import TimeToCivilian from "./components/TimeToCivilian";
import NavMenu from "./components/NavMenu";

function App() {
  const URL = "https://ontime-planner.herokuapp.com";

  const [routines, setRoutines] = useState([]);
  const [selectedRoutine, setSelectedRoutine] = useState({
    routine_id: "",
    title: "",
    description: "",
    destination: "",
    complete_time: "",
    start_time: "",
    total_time: "",
    tasks: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  const [pageTitle, setPageTitle] = useState("onTime");
  const [viewNavbar, setViewNavbar] = useState(false);
  const [showAddRoutine, setAddRoutine] = useState(false);

  const toggleAddRoutineForm = () => setAddRoutine(!showAddRoutine);
  const toggleNavbar = () => setViewNavbar(!viewNavbar);

  const fetchAllRoutines = () => {
    axios
      .get(`${URL}/routines`)
      .then((response) => {
        const updatedRoutines = response.data;

        for (const routine of updatedRoutines) {
          routine.start_time = TimeToCivilian(routine.start_time);
          routine.complete_time = TimeToCivilian(routine.complete_time);
        }

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

        oneRoutine.start_time = TimeToCivilian(oneRoutine.start_time);
        oneRoutine.complete_time = TimeToCivilian(oneRoutine.complete_time);

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
    } else if (location.pathname === "/taskbank") {
      setPageTitle("Task Bank");
    } else if (location.pathname === "/about") {
      setPageTitle("About");
    } else if (location.pathname === "/settings") {
      setPageTitle("Settings");
    }
  }, [location]);

  useEffect(() => fetchAllRoutines(), []);

  return (
    <div className="App">
      <NavMenu
        pageTitle={pageTitle}
        viewNavbar={viewNavbar}
        toggleNavbar={toggleNavbar}
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
        <Route path="/taskbank" element={<PageNotFound />} />
        <Route path="/about" element={<About />} />
        <Route path="/settings" element={<PageNotFound />} />
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
            />
          }
        />
        <Route path="/routines/:routine_id/play" element={<PlayRoutine />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
