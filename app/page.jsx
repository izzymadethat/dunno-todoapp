"use client";

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Task from "./models/taskItem";
import ToDoSection from "./components/ToDoSection";
import getRandomQuote from "./functions/quotes";
import { getTasks } from "./functions/get-tasks";

/**
 * MyToDo App - Main app
 *
 * Todo - set up unique ids using uuid
 * Todo - handle edit function
 * Todo - save task to local storage
 * Todo - refactor functions and components
 */

const MyTodoApp = () => {
  const [loading, setLoading] = useState(false);
  const [todoItems, setTodoItems] = useState([]);
  const [todoText, setTodoText] = useState("");
  const [completedTasks, setCompletedTasks] = useState([]);
  const [randomQuote, setRandomQuote] = useState("");

  // Editing features
  // const [editingTaskId, setEditingTaskId] = useState(null);
  // const [isEditing, setIsEditing] = useState(true);
  // const [editedText, setEditedText] = useState("");
  /**
   * useEffect
  //  * Todo - retrieve items from storage
  //  * Todo - add items as a Task object
  //  * Todo - setTodoItems to array of Tasks
   */
  useEffect(() => {
    setLoading(true);

    async function fetchAndSetTasks() {
      // get tasks from local storage
      const tasks = getTasks();
      setTodoItems(tasks.todo);
      setCompletedTasks(tasks.done);
    }

    async function fetchAndSetRandomQuote() {
      const quote = getRandomQuote();
      setRandomQuote(quote);
    }

    fetchAndSetTasks();
    fetchAndSetRandomQuote();

    setLoading(false);
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
   * @returns {void} updates todo items and local storage
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!todoText) return;

    // create new task id and Task object
    const taskId = uuidv4();
    const newTask = new Task(taskId, todoText);

    // update tasks array, update localStorage, updateState
    // reset text
    const updatedTasks = [newTask, ...todoItems];
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTodoItems(updatedTasks);
    setTodoText("");
  };

  /**
   * Handle when user deletes a task
   * - filter task that matches task id
   * - assumes that task to delete isn't completed
   * - update task list and remove from storage
   * @param {string} id
   */

  const handleDelete = (id) => {
    const updatedTasks = todoItems.filter((item) => item.id !== id);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTodoItems(updatedTasks);
  };

  /**
   * Handle Completion or ReDo of Task when user clicks to complete task.
   * - filter through task list for task that matches id
   * - update isCompleted to be opposite of value (!boolean)
   * - update localStorage to updated toDo List
   * - add completed task to another stored list called completed_tasks
   * @param {string} id
   */
  const handleTaskComplete = (id) => {
    if (!id || typeof id !== "string") return;

    const taskIndex = todoItems.findIndex((task) => task.id === id);
    if (taskIndex === -1) return;

    const task = todoItems[taskIndex];
    task.isCompleted = !task.isCompleted;

    const updatedTasks = [...todoItems];
    updatedTasks.splice(taskIndex, 1);

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTodoItems(updatedTasks);

    const newCompletedTasks = [...completedTasks, task];
    localStorage.setItem("completed_tasks", JSON.stringify(newCompletedTasks));
    setCompletedTasks(newCompletedTasks);
  };

  /**
   * Handle Reset of a task when user clicks to reset task.
   * - Filter through completed tasks for task that matches id
   * - Update task to be completed
   * - Update the state and local storage
   * - Update completed tasks
   * @param {string} id
   */
  const handleResetTask = (id) => {
    if (completedTasks.length === 0) return;

    const taskToReset = completedTasks.find((task) => task.id === id);

    if (!taskToReset) return;

    taskToReset.isCompleted = false;

    const updatedCompletedTasks = completedTasks.filter(
      (task) => task.id !== id
    );
    localStorage.setItem(
      "completed_tasks",
      JSON.stringify(updatedCompletedTasks)
    );
    setCompletedTasks(updatedCompletedTasks);

    const updatedTodoTasks = [...todoItems, taskToReset];
    localStorage.setItem("tasks", JSON.stringify(updatedTodoTasks));
    setTodoItems(updatedTodoTasks);
  };

  // Editing functions
  // const handleEdit = (id, newText) => {
  //   const updatedTasks = todoItems.map((task) => {
  //     if (task.id === id) {
  //       return { ...task, task: newText };
  //     }

  //     return task;
  //   });

  //   setTodoItems(updatedTasks);
  //   localStorage.setItem("tasks", JSON.stringify(updatedTasks));

  //   setEditingTaskId(null);
  // };

  const completedTasksSection = (
    <section className="w-full">
      <h3 className="text-3xl font-bold">Completed:</h3>
      <div className="grid_container">
        {completedTasks.map((todo) => (
          <div
            key={todo.id}
            className={`flex_column w-full ${
              todo.isCompleted ? "bg-yellow-200" : "bg-yellow-300"
            } task_card`}
          >
            <p
              className="task_title line-through"
              onClick={() => handleResetTask(todo.id)}
            >
              {todo.task}
            </p>
            <p className="text-xs">(click title to undo completion.)</p>
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <section className="main">
      <h1 className="main_text text-center">
        Dunno What <br className="sm:flex" />
        <span className="text-6xl lg:text-9xl text-yellow-500">
          To Do?!
        </span>{" "}
      </h1>
      <p className="max-w-xs desc lg:max-w-none text-center">
        Simply add your list of things you want to do. Click the title once
        you've completed your task, then relax as you know it's been taken care
        of! <br />
        <span className="text-xs">
          This page stores your tasks to your local browser storage, and does
          not store your personal information. All of your tasks will be
          available upon close or refresh until you delete them.
        </span>
      </p>

      <form onSubmit={handleSubmit} className="todo_form">
        <input
          type="text"
          placeholder="I need to..."
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      <div>
        {todoItems.length > 0 && (
          <ToDoSection
            todoItems={todoItems}
            onTaskComplete={handleTaskComplete}
            onTaskDelete={handleDelete}
          />
        )}
        <p className="text-2xl"></p>
      </div>

      {completedTasks.length > 0 && <>{completedTasksSection}</>}
    </section>
  );
};

export default MyTodoApp;
