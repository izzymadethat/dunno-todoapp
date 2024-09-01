export function getTasks() {
  // get tasks from local storage
  const incompleteTasks = JSON.parse(localStorage.getItem("tasks")) || null;
  const completedTasks =
    JSON.parse(localStorage.getItem("completed_tasks")) || null;

  let tasks = {
    todo: incompleteTasks ?? [],
    done: completedTasks ?? [],
  };

  return tasks;
}
