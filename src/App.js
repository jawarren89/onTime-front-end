import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import RoutineList from "./components/RoutineList";

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
      <section>
        <p>Hello Routines!</p>
        <RoutineList routines={routines}></RoutineList>
      </section>
    </div>
  );
}

export default App;
