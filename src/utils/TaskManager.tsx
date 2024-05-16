import { useState } from 'react';
import { TodoItem } from '../model/todo-item';

export const TaskManager = () => {
    const [taskList, setTaskList] = useState<TodoItem[]>([]);

    const addTask = (newTask: TodoItem) => {
        setTaskList(prevList => [...prevList, newTask]);
    };

    const removeTask = (taskId: number) => {
        setTaskList(prevList => prevList.filter(task => task.id !== taskId));
    };

    const updateTask = (updatedTask: TodoItem) => {
        setTaskList(prevList =>
            prevList.map(task => (task.id === updatedTask.id ? updatedTask : task))
        );
    };

    return { taskList, addTask, removeTask, updateTask };
};
