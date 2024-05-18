import { useState } from 'react';
import { TodoItem } from '../model/todo-item';

const TodoManager = () => {
    const [taskList, setTaskList] = useState<TodoItem[]>([]);

    const addTask = (newTask: TodoItem) => {
        setTaskList([...taskList, newTask]);
    };

    const removeTask = (taskId: number) => {
        setTaskList(taskList.filter(task => task.id !== taskId));
    };

    return { taskList, addTask, removeTask };
};

export default TodoManager;
