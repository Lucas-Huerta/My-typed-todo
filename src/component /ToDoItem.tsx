
import React from "react";
import { TodoItem } from "../model/todo-item";

interface ToDoItemProps {
  todo: TodoItem;
}

const ToDoItem: React.FC<ToDoItemProps> = ({ todo }) => {
  const { id, description, duDate, status, priority } = todo;

  return (
    <div className="todo-item">
      <div>
        <p>ID:</p> {id}
      </div>
      <div>
        <p>Description:</p> {description}
      </div>
      <div>
        <p>Due Date:</p> {duDate.day}/{duDate.month}/{duDate.year} {duDate.hour}:{duDate.minute}
      </div>
      <div>
        <p>Status:</p> {status}
      </div>
      <div>
        <p>Priority:</p> {priority}
      </div>
    </div>
  );
};

export default ToDoItem;
