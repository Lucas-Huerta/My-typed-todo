import { useState } from "react";
import { TodoItem } from "../model/todo-item";
import { TodoStatus } from "../model/todo-status";
import { Todopriority } from "../model/todo-priority";
import TodoManager from '../component/TodoManager';
import 'tailwindcss/tailwind.css';

const TodoList = () => {
    const { taskList, addTask, removeTask } = TodoManager();
    const [newTask, setNewTask] = useState<TodoItem>({
        id: 0,
        description: '',
        duDate: { day: 0, month: 0, year: 0, hour: 0, minute: 0 },
        status: TodoStatus.TODO,
        priority: Todopriority.LOW
    });

    const handleAddTask = () => {
        if (newTask.description.trim() !== '') {
            addTask(newTask);
            setNewTask({
                id: newTask.id + 1,
                description: '',
                duDate: { day: 0, month: 0, year: 0, hour: 0, minute: 0 },
                status: TodoStatus.TODO,
                priority: Todopriority.LOW
            });
        }
    };

    const handleRemoveTask = (taskId: number) => {
        removeTask(taskId);
    };

    const padZero = (num: number): string => {
        return num < 10 ? `0${num}` : `${num}`;
    }

    return (
        <div className="container mx-auto p-4">
        <div className="mb-6">
            <h2 className="text-xl font-bold mb-4">Add New Task</h2>
                <input 
                    type="text" 
                    value={newTask.description} 
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} 
                    placeholder="Enter task description" 
                    className="border p-2 rounded mb-2 w-full"
                />
                <select
                    value={newTask.status}
                    onChange={(e) => setNewTask({ ...newTask, status: e.target.value as TodoStatus })}
                    className="border p-2 rounded mb-2 w-full"
                >
                    <option value={TodoStatus.TODO}>Todo</option>
                    <option value={TodoStatus.INPROGRESS}>In Progress</option>
                    <option value={TodoStatus.DONE}>Done</option>
                </select>
                <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as Todopriority })}
                    className="border p-2 rounded mb-2 w-full"
                >
                    <option value={Todopriority.LOW}>Low</option>
                    <option value={Todopriority.MEDIUM}>Medium</option>
                    <option value={Todopriority.HIGH}>High</option>
                </select>
                <input 
                    type="date"
                    value={`${newTask.duDate.year}-${padZero(newTask.duDate.month)}-${padZero(newTask.duDate.day)}`}
                    onChange={(e) => {
                        const dateParts = e.target.value.split("-");
                        setNewTask({
                            ...newTask,
                            duDate: {
                                ...newTask.duDate,
                                year: parseInt(dateParts[0]),
                                month: parseInt(dateParts[1]),
                                day: parseInt(dateParts[2])
                            }
                        });
                    }}
                    className="border p-2 rounded mb-2 w-full"
                />
                <input 
                    type="time"
                    value={`${padZero(newTask.duDate.hour)}:${padZero(newTask.duDate.minute)}`}
                    onChange={(e) => {
                        const timeParts = e.target.value.split(':');
                        setNewTask({
                            ...newTask,
                            duDate: {
                                ...newTask.duDate,
                                hour: parseInt(timeParts[0]),
                                minute: parseInt(timeParts[1])
                            }
                        });
                    }}
                    className="border p-2 rounded mb-4 w-full"
                />
                <button 
                    onClick={handleAddTask}
                    className="bg-blue-500 text-white p-2 rounded w-full"
                >
                    Add Task
                </button>
            </div>

            <h1 className="text-2xl font-bold mb-4">Todo List</h1>
            <div className="container mx-auto p-4 flex flex-wrap justify-around">
                <div className="bg-red-300 p-4 rounded w-80 m-2">
                    <h2 className="text-xl font-bold mb-2">Todo</h2>
                    <ul className="list-disc pl-5">
                        {taskList.filter(task => task.status === TodoStatus.TODO).map(task => (
                            <li key={task.id} className="mb-2 flex justify-between items-center">
                                <div className="flex flex-wrap text-left justify-between">
                                    <span className="font-semibold mr-2">{task.description}</span>
                                    <span className="text-gray-600">[{task.priority}]</span>
                                    <span className="text-gray-600">
                                        {padZero(task.duDate.day)}/{padZero(task.duDate.month)}/{task.duDate.year}
                                    </span>
                                    <span className="text-gray-600">
                                        {padZero(task.duDate.hour)}:{padZero(task.duDate.minute)}
                                    </span>
                                </div>
                                <button 
                                    onClick={() => handleRemoveTask(task.id)}
                                    className="bg-red-500 text-white p-1 rounded ml-4"
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="bg-orange-300 p-4 rounded w-80 m-2">
                    <h2 className="text-xl font-bold mb-2">In Progress</h2>
                    <ul className="list-disc pl-5">
                        {taskList.filter(task => task.status === TodoStatus.INPROGRESS).map(task => (
                            <li key={task.id} className="mb-2 flex justify-between items-center">
                                <div className="flex flex-wrap text-left justify-between">
                                    <span className="font-semibold mr-2">{task.description}</span>
                                    <span className="text-gray-600">[{task.priority}]</span>
                                    <span className="text-gray-600">
                                        {padZero(task.duDate.day)}/{padZero(task.duDate.month)}/{task.duDate.year}
                                    </span>
                                    <span className="text-gray-600">
                                        {padZero(task.duDate.hour)}:{padZero(task.duDate.minute)}
                                    </span>
                                </div>
                                <button 
                                    onClick={() => handleRemoveTask(task.id)}
                                    className="bg-red-500 text-white p-1 rounded ml-4"
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="bg-green-300 p-4 rounded w-80 m-2">
                    <h2 className="text-xl font-bold mb-2">Done</h2>
                    <ul className="list-disc pl-5">
                        {taskList.filter(task => task.status === TodoStatus.DONE).map(task => (
                            <li key={task.id} className="mb-2 flex justify-between items-center">
                                <div className="flex flex-wrap text-left justify-between">
                                    <span className="font-semibold mr-2">{task.description}</span>
                                    <span className="text-gray-600">[{task.priority}]</span>
                                    <span className="text-gray-600">
                                        {padZero(task.duDate.day)}/{padZero(task.duDate.month)}/{task.duDate.year}
                                    </span>
                                    <span className="text-gray-600">
                                        {padZero(task.duDate.hour)}:{padZero(task.duDate.minute)}
                                    </span>
                                </div>
                                <button 
                                    onClick={() => handleRemoveTask(task.id)}
                                    className="bg-red-500 text-white p-1 rounded ml-4"
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TodoList;
