export function getTasks({ storage, key }) {
    let tasks = JSON.parse(storage.getItem(key))
    return tasks;
}

// export function getCompletedTasks() {
//     let doneTasks = JSON.parse(localStorage.getItem("completed_tasks")) || [];
//     return doneTasks;
// }