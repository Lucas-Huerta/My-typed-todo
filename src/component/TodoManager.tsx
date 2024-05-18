import { useState, useEffect } from 'react';
import { TodoItem } from '../model/todo-item';

const TodoManager = () => {
    const [taskList, setTaskList] = useState<TodoItem[]>(() => {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(taskList));
    }, [taskList]);

    const addTask = (task: TodoItem) => {
        setTaskList([...taskList, task]);
    };

    const removeTask = (taskId: number) => {
        setTaskList(taskList.filter(task => task.id !== taskId));
    };

    return {
        taskList,
        addTask,
        removeTask
    };
};

export default TodoManager;
