import { Task } from "../store/todo/todoSlice";

export function searchTasks(query: string, tasks: Task[]): Task[] {
    query = query.toLowerCase();

    return tasks.filter((task) =>
        task.title.toLowerCase().includes(query) || task.description.toLowerCase().includes(query)
    );
}