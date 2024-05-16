import  { useState } from "react";
import { TodoItem,} from "../model/todo-item";
import { TodoStatus } from "../model/todo-status";
import { Todopriority } from "../model/todo-priority";


const TodoList = () => {
    const [tasks, setTasks] = useState<TodoItem[]>([]); 
    const [newTask, setNewTask] = useState<TodoItem>({
        id: 0,
        description: "",
        duDate: { day: 0, month: 0, year: 0, hour: 0, minute: 0 },
        status: TodoStatus.TODO,
        priority: Todopriority.LOW
    });

    const addTask = () => {
        if (newTask.description.trim() !== "") {
            setTasks([...tasks, newTask]);
            setNewTask({
                id: newTask.id + 1,
                description: "",
                duDate: { day: 0, month: 0, year: 0, hour: 0, minute: 0 },
                status: TodoStatus.TODO,
                priority: Todopriority.LOW
            });
        }
    };
    
    const removeTask = (id: number) => {
        const newTasks = tasks.filter(task => task.id !== id);
        setTasks(newTasks);
    };

    const filterTasksByStatus = (status: TodoStatus) => {
        return tasks.filter(task => task.status === status);
    };

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
                    value={`${newTask.duDate.year}-${newTask.duDate.month}-${newTask.duDate.day}`}
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
                <button onClick={addTask}>Add Task</button>
            </div>

            <h1>Todo List</h1>
            <div>
                <h2>Todo</h2>
                <ul>
                    {filterTasksByStatus(TodoStatus.TODO).map(task => (
                        <li key={task.id}>
                            <span>{task.description}</span>
                            <span>{task.priority}</span>
                            <span>{task.duDate.year}</span>
                            <span>{task.status}</span>
                            <button onClick={() => removeTask(task.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h2>In progress</h2>
                <ul>
                    {filterTasksByStatus(TodoStatus.INPROGRESS).map(task => (
                        <li key={task.id}>
                              <span>{task.description}</span>
                            <span>{task.priority}</span>
                            <span>{task.duDate.year}</span>
                            <span>{task.status}</span>
                            <button onClick={() => removeTask(task.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h2>Done</h2>
                <ul>
                    {filterTasksByStatus(TodoStatus.DONE).map(task => (
                        <li key={task.id}>
                              <span>{task.description}</span>
                            <span>{task.priority}</span>
                            <span>{task.duDate.year}</span>
                            <span>{task.status}</span>
                            <button onClick={() => removeTask(task.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
            
        </div>
    );
}

export default TodoList;
