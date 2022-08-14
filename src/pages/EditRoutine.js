import "../styles/EditRoutine.css";
import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

import RoutineForm from "../components/RoutineForm";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";

import { defaultTask } from "../components/Constants";

import add from "../assets/plus-circle.svg";

// The EditRoutine page is accessed when a user clicks on a routine to edit or
// when a user navigates to a specific edit route. As such, the routine fetched
// is based on the routineId in the browserURL.

// Users can update the title, description, and complete_time of the routine.
// Associated tasks can be added, updated, deleted, and reordered.

const EditRoutine = (props) => {
  const { routine_id } = useParams();

  const ref = useRef();

  const showAddTaskOnClick = () => {
    props.setExpandedRow(0);
    props.setSelectedTask(defaultTask);
    props.setShowAddForm(!props.showAddForm);
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const submitRoutineUpdate = (event) => {
    event.preventDefault();
    props.updateRoutine(
      props.selectedRoutine.routine_id,
      props.selectedRoutine
    );
    console.log(props.selectedRoutine);
  };

  const submitNewTask = (event) => {
    event.preventDefault();
    const newTask = JSON.parse(JSON.stringify(props.selectedTask));
    delete newTask.task_id;
    newTask["routine_id"] = props.selectedRoutine.routine_id;
    newTask.time = parseInt(newTask.time);
    props.addTask(newTask);
    props.setSelectedTask(defaultTask);
    console.log(newTask);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => props.fetchOneRoutine(routine_id), []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ---------------------------------------------------------------------- //

  if (props.isLoading) {
    return (
      <main className="loading-container">
        <h1 className="loading">Loading...</h1>
      </main>
    );
  } else {
    return (
      <>
        <main className="editpage-container" ref={ref}>
          <h2 className="editpage-header">
            Edit: {props.selectedRoutine.title}
          </h2>

          <form
            className="routineform-container"
            onSubmit={submitRoutineUpdate}
          >
            <RoutineForm
              selectedRoutine={props.selectedRoutine}
              setSelectedRoutine={props.setSelectedRoutine}
            ></RoutineForm>
            <div className="button-container">
              <input
                className="update btn"
                type="submit"
                value="Update Details"
                disabled={
                  props.selectedRoutine.title.length < 1 ||
                  props.selectedRoutine.title.length > 40 ||
                  props.selectedRoutine.description.length > 110
                }
              ></input>
            </div>
          </form>

          <section className="task-section">
            <div className="tasks-header">
              <h2>Tasks</h2>
              <div>Total Time: {props.selectedRoutine.total_time}</div>
              <div>(expand task to edit, drag to reorder)</div>
            </div>
            <button className="addform-button" onClick={showAddTaskOnClick}>
              <img src={add} alt="add icon" />
            </button>
            {props.showAddForm ? (
              <form className="task-form" onSubmit={submitNewTask}>
                <TaskForm
                  selectedTask={props.selectedTask}
                  setSelectedTask={props.setSelectedTask}
                ></TaskForm>
                <input
                  className="submitform btn"
                  type="submit"
                  value="Add Task"
                  disabled={
                    props.selectedTask.title.length < 1 ||
                    props.selectedTask.title.length > 50 ||
                    props.selectedTask.time < 1
                  }
                ></input>
              </form>
            ) : (
              ""
            )}
          </section>
          <TaskList
            selectedRoutine={props.selectedRoutine}
            setSelectedRoutine={props.setSelectedRoutine}
            selectedTask={props.selectedTask}
            setSelectedTask={props.setSelectedTask}
            expandedRow={props.expandedRow}
            setExpandedRow={props.setExpandedRow}
            setShowAddForm={props.setShowAddForm}
            tasks={props.tasks}
            updateTask={props.updateTask}
            deleteTask={props.deleteTask}
          ></TaskList>
        </main>
      </>
    );
  }
};

EditRoutine.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  selectedRoutine: PropTypes.object.isRequired,
  setSelectedRoutine: PropTypes.func.isRequired,
  selectedTask: PropTypes.object.isRequired,
  setSelectedTask: PropTypes.func.isRequired,
  expandedRow: PropTypes.number.isRequired,
  setExpandedRow: PropTypes.func.isRequired,
  showAddForm: PropTypes.bool.isRequired,
  setShowAddForm: PropTypes.func.isRequired,
  fetchOneRoutine: PropTypes.func.isRequired,
  updateRoutine: PropTypes.func.isRequired,
  tasks: PropTypes.array.isRequired,
  addTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
};

export default EditRoutine;
