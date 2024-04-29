"use client";

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Task from "./models/taskItem";

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
  const [completeTask, setCompleteTask] = useState(false);

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

    if (storedTasks) {
      // create a new task from each task object found
      const taskInstances = storedTasks.map((task) => {
        const taskInstance = new Task(task.id, task.task);
        taskInstance.isCompleted = task.isCompleted;
        return taskInstance;
      });

      setTodoItems(taskInstances);
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

  const handleTaskComplete = (id) => {
    setTodoItems(
      todoItems.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            isCompleted: !item.isCompleted,
          };
        }
        return item;
      })
    );
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

      {/* Todo Container */}
      {/* <TodoList data={todoItems} /> */}
      <div className="grid_container ">
        {/* ToDo Card */}
        {/* <TodoCard task={todo.task} onClick={handleTaskComplete} onEdit={handleEdit} onDelete={handleDelete} /> */}
        {todoItems.map((todo) => (
          <div
            key={todo.id}
            className={`flex_column w-full ${
              todo.isCompleted ? "bg-yellow-200" : "bg-yellow-300"
            } task_card`}
          >
            <p
              className={
                todo.isCompleted === true
                  ? "task_title line-through"
                  : "task_title"
              }
              onClick={() => handleTaskComplete(todo.id)}
            >
              {todo.task}
            </p>
            <div className="flex gap-4 items-center">
              <button
                type="button"
                disabled={todo.isCompleted ? true : false}
                className="task_button"
              >
                Edit
              </button>
              <button
                type="button"
                className="task_button"
                onClick={() => handleDelete(todo.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MyTodoApp;
