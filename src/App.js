import "./App.css";
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

import AllRoutines from "./pages/AllRoutines";
import About from "./pages/About";

function App() {
  const URL = "https://ontime-planner.herokuapp.com";

  const [routines, setRoutines] = useState([]);

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

  useEffect(() => fetchRoutines(), []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>onTime</h1>
      </header>
      <Routes>
        <Route path="/" element={<AllRoutines routines={routines} />} />
        <Route path="about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
