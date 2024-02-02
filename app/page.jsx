"use client";

import { useEffect, useState } from "react";

// const todos = [
//   { id: 1, task: "Walk the dog", isCompleted: false },
//   { id: 2, task: "Feed the cat", isCompleted: true },
//   { id: 3, task: "Pet the cat", isCompleted: false },
//   { id: 4, task: "Go to the store", isCompleted: false },
//   { id: 5, task: "Get Groceries", isCompleted: false },
// ];

const MyTodoApp = () => {
  const [todoItems, setTodoItems] = useState([]);
  const [todoText, setTodoText] = useState("");
  const [completeTask, setCompleteTask] = useState(false);

  useEffect(() => {
    console.log("MyTodoApp useEffect");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!todoText) return;

    setTodoItems([
      ...todoItems,
      { id: todoItems.length + 1, task: todoText, isCompleted: false },
    ]);

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
