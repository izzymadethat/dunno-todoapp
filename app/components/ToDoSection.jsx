import React from "react";

const ToDoSection = ({
  items,
  onTaskComplete,
  onTaskDelete,
  editingTaskId,
  onEditChange,
  onEditSubmit,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
      {items.map((todo) => (
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
            onClick={() => onTaskComplete(todo.id)}
          >
            {todo.task}
          </p>
          <div className="flex gap-4 items-center">
            <button
              type="button"
              disabled={todo.isCompleted ? true : false}
              className="task_button"
              onClick={() => onEditChange(todo.id)}
            >
              Edit
            </button>
            <button
              type="button"
              className="task_button"
              onClick={() => onTaskDelete(todo.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ToDoSection;
