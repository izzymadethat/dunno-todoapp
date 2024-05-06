import React from "react";

const ToDoSection = ({
  todoItems,
  onTaskComplete,
  onTaskDelete,
  isEditing,
  onEdit,
}) => {
  return (
    <div className="grid_container ">
      {todoItems.map((todo) => (
        <div
          key={todo.id}
          className={`flex_column w-full ${
            todo.isCompleted ? "bg-yellow-200" : "bg-yellow-300"
          } task_card`}
        >
          {isEditing ? (
            <p>Is currently editing</p>
          ) : (
            <>
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
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default ToDoSection;
