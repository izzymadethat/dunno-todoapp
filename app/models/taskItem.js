export default class Task {
    static allTasks = []

    constructor(id, task) {
        this.id = id
        this.task = task
        this.isCompleted = false
        this.createdAt = new Date().toISOString()

        // add task to allTasks
        Task.allTasks.push(this)
    }


    setCompleteTask() {
        this.isCompleted = !this.isCompleted
        return this.isCompleted
    }

    getTaskId() {
        return this.id
    }

    getTaskInfo() {
        return {
            task: this.task,
            isCompleted: this.isCompleted,
            created: this.createdAt
        }
    }

    // ! Admin function
    static retrieveTaskList() {
        return Task.allTasks
    }
}