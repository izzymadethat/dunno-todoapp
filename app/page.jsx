"use client";

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Task from "./models/taskItem";
import ToDoSection from "./components/ToDoSection";

// const todos = [
//   { id: 1, task: "Walk the dog", isCompleted: false },
//   { id: 2, task: "Feed the cat", isCompleted: true },
//   { id: 3, task: "Pet the cat", isCompleted: false },
//   { id: 4, task: "Go to the store", isCompleted: false },
//   { id: 5, task: "Get Groceries", isCompleted: false },
// ];
/**
 * MyToDo App - Main app
 *
 * Todo - set up unique ids using uuid
 * Todo - handle edit function
 * Todo - save task to local storage
 * Todo - refactor functions and components
 */

const MyTodoApp = () => {
  const [todoItems, setTodoItems] = useState([]);
  const [todoText, setTodoText] = useState("");
  const [completedTasks, setCompletedTasks] = useState([]);

  /**
   * useEffect
  //  * Todo - retrieve items from storage
  //  * Todo - add items as a Task object
  //  * Todo - setTodoItems to array of Tasks
   */
  useEffect(() => {
    console.log("MyTodoApp useEffect");

    // get tasks from local storage
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    const completedTasks = JSON.parse(localStorage.getItem("completed_tasks"));

    if (storedTasks) {
      // create a new task from each task object found
      const taskInstances = storedTasks.map((task) => {
        const taskInstance = new Task(task.id, task.task);
        taskInstance.isCompleted = task.isCompleted;
        return taskInstance;
      });

      setTodoItems(taskInstances);
    }

    if (completedTasks) {
      const completions = completedTasks.map((task) => {
        const taskInstance = new Task(task.id, task.task);
        taskInstance.isCompleted = task.isCompleted;
        return taskInstance;
      });

      setCompletedTasks(completions);
    }
  }, []);

  /**
   * Handle Submission of task when user creates task input.
   * - Prevent page from refreshing
   * - if there is no text upon submission don't do anything
   * - create new unique id
   * - create new task object *see ./models/taskItem.js
   * - save to local storage
   * - update info
   *
   * @param {Event} e event Object
   * @returns
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!todoText) return;

    // create new task id and task
    const taskId = uuidv4();
    const newTask = new Task(taskId, todoText);

    // update tasks array, update localStorage, updateState
    // reset text
    const updatedTasks = [...todoItems, newTask];
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTodoItems(updatedTasks);
    setTodoText("");
  };

  const handleDelete = (id) => {
    setTodoItems(todoItems.filter((item) => item.id !== id));
  };

  /**
   * Handle Completion or ReDo of Task when user clicks to complete task.
   * - filter through task list for task that matches id
   * - update isCompleted to be opposite of value (!boolean)
   * - update localStorage to updated toDo List
   * - add completed task to another stored list called completed_tasks
   * @param {string} id
   * @returns
   */
  const handleTaskComplete = (id) => {
    let updatedTask = todoItems.filter((task) => task.id === id)[0];

    if (updatedTask) {
      updatedTask.isCompleted = !updatedTask.isCompleted;

      if (updatedTask.isCompleted) {
        todoItems.splice(todoItems.indexOf(updatedTask), 1);

        localStorage.setItem("tasks", JSON.stringify(todoItems));
        localStorage.setItem(
          "completed_tasks",
          JSON.stringify([...completedTasks, updatedTask])
        );
      } else {
        completedTasks.splice(completedTasks.indexOf(updatedTask), 1);
        localStorage.setItem(
          "tasks",
          JSON.stringify([...todoItems, updatedTask])
        );
        localStorage.setItem("completed_tasks", JSON.stringify(completedTasks));
      }
    } else {
      window.alert("Task not found!");
    }
  };

  return (
    <section className="main">
      <h1 className="main_text text-center">
        Dunno What <br className="sm:flex hidden" />
        <span>To Do?!</span>{" "}
      </h1>
      <p className="desc text-center">
        Simply add your list of things you want to do. Click the title once
        you've completed your task, then relax as you know it's been taken care
        of! <br />
        <span className="text-xs">
          This page does not store your information. All of your tasks will be
          deleted upon close or refresh
        </span>
      </p>

      {/* TodoInput */}
      {/* SubmitButton */}

      {/* <TodoForm todo={todoText} onInputChange={setTodoText} onSubmit={handleSubmit} /> */}

      <form onSubmit={handleSubmit} className="todo_form">
        <input
          type="text"
          placeholder="I need to..."
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <ToDoSection todoItems={todoItems} />
    </section>
  );
};

export default MyTodoApp;
