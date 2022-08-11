import "./App.css";
import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import axios from "axios";

import NavMenu from "./components/NavMenu";
import PageHeader from "./components/PageHeader";
import AllRoutines from "./pages/AllRoutines";
import EditRoutine from "./pages/EditRoutine";
import PlayRoutine from "./pages/PlayRoutine";
import About from "./pages/About";
import Page404 from "./pages/Page404";

import { defaultTask, defaultRoutine } from "./components/Constants";

function App() {
  const URL = "https://ontime-planner.herokuapp.com";

  // Utilities
  const [isLoading, setIsLoading] = useState(true);
  const [pageTitle, setPageTitle] = useState("onTime");
  const [expandNavMenu, setExpandNavMenu] = useState(false);
  const [viewNavSystem, setViewNavSystem] = useState(true);

  // Used by both routines and tasks
  const [expandedRow, setExpandedRow] = useState(0);
  const [showAddForm, setShowAddForm] = useState(false);

  // Routines
  const [routines, setRoutines] = useState([]);
  const [selectedRoutine, setSelectedRoutine] = useState(defaultRoutine);

  // Tasks
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(defaultTask);

  // PlayRoutine
  const [progressPercent, setProgressPercent] = useState(100);
  const [completeTasks, setCompleteTasks] = useState([defaultTask]);
  const [incompleteTasks, setIncompleteTasks] = useState([defaultTask]);

  // ---------------------------------------------------------------------- //

  // Routine Requests //

  const fetchAllRoutines = () => {
    axios
      .get(`${URL}/routines`)
      .then((response) => {
        const updatedRoutines = response.data;
        setRoutines(updatedRoutines);
        console.log("fetchAllRoutines request");
        console.log(updatedRoutines);
      })
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const fetchOneRoutine = (routineId) => {
    axios
      .get(`${URL}/routines/${routineId}`)
      .then((response) => {
        const oneRoutine = response.data;
        setSelectedRoutine(oneRoutine);
        setTasks(oneRoutine.tasks);
        console.log("fetchOneRoutine request");
        console.log(oneRoutine);
        console.log(oneRoutine.tasks);
      })
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const addRoutine = (routineData) => {
    axios
      .post(`${URL}/routines`, routineData)
      .then((response) => {
        console.log("POST: new routine added");
        console.log(response.data);
        setSelectedRoutine(defaultRoutine);
        setShowAddForm(false);
        fetchAllRoutines();
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const updateRoutine = (routineId, routineData) => {
    axios
      .put(`${URL}/routines/${routineId}`, routineData)
      .then((response) => {
        console.log("PUT: routine complete_time updated");
        console.log(response.data);
        fetchAllRoutines();
      })
      .catch((error) => {
        console.log(error.response.data);
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
        console.log(error.response.data);
      });
  };

  // Task Requests //

  // Gets all tasks or, optionally, all tasks associated with a routine
  const fetchRoutineTasks = (routineId = null) => {
    axios
      .get(`${URL}/tasks`, { params: { routine_id: routineId } })
      .then((response) => {
        const tasks = response.data;
        setTasks(tasks);
        console.log("fetchRoutineTasks request");
        console.log(tasks);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const addTask = (taskData) => {
    axios
      .post(`${URL}/tasks`, taskData)
      .then((response) => {
        console.log("POST: new task added");
        console.log(response.data);
        setSelectedTask(defaultTask);
        setShowAddForm(false);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const updateTask = (taskId, taskData) => {
    axios
      .put(`${URL}/tasks/${taskId}`, taskData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const deleteTask = (taskId) => {
    axios
      .delete(`${URL}/tasks/${taskId}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  // Play Requests //

  const initiateRoutine = (routineId) => {
    axios
      .put(`${URL}/routines/init/${routineId}`, {})
      .then((response) => {
        console.log(`routine ${routineId} initiated`);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const fetchInitiatedRoutine = (routineId) => {
    axios
      .get(`${URL}/routines/init/${routineId}`)
      .then((response) => {
        const initiatedRoutine = response.data;
        setSelectedTask(initiatedRoutine.current_task);
        setCompleteTasks(initiatedRoutine.complete_tasks);
        setIncompleteTasks(initiatedRoutine.incomplete_tasks);
        setProgressPercent(initiatedRoutine.percent);
        console.log(initiatedRoutine);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  // ---------------------------------------------------------------------- //

  let location = useLocation();
  useEffect(() => {
    if (location.pathname === "/") {
      setPageTitle("Routines");
      setViewNavSystem(true);
      setExpandedRow(0);
      setShowAddForm(false);
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
      setExpandedRow(0);
      setShowAddForm(false);
    } else {
      setViewNavSystem(true);
    }
  }, [location]);

  // ---------------------------------------------------------------------- //

  useEffect(() => fetchAllRoutines(), []);

  // ---------------------------------------------------------------------- //

  return (
    <div className="App">
      {viewNavSystem ? (
        <NavMenu
          pageTitle={pageTitle}
          expandNavMenu={expandNavMenu}
          setExpandNavMenu={setExpandNavMenu}
        ></NavMenu>
      ) : (
        <PageHeader pageTitle={selectedRoutine.title}></PageHeader>
      )}
      <Routes>
        <Route
          path="/"
          element={
            <AllRoutines
              isLoading={isLoading}
              selectedRoutine={selectedRoutine}
              setSelectedRoutine={setSelectedRoutine}
              expandedRow={expandedRow}
              setExpandedRow={setExpandedRow}
              showAddForm={showAddForm}
              setShowAddForm={setShowAddForm}
              routines={routines}
              addRoutine={addRoutine}
              updateRoutine={updateRoutine}
              deleteRoutine={deleteRoutine}
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
              isLoading={isLoading}
              selectedRoutine={selectedRoutine}
              setSelectedRoutine={setSelectedRoutine}
              selectedTask={selectedTask}
              setSelectedTask={setSelectedTask}
              expandedRow={expandedRow}
              setExpandedRow={setExpandedRow}
              showAddForm={showAddForm}
              setShowAddForm={setShowAddForm}
              fetchOneRoutine={fetchOneRoutine}
              updateRoutine={updateRoutine}
              tasks={tasks}
              addTask={addTask}
              updateTask={updateTask}
              deleteTask={deleteTask}
            />
          }
        />
        <Route
          path="/routines/:routine_id/play"
          element={
            <PlayRoutine
              isLoading={isLoading}
              selectedTask={selectedTask}
              selectedRoutine={selectedRoutine}
              progressPercent={progressPercent}
              completeTasks={completeTasks}
              incompleteTasks={incompleteTasks}
              initiateRoutine={initiateRoutine}
              fetchInitiatedRoutine={fetchInitiatedRoutine}
              fetchOneRoutine={fetchOneRoutine}
            />
          }
        />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default App;
