import { TodoItem } from "../model/todo-item";
import { useEffect } from "react";

/**
 * Classe TodoManager
 */
export class TodoManager {
	taskList: TodoItem[];
	constructor(tabTask: TodoItem[]) {
		this.taskList = tabTask;
		useEffect(() => {
			localStorage.setItem("tasks", JSON.stringify(this.taskList));
		}, [this.taskList]);
	}

	/**
	 * Fonction d'ajout de tâche
	 * @param newTask tâche à ajouter au tableau
	 * @returns
	 */
	addTask(newTask: TodoItem): void {
		if (this.taskList.find((task) => task.id === newTask.id)) {
			console.log("La tâche est déjà présente dans la liste.");
			return;
		} else {
			this.taskList.push(newTask);
		}
	}

	/**
	 * Fonction de suppression de tâche
	 * @param taskId id de la tâche à supprimer
	 * @returns
	 */
	removeTask(taskId: number): TodoItem[] {
		this.taskList = this.taskList.filter((task) => task.id !== taskId);
		return this.taskList;
	}

	/**
	 * Fonction de recherche de tâches dans le tableau
	 * @param contentSearching contenu de la description à rechercher dans les tâches
	 * @param status statut de la tâche
	 * @returns
	 */
	searchingTask(contentSearching: string, status: string): TodoItem[] {
		return this.taskList.filter(
			(task) =>
				task.description.includes(contentSearching) && task.status === status
		);
	}
}
