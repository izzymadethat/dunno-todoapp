import React from "react";

const CompletedTasksSection = ({ items, onClickToResetTask }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
      {items.map((item) => (
        <div
          key={item.id}
          className={`flex_column w-full bg-yellow-200 task_card`}
        >
          <p className="task_title line-through" onClick={() => onClickToResetTask(item.id)}>
            {item.task}
          </p>
          <p className="text-xs">(click title to undo completion.)</p>
        </div>
      ))}
    </div>
  );
};

export default CompletedTasksSection;
