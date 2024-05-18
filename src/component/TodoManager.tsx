import { TodoItem } from "../model/todo-item";

export class TodoManager {
	taskList: TodoItem[];
	constructor(tabTask: TodoItem[]) {
		this.taskList = tabTask;
	}

	addTask(newTask: TodoItem): void {
		this.taskList.push(newTask);
	}

	removeTask(taskId: number): TodoItem[] {
		this.taskList = this.taskList.filter((task) => task.id !== taskId);
		return this.taskList;
	}
}
