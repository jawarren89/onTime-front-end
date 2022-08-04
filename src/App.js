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
  // const [currentPage, setCurrentPage] = useState("onTime");
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

  // let location = useLocation();
  // useEffect(() => {
  //   console.log(location.pathname);
  //   setCurrentPage(location.pathname);
  // }, [location]);

  // how do we get this to only fetch once??
  useEffect(() => fetchRoutines(), []);

  return (
    <div className="App">
      <NavBar navbar={navbar} toggleNavbarCallback={toggleNavbar}></NavBar>
      <Routes>
        <Route path="/" element={<AllRoutines routines={routines} />} />
        <Route path="/about" element={<About />} />
        <Route path="/editroutine" element={<EditRoutine />} />
        <Route path="/playroutine" element={<PlayRoutine />} />
        <Route path="/404" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
