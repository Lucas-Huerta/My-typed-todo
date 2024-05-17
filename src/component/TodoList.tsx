import  { useState } from "react";
import { TodoItem } from "../model/todo-item";
import { TodoStatus } from "../model/todo-status";
import { Todopriority } from "../model/todo-priority";
import TodoManager from '../component/TodoManager';

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
        <div>
            <div>
                <h2>Add New Task</h2>
                <input 
                    type="text" 
                    value={newTask.description} 
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} 
                    placeholder="Enter task description" 
                />
                <select
                    value={newTask.status}
                    onChange={(e) => setNewTask({ ...newTask, status: e.target.value as TodoStatus })}
                >
                    <option value={TodoStatus.TODO}>Todo</option>
                    <option value={TodoStatus.INPROGRESS}>In Progress</option>
                    <option value={TodoStatus.DONE}>Done</option>
                </select>
                <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as Todopriority })}
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
                />
                <button onClick={handleAddTask}>Add Task</button>
            </div>

            <h1>Todo List</h1>
            <div>
                <h2>Todo</h2>
                <ul>
                    {taskList.filter(task => task.status === TodoStatus.TODO).map(task => (
                        <li key={task.id}>
                            <span>{task.description}</span>
                            <span>{task.priority}</span>
                            <span>{padZero(task.duDate.day)}/{padZero(task.duDate.month)}/{task.duDate.year}</span>
                            <span>{padZero(task.duDate.hour)}:{padZero(task.duDate.minute)}</span>
                            <span>{task.status}</span>
                            <button onClick={() => handleRemoveTask(task.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h2>In progress</h2>
                <ul>
                    {taskList.filter(task => task.status === TodoStatus.INPROGRESS).map(task => (
                        <li key={task.id}>
                            <span>{task.description}</span>
                            <span>{task.priority}</span>
                            <span>{padZero(task.duDate.day)}/{padZero(task.duDate.month)}/{task.duDate.year}</span>
                            <span>{padZero(task.duDate.hour)}:{padZero(task.duDate.minute)}</span>
                            <span>{task.status}</span>
                            <button onClick={() => handleRemoveTask(task.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h2>Done</h2>
                <ul>
                    {taskList.filter(task => task.status === TodoStatus.DONE).map(task => (
                        <li key={task.id}>
                            <span>{task.description}</span>
                            <span>{task.priority}</span>
                            <span>{padZero(task.duDate.day)}/{padZero(task.duDate.month)}/{task.duDate.year}</span>
                            <span>{padZero(task.duDate.hour)}:{padZero(task.duDate.minute)}</span>
                            <span>{task.status}</span>
                            <button onClick={() => handleRemoveTask(task.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TodoList;
